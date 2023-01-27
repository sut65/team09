package controller

import (
	"github.com/sut65/team09/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

func CreatePrescription(c *gin.Context) {
	var prescription entity.Prescription
	var patient entity.Patient
	var dentist entity.Dentist
	var medicine entity.Medicine
	var medicine_status entity.Medicine_status

	if err := c.ShouldBindJSON(&prescription); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", prescription.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", prescription.DentistID).First(&dentist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dentist not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", prescription.MedicineID).First(&medicine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", prescription.Medicine_statusID).First(&medicine_status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicine_status not found"})
		return
	}

	// if err := entity.DB().Create(&room.RoomNumber).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	rm := entity.Prescription{
		Patient:              	patient,
		Dentist:              	dentist,
		Medicine:				medicine,
		Medicine_status:       	medicine_status,
		DateTimePrescription: prescription.DateTimePrescription,
	}

	if err := entity.DB().Create(&rm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rm})
}

// GET /Prescription/:id ดึงข้อมูล Prescription ทีละตัวโดยใช้ id
func GetPrescription(c *gin.Context) {
	var prescription entity.Prescription
	id := c.Param("id")

	if err := entity.DB().Preload("Patient").Preload("Dentist").Preload("Medicine").Preload("Medicine_status").Raw("SELECT * FROM prescriptions WHERE id = ?", id).Scan(&prescription).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": prescription})
}

// GET /confirmations ดึงข้อมูล confirmation ทั้งหมด
func ListConfirmations(c *gin.Context) {
	var prescriptions []entity.Prescription

	if err := entity.DB().Preload("Patient").Preload("Dentist").Preload("Medicine").Preload("Medicine_status").Raw("SELECT * FROM prescriptions").Scan(&prescriptions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": prescriptions})
}