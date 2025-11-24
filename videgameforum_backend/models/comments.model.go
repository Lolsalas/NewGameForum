package models

type Post_Comment struct {
	Comment_Text string
	Forum_ID     int `gorm:"foreignKey:Forum_ID"`
	Post_ID      int `gorm:"foreignKey:Post_ID"`
	Users_ID     int `gorm:"foreignKey:Users_ID"`
	Username     string
	Comment_ID   int  `gorm:"primaryKey;autoIncrement"`
	User         User `gorm:"foreignKey:Users_ID"`
}
