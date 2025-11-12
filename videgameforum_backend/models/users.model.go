package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `gorm:"unique;size:255"`
	Password string
	Email    string
	Users_id int `gorm:"primaryKey;autoIncrement"`
}
