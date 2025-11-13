package httphandler

import (
	"net/http"
	"strconv"

	"github.com/Lolsalas/GameForum/models"
	"github.com/Lolsalas/GameForum/repository"
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
		store:      sessions.NewCookieStore([]byte("SuperSecretKey")),
	}
}

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

	session, _ := h.store.Get(c.Request, "session")
	session.Values["authenticated"] = true
	session.Values["user_id"] = user.ID
	session.Save(c.Request, c.Writer)

	c.JSON(http.StatusOK, gin.H{"message": "Login successful"})

}

func (h *handler) GetForum(c *gin.Context) {
	forumIdstr := c.Param("Forum_ID")
	forumId, _ := strconv.Atoi(forumIdstr)

	var forum models.Forum
	if err := h.db_manager.Orm.Preload("Posts").First(&forum, forumId).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Foro no encontrado"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"forum": forum})
}
