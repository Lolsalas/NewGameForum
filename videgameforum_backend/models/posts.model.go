package models

import (
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Post_Text  string
	Post_Date  string
	Post_ID    int
	Users_ID   int64
	Post_Title string
	Forum_ID   int
}
