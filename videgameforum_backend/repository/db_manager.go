package repository

import (
	"fmt"
	"log"
	"time"

	"github.com/Lolsalas/GameForum/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DBManager struct {
	Orm *gorm.DB
}

func New(url string) *DBManager {
	db, err := gorm.Open(postgres.Open(url), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
	})
	if err != nil {
		log.Fatalln(err)
	}
	return &DBManager{db}
}

func (db *DBManager) InsertNewUser(name string, password string, email string) error {
	user := models.User{Username: name, Password: password, Email: email}
	result := db.Orm.Create(&user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (db *DBManager) InsertNewForum(name string) (models.Forum, error) {
	forum := models.Forum{Forum_Name: name}
	result := db.Orm.Create(&forum)
	if result.Error != nil {
		return forum, result.Error
	}
	return forum, nil
}

func (db *DBManager) GetUsers() ([]models.User, error) {
	var Users []models.User
	result := db.Orm.Find(&Users)
	if result.Error != nil {
		return Users, result.Error
	}
	return Users, nil
}

func (db *DBManager) Login(email, password string) (*models.User, error) {
	var user models.User
	result := db.Orm.Where("email = ? AND password = ?", email, password).First(&user)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &user, nil
}

func (db *DBManager) CreatePost(post string, title string, userid int, forumid int) error {
	Post := models.Post{Post_Title: title, Post_Text: post, Users_ID: userid, Forum_ID: forumid}
	result := db.Orm.Create(&Post)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (db *DBManager) GetUser(id int) (*models.User, error) {
	var User models.User
	result := db.Orm.First(&User, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &User, nil
}

func (db *DBManager) GetComments(Post_ID int) ([]models.Post_Comment, error) {
	var Comments []models.Post_Comment
	result := db.Orm.Where("post_id = ?", Post_ID).Find(&Comments)
	if result.Error != nil {
		return nil, result.Error
	}
	return Comments, nil
}

func (db *DBManager) InsertComment(user string, commenttext string, commentdate time.Time, forumid int, postid int) error {

	comments := models.Post_Comment{Username: user, Comment_Date: commentdate, Comment_Text: commenttext, Forum_ID: forumid, Post_ID: postid}
	result := db.Orm.Create(&comments)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (db *DBManager) GetForums() ([]models.Forum, error) {
	var Forums []models.Forum
	result := db.Orm.Find(&Forums)
	if result.Error != nil {
		return nil, result.Error
	}
	return Forums, nil
}

func (db *DBManager) PinForum(userid int, forumid int) error {
	var user models.User
	var forum models.Forum

	var count int64

	resultForum := db.Orm.Where("forum_id = ?", forumid).First(&forum)

	if resultForum.Error != nil {
		return resultForum.Error
	}

	db.Orm.First(&user, userid)

	db.Orm.Table("pinnedforums").Where("users_id = ? AND forum_id = ?", userid, forumid).Count(&count)

	if count > 0 {
		return fmt.Errorf("el foro ya habia sido pinneado por este usuario")
	}

	err := db.Orm.Model(&user).Association("PinnedForums").Append(&forum)

	return err
}

func (db *DBManager) GetPinnedForums(user_id int) ([]models.Forum, error) {
	var user models.User
	result := db.Orm.Preload("PinnedForums").First(&user, user_id)
	if result.Error != nil {
		return nil, result.Error
	}
	return user.PinnedForums, nil
}

func (db *DBManager) UpdateUserDB(userID int, username, title, pictureURL string) error {
	updates := make(map[string]interface{})

	if username != "" {
		updates["Username"] = username
	}
	if title != "" {
		updates["Title"] = title
	}

	if pictureURL != "" {
		updates["ProfilePictureURL"] = pictureURL
	}

	if len(updates) == 0 {
		return nil
	}

	result := db.Orm.Model(&models.User{}).Where("users_id = ?", userID).Updates(updates)

	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (db *DBManager) GetUserById(userID int) (models.User, error) {

	var user models.User

	result := db.Orm.Where("users_id = ?", userID).First(&user)

	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return models.User{}, result.Error
		}
		return models.User{}, result.Error
	}

	return user, nil

}
