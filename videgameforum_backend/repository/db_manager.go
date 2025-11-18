package repository

import (
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

func (db *DBManager) InsertComment(userid int, commenttext string, commentdate time.Time, forumid int, postid int) error {

	comments := models.Post_Comment{Users_ID: userid, Comment_Date: commentdate, Comment_Text: commenttext, Forum_ID: forumid, Post_ID: postid}
	result := db.Orm.Create(&comments)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
