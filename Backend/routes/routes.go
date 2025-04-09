package routes

import (
	"Backend/controllers"

	"github.com/gin-gonic/gin"
)

// SetupAuthRoutes ตั้งค่า API Routes
func SetupAuthRoutes(router *gin.Engine) {
	auth := router.Group("/auth")
	{
		auth.POST("/register", controllers.Register)
		auth.POST("/login", controllers.Login)
	}
}
