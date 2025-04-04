package main

import (
	"Backend/config"
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    // เชื่อมต่อฐานข้อมูล
    config.ConnectDatabase()
    fmt.Println("✅ Database connection initialized!")

    r.Run(":8080")
}
