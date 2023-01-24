package controller

import (
	"github.com/sut65/team09/entity" // เรียกเพื่อเรียกใช้ฟังก์ชั่นใน setup.go (มันจะถูก declare อัตโนมัติว่าตัวมันเองเป็น entity)

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET //:id
func GetType(c *gin.Context) {
	var ttype entity.Type
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM fines WHERE id = ?", id).Scan(&ttype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ttype})
}

// GET /types
func ListTypes(c *gin.Context) {
	var types []entity.Status

	if err := entity.DB().Raw("SELECT * FROM fines").Scan(&types).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": types})
}
