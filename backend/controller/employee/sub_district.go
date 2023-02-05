package controller

import (
	"github.com/sut65/team09/entity" // เรียกเพื่อเรียกใช้ฟังก์ชั่นใน setup.go (มันจะถูก declare อัตโนมัติว่าตัวมันเองเป็น entity)

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /subdistrict
func CreateSubDistrict(c *gin.Context) {
	var subdistrict entity.Sub_district
	if err := c.ShouldBindJSON(&subdistrict); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&subdistrict).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": subdistrict})
}

// GET /subdistrict/:id
func GetSubDistrict(c *gin.Context) {
	var subdistrict []entity.Sub_district
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM sub_districts WHERE district_id = ?", id).Find(&subdistrict).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": subdistrict})
}

// GET /subdistrict
func ListSubDistrict(c *gin.Context) {
	var subdistrict []entity.Sub_district
	if err := entity.DB().Raw("SELECT * FROM Sub_districts").Scan(&subdistrict).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": subdistrict})
}

// DELETE /subdistrict/:id
func DeleteSubDistrict(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Sub_districts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sub-district not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /subdistrict
func UpdateSubDistrict(c *gin.Context) {
	var sub_district entity.District
	if err := c.ShouldBindJSON(&sub_district); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", sub_district.ID).First(&sub_district); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sub-district not found"})
		return
	}

	if err := entity.DB().Save(&sub_district).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": sub_district})
}
