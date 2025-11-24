package httphandler

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/Lolsalas/GameForum/models"
	"github.com/Lolsalas/GameForum/repository"
	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
	User_ID  int    `json:"users_id"`
}

type handler struct {
	db_manager *repository.DBManager
	store      *sessions.CookieStore
}

func New(db *repository.DBManager) *handler {

	return &handler{
		db_manager: db,
		store:      sessions.NewCookieStore([]byte("12345678911234567890123456789012")),
	}
}

var jwtsecret = []byte("SuperDuperSecretKey")

func (h *handler) InsertUser(c *gin.Context) {
	var new_user User
	if err := c.ShouldBind(&new_user); err != nil {
		// If binding fails, it's usually a Bad Request
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := h.db_manager.InsertNewUser(new_user.Username, new_user.Password, new_user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, "user inserted")
}

func (h *handler) InsertForum(c *gin.Context) {

	tokenString := c.GetHeader("Authorization")

	if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer") {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token de Autorizacion requerido"})
		c.Abort()
		return
	}

	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Metodo de firma inesperado", token.Header["alg"])
		}
		return jwtsecret, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token invalido o expirado"})
		c.Abort()
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if userIDFloat, ok := claims["user_id"].(float64); ok {
			userID := int(userIDFloat)
			c.Set("userID", userID)
		}
	}

	var new_forum models.Forum
	if err := c.ShouldBindJSON(&new_forum); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	forum, err := h.db_manager.InsertNewForum(new_forum.Forum_Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "forum created",
		"forum":   forum,
	})
}

func (h *handler) GetUsers(c *gin.Context) {
	all_users, err := h.db_manager.GetUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Error": err.Error()})
		return
	}
	c.IndentedJSON(http.StatusOK, all_users)
}

func (h *handler) Login(c *gin.Context) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Input"})
		return
	}

	user, err := h.db_manager.Login(input.Email, input.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if user == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email or Password incorrect"})
		return
	}

	claims := jwt.MapClaims{
		"user_id":  user.ID,
		"exp":      time.Now().Add(time.Hour * 24 * 7).Unix(),
		"username": user.Username,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtsecret)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Error": "No se pudo generar el token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Login successful",
		"token": tokenString})

}

func (h *handler) GetForum(c *gin.Context) {
	forumIdstr := c.Param("Forum_ID")
	forumId, _ := strconv.Atoi(forumIdstr)

	var forum models.Forum
	if err := h.db_manager.Orm.Preload("Forum_Posts.User").First(&forum, forumId).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Foro no encontrado"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"forum": forum})
}

func (h *handler) GetPost(c *gin.Context) {
	postIdstr := c.Param("Post_ID")
	postId, _ := strconv.Atoi(postIdstr)

	var posts models.Post
	if err := h.db_manager.Orm.Preload("User").First(&posts, postId).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post no encontrado"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"post": posts})

}

func (h *handler) GetCurrentUser(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")

	if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer") {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token de Autorizacion requerido"})
		c.Abort()
		return
	}

	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Metodo de firma inesperado", token.Header["alg"])
		}
		return jwtsecret, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token invalido o expirado"})
		c.Abort()
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if userIDFloat, ok := claims["user_id"].(float64); ok {
			userID := int(userIDFloat)
			c.Set("userID", userID)
		}
	}

	userID, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no encontrado en el contexto."})
		return
	}

	FinalUserID, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error de ID"})
	}

	user, err := h.db_manager.GetUser(FinalUserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Usuario no encontrado"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": user})
}

func (h *handler) CreatePost(c *gin.Context) {

	tokenString := c.GetHeader("Authorization")

	if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer") {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token de Autorizacion requerido"})
		c.Abort()
		return
	}

	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Metodo de firma inesperado", token.Header["alg"])
		}
		return jwtsecret, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token invalido o expirado"})
		c.Abort()
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if userIDFloat, ok := claims["user_id"].(float64); ok {
			userID := int(userIDFloat)
			c.Set("userID", userID)
		}
	}

	userID, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no encontrado en el contexto."})
		return
	}

	FinalUserID, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error de ID"})
	}

	var new_post models.Post

	if err := c.ShouldBindJSON(&new_post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = h.db_manager.CreatePost(new_post.Post_Text, new_post.Post_Title, FinalUserID, new_post.Forum_ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "post creado"})

}

func (h *handler) GetComments(c *gin.Context) {
	postIdstr := c.Param("Post_ID")
	postId, _ := strconv.Atoi(postIdstr)
	comments, err := h.db_manager.GetComments(postId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Error": err.Error()})
		return
	}
	c.IndentedJSON(http.StatusOK, comments)
}

func (h *handler) InsertComment(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")

	if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer") {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token de Autorizacion requerido"})
		c.Abort()
		return
	}

	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Metodo de firma inesperado", token.Header["alg"])
		}
		return jwtsecret, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token invalido o expirado"})
		c.Abort()
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if userIDFloat, ok := claims["user_id"].(float64); ok {
			userID := int(userIDFloat)
			c.Set("userID", userID)
		}

		if username, ok := claims["username"].(string); ok {
			c.Set("username", username)
		}
	}

	userID, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no encontrado en el contexto."})
		return
	}

	username, exists := c.Get("username")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no encontrado en el contexto."})
		return
	}

	FinalUserID, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error de ID"})
	}

	FinalUsername, ok := username.(string)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error de username"})
	}

	print(FinalUserID)

	var new_comment models.Post_Comment

	if err := c.ShouldBindJSON(&new_comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = h.db_manager.InsertComment(FinalUsername, new_comment.Comment_Text, new_comment.Comment_Date, new_comment.Forum_ID, new_comment.Post_ID, FinalUserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "comment creado"})
}

func (h *handler) GetForums(c *gin.Context) {
	Forums, err := h.db_manager.GetForums()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Error": err.Error()})
		return
	}
	c.IndentedJSON(http.StatusOK, Forums)
}

func (h *handler) PinForum(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")

	if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer") {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token de Autorizacion requerido"})
		c.Abort()
		return
	}

	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Metodo de firma inesperado", token.Header["alg"])
		}
		return jwtsecret, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token invalido o expirado"})
		c.Abort()
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if userIDFloat, ok := claims["user_id"].(float64); ok {
			userID := int(userIDFloat)
			c.Set("userID", userID)
		}
	}

	userID, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no encontrado en el contexto."})
		return
	}

	FinalUserID, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error de ID"})
	}

	var requestBody struct {
		Forum_id int `json:"forumid"`
	}

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos de foro no válidos: " + err.Error()})
		return
	}

	err = h.db_manager.PinForum(FinalUserID, requestBody.Forum_id)
	if err != nil {
		if strings.Contains(err.Error(), "ya ha sido pinneado") {
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al pinnear el foro: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Foro pinneado correctamente"})

}

func (h *handler) GetPinnedForums(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")

	if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer") {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token de Autorizacion requerido"})
		c.Abort()
		return
	}

	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Metodo de firma inesperado", token.Header["alg"])
		}
		return jwtsecret, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token invalido o expirado"})
		c.Abort()
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if userIDFloat, ok := claims["user_id"].(float64); ok {
			userID := int(userIDFloat)
			c.Set("userID", userID)
		}
	}

	userID, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no encontrado en el contexto."})
		return
	}

	FinalUserID, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error de ID"})
	}

	pinnedForums, err := h.db_manager.GetPinnedForums(FinalUserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Error": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, pinnedForums)

}

func (h *handler) UpdateProfile(c *gin.Context) {

	tokenString := c.GetHeader("Authorization")

	if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer") {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token de Autorizacion requerido"})
		c.Abort()
		return
	}

	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Metodo de firma inesperado", token.Header["alg"])
		}
		return jwtsecret, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token invalido o expirado"})
		c.Abort()
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if userIDFloat, ok := claims["user_id"].(float64); ok {
			userID := int(userIDFloat)
			c.Set("userID", userID)
		}
	}

	userID, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no encontrado en el contexto."})
		return
	}

	FinalUserID, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error de ID"})
	}

	newUsername := c.PostForm("Username")
	newTitle := c.PostForm("Title")

	file, errFile := c.FormFile("profile_picture")
	var publicURL string = ""

	if errFile == nil {

		filename := fmt.Sprintf("%d_%s", FinalUserID, file.Filename)
		destination := "./static/profiles/" + filename

		if err := c.SaveUploadedFile(file, destination); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "falló al guardar la imagen"})
			return
		}

		publicURL = fmt.Sprintf("/profiles/%s", filename)
	}

	if err := h.db_manager.UpdateUserDB(FinalUserID, newUsername, newTitle, publicURL); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "falló al actualizar la base de datos: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Perfil actualizado con éxito"})
}
