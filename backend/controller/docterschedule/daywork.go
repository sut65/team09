package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

func CreateDaywork(c *gin.Context) {
	var daywork entity.Daywork
	if err := c.ShouldBindJSON(&daywork); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&daywork).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": daywork})

}

// GET /daywork/:id
func GetDaywork(c *gin.Context) {
	var daywork entity.Daywork
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&daywork); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "daywork not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": daywork})
}

// GET /daywork
func ListDayworks(c *gin.Context) {
	var dayworks []entity.Daywork
	if err := entity.DB().Raw("SELECT * FROM dayworks").Scan(&dayworks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dayworks})
}

// DELETE /daywork/:id
func DeleteDaywork(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM dayworks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dayworks not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /dayworks
func UpdateDaywork(c *gin.Context) {
	var daywork entity.Daywork
	if err := c.ShouldBindJSON(&daywork); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", daywork.ID).First(&daywork); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "daywork not found"})
		return
	}

	if err := entity.DB().Save(&daywork).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": daywork})
}
