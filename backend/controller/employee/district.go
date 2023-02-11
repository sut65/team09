package controller

import (
	"github.com/sut65/team09/entity" // เรียกเพื่อเรียกใช้ฟังก์ชั่นใน setup.go (มันจะถูก declare อัตโนมัติว่าตัวมันเองเป็น entity)

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /district
func CreateDistrict(c *gin.Context) {
	var district entity.District
	if err := c.ShouldBindJSON(&district); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&district).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": district})
}

// get district ของตารางตัวเอง #เพิ่มมา
func GetDistrictbyID(c *gin.Context) {
	var district entity.District
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&district); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "district not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": district})
}

// GET /district/:id = province
func GetDistrict(c *gin.Context) {
	var district []entity.District
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM districts WHERE province_id = ?", id).Find(&district).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": district})
}

// GET /district
func ListDistrict(c *gin.Context) {
	provinceID := c.Param("province_id")

	var district []entity.District
	if err := entity.DB().Raw("SELECT * FROM Districts WHERE province_id = ?", provinceID).Scan(&district).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": district})
}

// DELETE /district/:id
func DeleteDistrict(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Districts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "district not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /district
func UpdateDistrict(c *gin.Context) {
	var district entity.District
	if err := c.ShouldBindJSON(&district); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", district.ID).First(&district); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "district not found"})
		return
	}

	if err := entity.DB().Save(&district).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": district})
}
