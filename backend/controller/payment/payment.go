package controller

import (
	"github.com/sut65/team09/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

func CreatePayment(c *gin.Context) {
	var payment entity.Payment
	var patient entity.Patient
	var employee entity.Employee
	var payment_status entity.Payment_status

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", payment.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", payment.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", payment.Payment_statusID).First(&payment_status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment_status not found"})
		return
	}

	// if tx := entity.DB().Where("id = ?", payment.Total_priceID).First(&total_prices); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "total_price not found"})
	// 	return
	// }

	// if err := entity.DB().Create(&room.RoomNumber).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	rm := entity.Payment{
		Patient:              	patient,
		Employee:              	employee,
		Payment_status:       	payment_status,
		Total_price:			payment.Total_price,
		DateTimePayment: 		payment.DateTimePayment,
	}

	if err := entity.DB().Create(&rm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rm})
}

// GET /Payment/:id ดึงข้อมูล Payment ทีละตัวโดยใช้ id
func GetPayment(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")

	if err := entity.DB().Preload("Patient").Preload("Employee").Preload("Payment_status").Raw("SELECT * FROM prescriptions WHERE id = ?", id).Scan(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET /Payments ดึงข้อมูล Payment ทั้งหมด
func ListPayments(c *gin.Context) {
	var payments []entity.Payment

	if err := entity.DB().Preload("Patient").Preload("Employee").Preload("Payment_status").Raw("SELECT * FROM prescriptions").Find(&payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payments})
}