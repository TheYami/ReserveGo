package main

import (
	"Backend/config"

	"github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    // เชื่อมต่อฐานข้อมูล
    config.ConnectDatabase()

    r.Run(":8080")
}
