package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

// POST /Repairs
func CreateRepair(c *gin.Context) {
	var repair entity.Repair
	var employee entity.Employee
	var medicaldevice entity.MedicalDevice
	var damagelevel entity.DamageLevel

	// ผลลัพธ์ที่ได้จะถูก bind เข้าตัวแปร repair
	if err := c.ShouldBindJSON(&repair); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(repair); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", repair.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// ค้นหา medicaldevice ด้วย id
	if tx := entity.DB().Where("id = ?", repair.MedicalDeviceID).First(&medicaldevice); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicaldevice not found"})
		return
	}

	// ค้นหา damagelevel ด้วย id
	if tx := entity.DB().Where("id = ?", repair.DamageLevelID).First(&damagelevel); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "damagelevel not found"})
		return
	}

	// สร้าง Repair
	rp := entity.Repair{
		Employee:       employee,
		MedicalDevice:  medicaldevice,
		DamageLevel:    damagelevel,
		Repair_Note:    repair.Repair_Note,
		Date_Of_Repair: repair.Date_Of_Repair,
	}

	// บันทึก
	if err := entity.DB().Create(&rp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": rp})
}

// GET /Repair/:id
func GetRepair(c *gin.Context) {
	var repair entity.Repair
	id := c.Param("id")

	if tx := entity.DB().Preload("Employee").Preload("MedicalDevice").Preload("DamageLevel").Where("id = ?", id).First(&repair); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repair not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repair})
}

// GET /Repairs
func ListRepairs(c *gin.Context) {
	var repairs []entity.Repair
	if err := entity.DB().Preload("Employee").Preload("MedicalDevice").Preload("DamageLevel").Raw("SELECT * FROM repairs").Find(&repairs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairs})
}

// DELETE /repair/:id
func DeleteRepair(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM repairs WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repairs not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /repair
func UpdateRepairs(c *gin.Context) {
	var repair entity.Repair
	// id := c.Param("id")
	var employee entity.Employee
	var medicaldevice entity.MedicalDevice
	var damagelevel entity.DamageLevel

	// ผลลัพธ์ที่ได้จะถูก bind เข้าตัวแปร repair
	if err := c.ShouldBindJSON(&repair); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(repair); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", repair.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// ค้นหา medicaldevice ด้วย id
	if tx := entity.DB().Where("id = ?", repair.MedicalDeviceID).First(&medicaldevice); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicaldevice not found"})
		return
	}

	// ค้นหา damagelevel ด้วย id
	if tx := entity.DB().Where("id = ?", repair.DamageLevelID).First(&damagelevel); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "damagelevel not found"})
		return
	}

	rp := entity.Repair{
		Employee:       employee,
		MedicalDevice:  medicaldevice,
		DamageLevel:    damagelevel,
		Repair_Note:    repair.Repair_Note,
		Date_Of_Repair: repair.Date_Of_Repair,
	}

	// บันทึก
	if err := entity.DB().Where("id = ?", repair.ID).Updates(&rp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": repair})

}
