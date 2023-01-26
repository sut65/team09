package controller

import (
	"github.com/sut65/team09/entity" // เรียกเพื่อเรียกใช้ฟังก์ชั่นใน setup.go (มันจะถูก declare อัตโนมัติว่าตัวมันเองเป็น entity)

	"github.com/gin-gonic/gin"

	"net/http"
)

// * POST /symptom
func CreateSymptom(c *gin.Context) {
	var symptom entity.Symptom
	if err := c.ShouldBindJSON(&symptom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&symptom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": symptom})
}

// * GET /symptom/:id
func GetSymptom(c *gin.Context) {
	var symptom entity.Symptom
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&symptom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "symptom not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": symptom})
}

// * GET /symptom
func ListSymptom(c *gin.Context) {
	var symptom []entity.Symptom
	if err := entity.DB().Raw("SELECT * FROM symptoms").Scan(&symptom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": symptom})
}

// * DELETE /symptom/:id
func DeleteSymptom(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM symptoms WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "symptom not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// * PATCH /symptom
func UpdateSymptom(c *gin.Context) {
	var symptom entity.Symptom
	if err := c.ShouldBindJSON(&symptom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", symptom.ID).First(&symptom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	if err := entity.DB().Save(&symptom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": symptom})
}
