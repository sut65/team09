package controller

import (
	"github.com/sut65/team09/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /Medicine/:id ดึงข้อมูล Medicine ทีละตัวโดยใช้ id
func GetMedicine(c *gin.Context) {
	var medicine entity.Medicine
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM medicines WHERE id = ?", id).Scan(&medicine).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": medicine})
}

// GET /Medicines ดึงข้อมูล Medicine ทั้งหมด
func ListMedicines(c *gin.Context) {
	var medicines []entity.Medicine

	if err := entity.DB().Raw("SELECT * FROM medicines").Scan(&medicines).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": medicines})
}