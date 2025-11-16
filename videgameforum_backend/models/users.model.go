package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `gorm:"unique;size:255"`
	Password string `json:"-"`
	Email    string `json:"-"`
	Users_id int    `gorm:"primaryKey;autoIncrement"`
}
