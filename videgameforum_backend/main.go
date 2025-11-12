package main

import (
	"log"

	httphandler "github.com/Lolsalas/GameForum/httphandler"
	"github.com/Lolsalas/GameForum/models"
	"github.com/Lolsalas/GameForum/repository"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

const url string = "postgres://postgres:root@localhost:5432/videogame_forum?sslmode=disable"

func main() {
	db := repository.New(url)
	hdlr := httphandler.New(db)

	err := db.Orm.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalln("Failed to migrate database:", err)
	}

	err = db.Orm.AutoMigrate(&models.Forum{})
	if err != nil {
		log.Fatalln("Failed to migrate database:", err)
	}

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // tu frontend
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	router.POST("/user", hdlr.InsertUser)
	router.POST("/createforum", hdlr.InsertForum)
	router.GET("/getusers", hdlr.GetUsers)
	router.POST("/login", hdlr.Login)
	router.Run("localhost:8081")
}
