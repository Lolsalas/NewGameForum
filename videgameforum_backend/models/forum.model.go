package models

import (
	"gorm.io/gorm"
)

type Forum struct {
	gorm.Model
	Forum_Name  string
	Forum_ID    int    `gorm:"primaryKey;autoIncrement"`
	Forum_Posts []Post `gorm:"foreignKey:Forum_ID"`
}
