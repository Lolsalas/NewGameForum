package models

import (
	"time"
)

type Post_Comment struct {
	Comment_Date time.Time
	Comment_Text string
	Forum_ID     int `gorm:"foreignKey:Forum_ID"`
	Post_ID      int `gorm:"foreignKey:Post_ID"`
	Users_ID     int `gorm:"foreignKey:Users_ID"`
	Comment_ID   int `gorm:"primaryKey;autoIncrement"`
}
