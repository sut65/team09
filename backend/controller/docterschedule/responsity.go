package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

func CreateResponsity(c *gin.Context) {
	var responsity entity.Responsity
	if err := c.ShouldBindJSON(&responsity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&responsity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": responsity})

}

// GET /responsity/:id
func GetResponsity(c *gin.Context) {
	var responsity entity.Responsity
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&responsity); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "responsity not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": responsity})
}

// GET /responsity
func ListResponsitys(c *gin.Context) {
	var responsitys []entity.Responsity
	if err := entity.DB().Raw("SELECT * FROM responsities").Scan(&responsitys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": responsitys})
}

// DELETE /responsity/:id
func DeleteResponsity(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM responsities WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "responsitys not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /responsitys
func UpdateResponsity(c *gin.Context) {
	var responsity entity.Responsity
	if err := c.ShouldBindJSON(&responsity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", responsity.ID).First(&responsity); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resolution not found"})
		return
	}

	if err := entity.DB().Save(&responsity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": responsity})
}
