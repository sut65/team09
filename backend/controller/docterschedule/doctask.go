package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

func CreateDoctask(c *gin.Context) {
	var doctask entity.Doctask
	if err := c.ShouldBindJSON(&doctask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&doctask).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": doctask})

}

// GET /doctask/:id
func GetDoctask(c *gin.Context) {
	var doctask entity.Doctask
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&doctask); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctask not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": doctask})
}

// GET /doctask
func ListDoctasks(c *gin.Context) {
	var doctasks []entity.Doctask
	if err := entity.DB().Raw("SELECT * FROM doctasks").Scan(&doctasks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": doctasks})
}

// DELETE /doctask/:id
func DeleteDoctask(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM doctasks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctasks not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /doctasks
func UpdateDoctask(c *gin.Context) {
	var doctask entity.Doctask
	if err := c.ShouldBindJSON(&doctask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", doctask.ID).First(&doctask); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctask not found"})
		return
	}

	if err := entity.DB().Save(&doctask).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": doctask})
}
