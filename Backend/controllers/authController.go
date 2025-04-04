package controllers

import (
	"Backend/config"
	"Backend/models"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
    var input models.User
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // ตรวจสอบค่าที่สำคัญว่าไม่เป็นค่าว่าง
    if input.Name == "" || input.Password == "" || input.Role == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Name, password, and role cannot be empty"})
        return
    }

    input.CreatedAt = time.Now()
    input.UpdatedAt = time.Now()

    // ตรวจสอบว่าอีเมลหรือเบอร์โทรศัพท์มีในฐานข้อมูลหรือไม่
    var existingUser models.User
    if err := config.DB.Where("email = ? OR phone = ?", input.Email, input.Phone).First(&existingUser).Error; err == nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Email or phone already exists"})
        return
    }

    // แฮชพาสเวิร์ด
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Error hashing password"})
        return
    }

    // กำหนดค่าเริ่มต้นให้กับ profile_image ถ้าไม่มีการส่งข้อมูลมา
    if input.ProfileImage == "" {
        input.ProfileImage = "default.jpg"  // ใช้ default image ถ้าไม่มีการส่งข้อมูลภาพ
    }

    user := models.User{
        Name:        input.Name,
        Email:       input.Email,
        Password:    string(hashedPassword),
        Role:        input.Role,
        Phone:       input.Phone,
        ProfileImage: input.ProfileImage,  // เก็บข้อมูลภาพโปรไฟล์
    }

    // บันทึกข้อมูลผู้ใช้ใหม่
	if err := config.DB.Create(&user).Error; err != nil {
		fmt.Println("Error creating user:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error creating user"})
		return
	}

    // เพิ่มการตรวจสอบว่าผู้ใช้ได้ถูกสร้างสำเร็จหรือไม่
    fmt.Println("User created successfully")

    // ส่ง response สำเร็จ
    c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}
