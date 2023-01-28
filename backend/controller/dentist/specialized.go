package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

// POST /specialized
func CreateSpecialized(c *gin.Context) {
	var specialized entity.Specialized
	if err := c.ShouldBindJSON(&specialized); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&specialized).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": specialized})
}

// GET /specialized
// List all specialized
func ListSpecialized(c *gin.Context) {
	var specializeds []entity.Specialized
	if err := entity.DB().Raw("SELECT * FROM specializeds").Scan(&specializeds).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": specializeds})
}

// GET /specialized/:id
// Get specialized by id
func GetSpecialized(c *gin.Context) {
	var specializeds entity.Specialized
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&specializeds); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "specialized not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": specializeds})
}

// DELETE /specialized/:id
func DeleteSpecialized(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM specialized WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "specialized not found"})
		return
	}
}

// PATCH /specialized
func UpdateSpecialized(c *gin.Context) {
	var specializeds entity.Specialized
	if err := c.ShouldBindJSON(&specializeds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", specializeds.ID).First(&specializeds); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	if err := entity.DB().Save(&specializeds).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": specializeds})
}