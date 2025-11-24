package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username     string  `gorm:"unique;size:255"`
	Password     string  `json:"-"`
	Email        string  `json:"-"`
	Users_id     int     `gorm:"primaryKey;autoIncrement"`
	PinnedForums []Forum `gorm:"many2many:pinnedforums;joinForeignKey:Users_id;joinReferences:Forum_ID"`
}
