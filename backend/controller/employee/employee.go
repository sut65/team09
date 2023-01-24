package controller

import (
	"github.com/sut65/team09/entity" // เรียกเพื่อเรียกใช้ฟังก์ชั่นใน setup.go (มันจะถูก declare อัตโนมัติว่าตัวมันเองเป็น entity)
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /employee

func CreateEmployee(c *gin.Context) {
	var employee entity.Employee
	var gender entity.Gender
	var role entity.Role
	// var province entity.Province
	// var district entity.District
	var sub_district entity.Sub_district

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", employee.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select your gender"})
		return
	}
	if tx := entity.DB().Where("id = ?", employee.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select your role"})
		return
	}
	// if tx := entity.DB().Where("id = ?", employee.ProvinceID).First(&province); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "not found"})
	// 	return
	// }

	if tx := entity.DB().Where("id = ?", employee.Sub_districtID).First(&sub_district); !(tx.RowsAffected == 0) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "lease select your sub_district"})
		return
	}

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(employee.Password), 12)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	emp := entity.Employee{
		FirstName:       employee.FirstName,
		LastName:        employee.LastName,
		Employee_number: employee.Employee_number,
		Personal_id:     employee.Personal_id,
		Password:        string(hashPassword),
		Phone:           employee.Phone,
		House_no:        employee.House_no,
		Gender:          gender, // โยงความสัมพันธ์กับ Entity gender
		Sub_district:    sub_district,
		Role:            role,
	}
	//บันทึก
	if err := entity.DB().Create(&emp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": employee})

}
