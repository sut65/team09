package controller

import (
	"net/http"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

// POST /patien_schedules
func CreatePatienSchedule(c *gin.Context) {
	var patien_schedule entity.Patien_schedule
	var reason entity.Reason
	var patien entity.Patient
	var employee entity.Employee
	var type_of_treatment entity.Type_of_treatment

	// ผลลัพธ์ที่ได้จะถูก bind เข้าตัวแปร patien_schedule
	if err := c.ShouldBindJSON(&patien_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา reason ด้วย id
	if tx := entity.DB().Where("id = ?", patien_schedule.ReasonID).First(&reason); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Reason not found"})
		return
	}

	// 10: ค้นหา patien ด้วย id
	if tx := entity.DB().Where("id = ?", patien_schedule.PatientID).First(&patien); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patien not found"})
		return
	}
	// 11: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", patien_schedule.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// 11.5: ค้นหา type_of_treatment ด้วย id
	if tx := entity.DB().Where("id = ?", patien_schedule.Type_of_treatmentID).First(&type_of_treatment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type_of_treatment not found"})
		return
	
	}
	// 12: สร้าง scholarship
	wv := entity.Patien_schedule{
		Patient:         patien,     
		Employee:    employee,          
		Reason: reason,       	
		Patien_Number: patien_schedule.Patien_Number,
		Type_of_treatment:	type_of_treatment,
		Date_time:       patien_schedule.Date_time,
	}

	if _, err := govalidator.ValidateStruct(wv); err != nil{
			c.JSON(http.StatusBadRequest, gin.H{"Patien_schedule": err.Error()})
			return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": wv})
}

// GET /patien_schedule/:id

func GetPatienSchedule(c *gin.Context) {
	var patien_schedule entity.Patien_schedule
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&patien_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PatienSchedule not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patien_schedule})
}

// GET /patien_schedules
func ListPatienSchedules(c *gin.Context) {
	var patien_schedules []entity.Patien_schedule
	if err := entity.DB().Preload("Patient").Preload("Employee").Preload("Reason").Preload("Type_of_treatment",).Raw("SELECT * FROM patien_schedules").Find(&patien_schedules).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patien_schedules})
}

// DELETE /patien_schedules/:id
func DeletePatienSchedule(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM patien_schedules WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patienschedule not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /patien_schedules
func UpdatePatienSchedules(c *gin.Context) {

	var patien_schedule entity.Patien_schedule
	id := c.Param("id")
	var reason entity.Reason
	var patien entity.Patient
	var employee entity.Employee
	var type_of_treatment entity.Type_of_treatment

	if err := c.ShouldBindJSON(&patien_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", patien_schedule.ReasonID).First(&reason); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ReasonID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", patien_schedule.PatientID).First(&patien); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PatientID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", patien_schedule.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "EmployeeID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", patien_schedule.Type_of_treatmentID).First(&type_of_treatment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type_of_treatmentID not found"})
		return
	}
	wv := entity.Patien_schedule{
		Patient:         patien,     
		Employee:    employee,          
		Reason: reason,       	
		Patien_Number: patien_schedule.Patien_Number,
		Type_of_treatment:	type_of_treatment,
		Date_time:       patien_schedule.Date_time,
	}

	if _, err := govalidator.ValidateStruct(wv); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"Patien_schedule": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", id).Updates(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patien_schedule})
}
