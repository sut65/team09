package controller

import (
	"github.com/sut65/team09/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /Medicine_status/:id ดึงข้อมูล Medicine_status ทีละตัวโดยใช้ id
func GetMedicine_status(c *gin.Context) {
	var medicine_status entity.Medicine_status
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM medicine_statuses WHERE id = ?", id).Scan(&medicine_status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": medicine_status})
}

// GET /Medicine_statuses ดึงข้อมูล Medicine_status ทั้งหมด
func ListMedicine_statuses(c *gin.Context) {
	var medicine_statuses []entity.Medicine_status

	if err := entity.DB().Raw("SELECT * FROM medicine_statuses").Scan(&medicine_statuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": medicine_statuses})
}