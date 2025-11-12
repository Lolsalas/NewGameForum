package models

import (
	"gorm.io/gorm"
)

type Comments struct {
	gorm.Model
	Comment_Date string
	Comment_Text string
	Post_ID      int
	Users_ID     int
	Comment_ID   int
}
