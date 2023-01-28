package controller

import (
	"github.com/sut65/team09/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /Payment_status/:id ดึงข้อมูล Payment_status ทีละตัวโดยใช้ id
func GetPayment_status(c *gin.Context) {
	var payment_status entity.Payment_status
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM payment_statuses WHERE id = ?", id).Scan(&payment_status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment_status})
}

// GET /Payment_statuses ดึงข้อมูล Payment_status ทั้งหมด
func ListPayment_statuses(c *gin.Context) {
	var payment_statuses []entity.Payment_status

	if err := entity.DB().Raw("SELECT * FROM payment_statuses").Scan(&payment_statuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment_statuses})
}