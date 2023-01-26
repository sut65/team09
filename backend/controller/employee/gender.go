package controller

import (
	"github.com/sut65/team09/entity" // เรียกเพื่อเรียกใช้ฟังก์ชั่นใน setup.go (มันจะถูก declare อัตโนมัติว่าตัวมันเองเป็น entity)

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /gender
func CreateGender(c *gin.Context) {
	var gender entity.Gender
	if err := c.ShouldBindJSON(&gender); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&gender).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": gender})
}

// GET /gender
// List all gender
func ListGenders(c *gin.Context) {
	var genders []entity.Gender
	if err := entity.DB().Raw("SELECT * FROM genders").Scan(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": genders})
}

// GET /gender/:id
// Get gender by id
func GetGender(c *gin.Context) {
	var genders entity.Gender
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&genders); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": genders})
}

// DELETE /gender/:id
func DeleteGender(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM genders WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}
}

// PATCH /genders
func UpdateGender(c *gin.Context) {
	var genders entity.Gender
	if err := c.ShouldBindJSON(&genders); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", genders.ID).First(&genders); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	if err := entity.DB().Save(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": genders})
}
