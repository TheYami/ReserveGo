package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name string `json:"name"`
	Email string `json:"email" gorm:"type:varchar(255);unique"`
	Password string `json:"password"`
	Role string `json:"role"`
	Phone string `json:"phone" gorm:"type:varchar(20);unique"`
	ProfileImage string `json:"profile_image"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}