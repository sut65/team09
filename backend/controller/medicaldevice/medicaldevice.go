package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

// POST /MedicalDevices
func CreateMedicalDevice(c *gin.Context) {
	var medicaldevice entity.MedicalDevice
	var employee entity.Employee
	var ttype entity.Type
	var status entity.Status

	// ผลลัพธ์ที่ได้จะถูก bind เข้าตัวแปร medicaldevice
	if err := c.ShouldBindJSON(&medicaldevice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", medicaldevice.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// ค้นหา type ด้วย id
	if tx := entity.DB().Where("id = ?", medicaldevice.TypeID).First(&ttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type not found"})
		return
	}

	// ค้นหา status ด้วย id
	if tx := entity.DB().Where("id = ?", medicaldevice.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	// สร้าง MedicalDevice
	md := entity.MedicalDevice{
		Employee:    employee,
		Type:        ttype,
		Status:      status,
		Device_Name: medicaldevice.Device_Name,
		Amount:      medicaldevice.Amount,
		Date:        medicaldevice.Date,
	}

	// บันทึก
	if err := entity.DB().Create(&md).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": md})
}

// GET /MedicalDevice/:id
func GetMedicalDevice(c *gin.Context) {
	var medicaldevice entity.MedicalDevice
	id := c.Param("id")

	if tx := entity.DB().Preload("Employee").Preload("Type").Preload("Status").Where("id = ?", id).First(&medicaldevice); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicaldevice not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": medicaldevice})
}

// GET /MedicalDevices
func ListMedicalDevices(c *gin.Context) {
	var medicaldevices []entity.MedicalDevice
	if err := entity.DB().Preload("Employee").Preload("Type").Preload("Status").Raw("SELECT * FROM medical_devices").Find(&medicaldevices).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": medicaldevices})
}

// DELETE /medicaldevice/:id
func DeleteMedicalDevice(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM medical_devices WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicaldevices not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /medicaldevice
func UpdateMedicalDevice(c *gin.Context) {

	var medicaldevice entity.MedicalDevice
	if err := c.ShouldBindJSON(&medicaldevice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", medicaldevice.ID).First(&medicaldevice); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patien_schedule not found"})
		return
	}
	if err := entity.DB().Save(&medicaldevice).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": medicaldevice})
}
