package controller

import (
	"github.com/sut65/team09/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Number
func CreateRoom_Number(c *gin.Context) {
	var room_number entity.Room_Number
	if err := c.ShouldBindJSON(&room_number); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&room_number).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": room_number})
}

// GET /Number
// List all Number
func ListRoom_Number(c *gin.Context) {
	var room_number []entity.Room_Number
	if err := entity.DB().Raw("SELECT * FROM room_numbers").Scan(&room_number).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": room_number})
}

// GET /Number/:id
// Get Number by id
func GetRoom_Number(c *gin.Context) {
	var room_number entity.Room_Number
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&room_number); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room_number not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": room_number})
}

// DELETE /Number/:id
func DeleteRoom_Number(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM room_numbers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room_number not found"})
		return
	}
}

// PATCH /Number
func UpdateRoom_Number(c *gin.Context) {
	var room_number entity.Room_Number
	if err := c.ShouldBindJSON(&room_number); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", room_number.ID).First(&room_number); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}

	if err := entity.DB().Save(&room_number).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": room_number})
}