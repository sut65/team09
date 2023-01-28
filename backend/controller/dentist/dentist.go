package controller

import (
	"net/http"

	"golang.org/x/crypto/bcrypt"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

// POST /Dentist
func CreateDentist(c *gin.Context) {

	var dentist entity.Dentist

	var gender entity.Gender
	var specialized entity.Specialized
	var university entity.University
	var role entity.Role
	var province entity.Province

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร employee
	if err := c.ShouldBindJSON(&dentist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", dentist.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// 9: ค้นหา specialized ด้วย id
	if tx := entity.DB().Where("id = ?", dentist.SpecializedID).First(&specialized); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "specialized not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", dentist.UniversityID).First(&university); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "university not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", dentist.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	// 10: ค้นหา province ด้วย id
	if tx := entity.DB().Where("id = ?", dentist.ProvinceID).First(&province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "province not found"})
		return
	}

	// เข้ารหัสลับจาก Password ที่ Admin กรอกข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(dentist.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	dentist.Password = string(hashPassword)

	// 12: สร้าง Dentist
	wv := entity.Dentist{
		FirstName:    dentist.FirstName,
		LastName:     dentist.LastName,
		Personal_id:  dentist.Personal_id,
		Email:        dentist.Email,
		Password:     dentist.Password,
		Age:          dentist.Age,
		Phone_Number: dentist.Phone_Number,

		Gender:      gender,      // โยงความสัมพันธ์กับ Entity gender
		Specialized: specialized, // โยงความสัมพันธ์กับ Entity Specialized
		University:  university,  // โยงความสัมพันธ์กับ Entity University
		Role:        role,        // โยงความสัมพันธ์กับ Entity Role
		Province:    province,    // โยงความสัมพันธ์กับ Entity Province
	}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wv})
}

// GET /Dentist/:id
func GetDentist(c *gin.Context) {
	var dentist entity.Dentist
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&dentist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dentist not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dentist})
}

// GET /Dentist

func ListDentist(c *gin.Context) {

	var dentist []entity.Dentist

	if err := entity.DB().Preload("Gender").Preload("Specialized").Preload("University").Preload("Role").Preload("Province").Raw("SELECT * FROM dentists").Find(&dentist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"data": dentist})

}

// DELETE /Dentist/:id

func DeleteDentist(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM dentists WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "dentist not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /employees

func UpdateDentist(c *gin.Context) {

	var dentist entity.Dentist

	if err := c.ShouldBindJSON(&dentist); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", dentist.ID).First(&dentist); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "dentist not found"})

		return

	}

	if err := entity.DB().Save(&dentist).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": dentist})

}