package controller

import (
	"github.com/sut65/team09/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /room_detail
func CreateRoom_Detail(c *gin.Context) {

	var room_detail entity.Room_Detail

	var category entity.Category
	var room_number entity.Room_Number
	var md entity.MedicalDevice

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร room_detail
	if err := c.ShouldBindJSON(&room_detail); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา category ด้วย id
	if tx := entity.DB().Where("id = ?", room_detail.CategoryID).First(&category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}

	// 9: ค้นหา room_number ด้วย id
	if tx := entity.DB().Where("id = ?", room_detail.Room_NumberID).First(&room_number); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room_number not found"})
		return
	}

	// 10: ค้นหา medicialdevice ด้วย id
	if tx := entity.DB().Where("id = ?", room_detail.MedicalDevice).First(&md); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicaldevice not found"})
		return
	}

	// 12: สร้าง room_detail
	wv := entity.Room_Detail{

		Category:       category,       // โยงความสัมพันธ์กับ Entity category
		Room_Number:    room_number,    // โยงความสัมพันธ์กับ Entity room_number
		MedicalDevice:  md, // โยงความสัมพันธ์กับ Entity medicaldevice

	}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wv})
}

// GET /room_detail/:id
func GetRoom_Detail(c *gin.Context) {
	var room_detail entity.Room_Detail
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&room_detail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room_detail not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room_detail})
}

// GET /room_detail

func ListRoom_Detail(c *gin.Context) {

	var room_detail []entity.Room_Detail

	if err := entity.DB().Preload("Category").Preload("Room_Number").Preload("MedicalDevice").Raw("SELECT * FROM room_details").Find(&room_detail).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"data": room_detail})

}

// DELETE /room_detail/:id

func DeleteRoom_Detail(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM room_details WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "room_detail not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /employees

func UpdateRoom_Detail(c *gin.Context) {

	var room_detail entity.Room_Detail

	if err := c.ShouldBindJSON(&room_detail); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", room_detail.ID).First(&room_detail); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "room_detail not found"})

		return

	}

	if err := entity.DB().Save(&room_detail).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": room_detail})

}