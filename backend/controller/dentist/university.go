package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

// POST /university
func CreateUniversity(c *gin.Context) {
	var universitys entity.University
	if err := c.ShouldBindJSON(&universitys); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&universitys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": universitys})
}

// GET /university
// List all university
func ListUniversity(c *gin.Context) {
	var universitys []entity.University
	if err := entity.DB().Raw("SELECT * FROM universities").Scan(&universitys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": universitys})
}

// GET /university/:id
// Get university by id
func GetUniversity(c *gin.Context) {
	var universitys entity.University
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&universitys); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "university not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": universitys})
}

// DELETE /university/:id
func DeleteUniversity(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM universities WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "university not found"})
		return
	}
}

// PATCH /university
func UpdateUniversity(c *gin.Context) {
	var universitys entity.University
	if err := c.ShouldBindJSON(&universitys); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", universitys.ID).First(&universitys); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	if err := entity.DB().Save(&universitys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": universitys})
}