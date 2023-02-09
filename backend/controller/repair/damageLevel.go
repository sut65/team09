package controller

import (
	"github.com/sut65/team09/entity" // เรียกเพื่อเรียกใช้ฟังก์ชั่นใน setup.go (มันจะถูก declare อัตโนมัติว่าตัวมันเองเป็น entity)

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET //:id
func GetDamageLevel(c *gin.Context) {
	var damagelevel entity.Status
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM damage_levels WHERE id = ?", id).Scan(&damagelevel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": damagelevel})
}

// GET /damagelevels
func ListDamageLevels(c *gin.Context) {
	var damagelevels []entity.DamageLevel

	if err := entity.DB().Raw("SELECT * FROM damage_levels").Scan(&damagelevels).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": damagelevels})
}
