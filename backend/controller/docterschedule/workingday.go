package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

func CreateWorkingday(c *gin.Context) {
	var workingday entity.Workingday
	if err := c.ShouldBindJSON(&workingday); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&workingday).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": workingday})

}

// GET /workingday/:id
func GetWorkingday(c *gin.Context) {
	var workingday entity.Workingday
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&workingday); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workingday not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": workingday})
}

// GET /workingday
func ListWorkingdays(c *gin.Context) {
	var workingdays []entity.Workingday
	if err := entity.DB().Raw("SELECT * FROM workingdays").Scan(&workingdays).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": workingdays})
}

// DELETE /workingday/:id
func DeleteWorkingday(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM workingdays WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workingdays not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /workingdays
func UpdateWorkingday(c *gin.Context) {
	var reason entity.Reason
	if err := c.ShouldBindJSON(&reason); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", reason.ID).First(&reason); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workingday not found"})
		return
	}

	if err := entity.DB().Save(&reason).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reason})
}
