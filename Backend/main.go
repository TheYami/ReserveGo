package main

import (
	"Backend/config"
	"Backend/routes" // นำเข้า routes

	"github.com/gin-contrib/cors" // นำเข้า CORS
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// กำหนดการตั้งค่า CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // หรือพอร์ตที่คุณใช้ในการรัน React
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// เชื่อมต่อกับฐานข้อมูล
	config.ConnectDatabase()

    config.MigrateDatabase()

	// ตั้งค่า routes สำหรับ Auth
	routes.SetupAuthRoutes(r)

	// รัน server
	r.Run(":8080")
}
