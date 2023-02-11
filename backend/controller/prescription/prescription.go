package controller

import (
	"github.com/asaskevich/govalidator"
	
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

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(prescription); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
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

	p_create1 := entity.Prescription{
		Patient:              	patient,
		Dentist:              	dentist,
		Medicine:				medicine,
		Medicine_status:       	medicine_status,
		//DateTimePrescription: prescription.DateTimePrescription,
	}

	if err := entity.DB().Create(&p_create1).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p_create1})
}

// GET /Prescription/:id ดึงข้อมูล Prescription ทีละตัวโดยใช้ id
func GetPrescription(c *gin.Context) {
	var prescription entity.Prescription
	id := c.Param("id")

	if tx := entity.DB().Preload("Patient").Preload("Dentist").Preload("Medicine").Preload("Medicine_status").Where("id = ?", id).First(&prescription); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prescription not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": prescription})
}

// GET /Prescriptions ดึงข้อมูล Prescription ทั้งหมด
func ListPrescriptions(c *gin.Context) {
	var prescriptions []entity.Prescription

	if err := entity.DB().Preload("Patient").Preload("Dentist").Preload("Medicine").Preload("Medicine_status").Raw("SELECT * FROM prescriptions").Find(&prescriptions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": prescriptions})
}

// DELETE /Prescription/:id
func DeletePrescription(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM prescriptions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prescription not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Prescription
func UpdatePrescription(c *gin.Context) {
	var prescription entity.Prescription
	var patient entity.Patient
	var dentist entity.Dentist
	var medicine entity.Medicine
	var medicine_status entity.Medicine_status

	if err := c.ShouldBindJSON(&prescription); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
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

	// อัปเดต Prescription
	p_update1 := entity.Prescription{
		Patient:              	patient,
		Dentist:              	dentist,
		Medicine:				medicine,
		Medicine_status:       	medicine_status,
		DateTimePrescription: prescription.DateTimePrescription,
	}

	// บันทึก
	if err := entity.DB().Where("id = ?", prescription.ID).Updates(&p_update1).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": p_update1})
}