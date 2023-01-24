package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

// POST /patien_schedules
func CreatePatienSchedule(c *gin.Context) {
	var patien_schedule entity.Patien_schedule
	var reason entity.Reason

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

	// 12: สร้าง scholarship
	wv := entity.Patien_schedule{}

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
	if err := entity.DB().Preload("Reason").Raw("SELECT * FROM patien_schedules").Find(&patien_schedules).Error; err != nil {
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
	if err := c.ShouldBindJSON(&patien_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", patien_schedule.ID).First(&patien_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patien_schedule not found"})
		return
	}
	if err := entity.DB().Save(&patien_schedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patien_schedule})
}
