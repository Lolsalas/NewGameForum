package repository

import (
	"log"

	"github.com/Lolsalas/GameForum/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DBManager struct {
	Orm *gorm.DB
}

func New(url string) *DBManager {
	db, err := gorm.Open(postgres.Open(url), &gorm.Config{})
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

func (db *DBManager) CreatePost(post string, title string, userid int64, forumid int) error {
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
