package models

import (
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Post_Text  string
	Post_Date  string
	Post_ID    int `gorm:"primaryKey;autoIncrement"`
	Users_ID   int `gorm:"foreignKey:users_id"`
	Post_Title string
	Forum_ID   int `gorm:"foreignKey:forum_id"`
}
