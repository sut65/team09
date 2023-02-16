package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
	"github.com/sut65/team09/service"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginPayload struct {
	Email           string `json:"email"`
	Employee_number string `json:"employee_number"`
	Password        string `json:"password"`
}

// SignUpPayload signup body
type SignUpPayload struct {
	FirstName       string `json:"firstname"`
	LastName        string `json:"lastname"`
	Email           string `json:"email"`
	Employee_number string `json:"employee_number"`
	Password        string `json:"password"`
}

// LoginResponse token response
type LoginResponse struct {
	Role  string `json:"role"`
	Token string `json:"token"`
	ID    uint   `json:"id"`
}

// POST /login
func LoginEmployee(c *gin.Context) {
	var payload LoginPayload
	var em entity.Employee

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย email ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM employees WHERE Employee_number = ?", payload.Email).Scan(&em).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(em.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(em.Employee_number)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Role:  GetRoleName(em.ID),
		Token: signedToken,
		ID:    em.ID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}


func LoginDentist(c *gin.Context) {
	var payload LoginPayload
	var dt entity.Dentist

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย email ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM dentists WHERE email = ?", payload.Email).Scan(&dt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(dt.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(dt.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Role:  GetRoleDentist(dt.ID),
		Token: signedToken,
		ID:    dt.ID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}


func GetRoleName(id uint) string {
	em := entity.Employee{}
	tx := entity.DB().Preload("Role").First(&em, id)
	

	if tx.Error != nil {
		return "Role not found"
	} else if em.Role.Role_name == "Admin" {
		return "Admin"
	} else if em.Role.Role_name == "Nurse" {
		return "Nurse"
	}
	return "err"
}

func GetRoleDentist(id uint) string {
	dt := entity.Dentist{}
	tx := entity.DB().Preload("Role").First(&dt, id)


	if tx.Error != nil {
		return "Role not found"
	} else if dt.Role.Role_name == "Dentist" {
		return "Dentist"
	} 
	return "err"
}


// POST /create employee
func CreateLoginEmployee(c *gin.Context) {
	var payload SignUpPayload
	var em entity.Employee

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	em.FirstName = payload.FirstName
	em.LastName = payload.LastName
	em.Employee_number = payload.Employee_number
	em.Password = string(hashPassword)

	if err := entity.DB().Create(&em).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": em})
}

// POST /create employee
func CreateLoginDentist(c *gin.Context) {
	var payload SignUpPayload
	var dt entity.Dentist

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	dt.FirstName = payload.FirstName
	dt.LastName = payload.LastName
	dt.Password = string(hashPassword)

	if err := entity.DB().Create(&dt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": dt})
}
