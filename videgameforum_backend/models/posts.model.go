package models

import (
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Post_Text  string
	Post_Date  string
	Post_ID    int `gorm:"primaryKey;autoIncrement"`
	Users_ID   int `gorm:"foreignKey:Users_ID"`
	Post_Title string
	Forum_ID   int  `gorm:"foreignKey:Forum_ID"`
	User       User `gorm:"foreignKey:Users_ID"`
}
