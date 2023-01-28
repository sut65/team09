package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

// POST /Category
func CreateCategory(c *gin.Context) {
	var category entity.Category
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": category})
}

// GET /Category
// List all Category
func ListCategory(c *gin.Context) {
	var categorys []entity.Category
	if err := entity.DB().Raw("SELECT * FROM categories").Scan(&categorys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": categorys})
}

// GET /Category/:id
// Get Category by id
func GetCategory(c *gin.Context) {
	var categorys entity.Category
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&categorys); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": categorys})
}

// DELETE /Category/:id
func DeleteCategory(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM categories WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "categorys not found"})
		return
	}
}

// PATCH /Category
func UpdateCategory(c *gin.Context) {
	var categorys entity.Category
	if err := c.ShouldBindJSON(&categorys); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", categorys.ID).First(&categorys); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}

	if err := entity.DB().Save(&categorys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": categorys})
}