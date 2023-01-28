package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

// POST /dentist_schedules
func CreateDentistSchedule(c *gin.Context) {
	var dentist_schedule entity.Dentist_schedule
	var respon entity.Doctask
	var day entity.Daywork
	var dentist entity.Dentist

	// ผลลัพธ์ที่ได้จะถูก bind เข้าตัวแปร dentist_schedule
	if err := c.ShouldBindJSON(&dentist_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา daywork ด้วย id
	if tx := entity.DB().Where("id = ?", dentist_schedule.DayworkID).First(&day); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Reason not found"})
		return
	}
	// 10: ค้นหา doctask ด้วย id
	if tx := entity.DB().Where("id = ?", dentist_schedule.ResponID).First(&respon); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctask not found"})
		return
	}
	// 11: ค้นหา dentist ด้วย id
	if tx := entity.DB().Where("id = ?", dentist_schedule.DentistID).First(&dentist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dentist not found"})
		return
	}


	// 12: สร้าง dentist_schedule
	wv := entity.Dentist_schedule{
		Daywork: day,   
		Doctask: respon, 
		Dentist: dentist,  
		TimeWork: dentist_schedule.TimeWork, 
		TimeEnd:  dentist_schedule.TimeEnd,  
	}


	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": wv})
}

// GET /dentist_schedule/:id

func GetDentistSchedule(c *gin.Context) {
	var dentist_schedule entity.Dentist_schedule
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&dentist_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dentist_schedule not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dentist_schedule})
}

// GET /dentist_schedules
func ListDentistSchedules(c *gin.Context) {
	var dentist_schedules []entity.Dentist_schedule
	if err := entity.DB().Preload("Dentist").Preload("Daywork").Preload("Doctask").Raw("SELECT * FROM dentist_schedules").Find(&dentist_schedules).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dentist_schedules})
}

// DELETE /dentist_schedules/:id
func DeleteDentistSchedule(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM dentist_schedules WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dentist_schedule not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /dentist_schedules
func UpdateDentistSchedules(c *gin.Context) {

	var dentist_schedule entity.Dentist_schedule
	if err := c.ShouldBindJSON(&dentist_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", dentist_schedule.ID).First(&dentist_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dentist_schedule not found"})
		return
	}
	if err := entity.DB().Save(&dentist_schedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dentist_schedule})
}
