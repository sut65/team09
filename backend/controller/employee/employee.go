package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/sut65/team09/entity" // เรียกเพื่อเรียกใช้ฟังก์ชั่นใน setup.go (มันจะถูก declare อัตโนมัติว่าตัวมันเองเป็น entity)
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /users
func CreateEmployee(c *gin.Context) {

	var employee entity.Employee
	var gender entity.Gender
	var role entity.Role
	var province entity.Province
	var district entity.District
	var sub_district entity.Sub_district

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร employee
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", employee.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// 9: ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", employee.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	// 10: ค้นหา province ด้วย id
	if tx := entity.DB().Where("id = ?", employee.ProvinceID).First(&province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "province not found"})
		return
	}

	// 10: ค้นหา district ด้วย id
	if tx := entity.DB().Where("id = ?", employee.DistrictID).First(&district); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "district not found"})
		return
	}

	// 10: ค้นหา sub-district ด้วย id
	if tx := entity.DB().Where("id = ?", employee.Sub_districtID).First(&sub_district); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sub-district not found"})
		return
	}

	// เข้ารหัสลับจากบัตรประชาชนที่ Admin กรอกข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(employee.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	employee.Password = string(hashPassword)

	// 12: สร้าง Employee
	emp := entity.Employee{
		FirstName:       employee.FirstName,
		LastName:        employee.LastName,
		Employee_number: employee.Employee_number,
		Personal_id:     employee.Personal_id,
		Password:        string(hashPassword),
		Email:           employee.Email,
		Old:             employee.Old,
		Date_employed:   employee.Date_employed,
		Salary:          employee.Salary,
		House_no:        employee.House_no,
		Gender:          gender, // โยงความสัมพันธ์กับ Entity gender
		Province:        province,
		District:        district,
		Sub_district:    sub_district,
		Role:            role,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&emp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": emp})
}

// GET /employee/:id
func GetEmployee(c *gin.Context) {
	var employee entity.Employee
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET /employees

func ListEmployee(c *gin.Context) {

	var employees []entity.Employee

	if err := entity.DB().Preload("Role").Preload("Gender").Preload("Sub_district").Preload("District").Preload("Province").Raw("SELECT * FROM employees").Find(&employees).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"data": employees})

}

// DELETE /employees/:id

func DeleteEmployee(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /employees

func UpdateEmployee(c *gin.Context) {
	id := c.Param("id")
	var employee entity.Employee
	var gender entity.Gender
	var role entity.Role
	var province entity.Province
	var district entity.District
	var sub_district entity.Sub_district

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", employee.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", employee.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", employee.ProvinceID).First(&province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "province not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", employee.DistrictID).First(&district); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "district not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", employee.Sub_districtID).First(&sub_district); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sub-district not found"})
		return
	}

	emp := entity.Employee{
		FirstName:       employee.FirstName,
		LastName:        employee.LastName,
		Employee_number: employee.Employee_number,
		Personal_id:     employee.Personal_id,
		Password:        employee.Password,
		Email:           employee.Email,
		Old:             employee.Old,
		Date_employed:   employee.Date_employed,
		Salary:          employee.Salary,
		House_no:        employee.House_no,
		Gender:          gender,
		Province:        province,
		District:        district,
		Sub_district:    sub_district,
		Role:            role,
	}

	if !(employee.Password[0:7] == "$2a$14$") { // เช็คว่ารหัสที่ผ่านเข้ามามีการ encrypt แล้วหรือยัง หากมีการ encrypt แล้วจะไม่ทำการ encrypt ซ้ำ
		hashPassword, err := bcrypt.GenerateFromPassword([]byte(employee.Password), 14)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
			return
		}
		print("HASH!!!!")
		employee.Password = string(hashPassword)
	} else {
		print("NOT HASH!!!")
	}

	if err := entity.DB().Where("id = ?", id).Updates(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": emp})
}
