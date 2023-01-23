package controller

import (
	"github.com/sut65/team09/entity" // เรียกเพื่อเรียกใช้ฟังก์ชั่นใน setup.go (มันจะถูก declare อัตโนมัติว่าตัวมันเองเป็น entity)

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /sub_tricts

func ListSub_district(c *gin.Context) {
	var sub_districts []entity.Sub_district

	if err := entity.DB().Raw("SELECT * FROM sub_districts").Scan(&sub_districts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": sub_districts})
}
