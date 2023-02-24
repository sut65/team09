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

	p_create2 := entity.Payment{
		Patient:              	patient,
		Employee:              	employee,
		Payment_status:       	payment_status,
		Total_price:			payment.Total_price,
		Payment_code:			payment.Payment_code,
		DateTimePayment: 		payment.DateTimePayment,
	}

	if err := entity.DB().Create(&p_create2).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p_create2})
}

// GET /Payment/:id ดึงข้อมูล Payment ทีละตัวโดยใช้ id
func GetPayment(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")

	if tx := entity.DB().Preload("Patient").Preload("Employee").Preload("Payment_status").Where("id = ?", id).First(&payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET /Payments ดึงข้อมูล Payment ทั้งหมด
func ListPayments(c *gin.Context) {
	var payments []entity.Payment

	if err := entity.DB().Preload("Patient").Preload("Employee").Preload("Payment_status").Raw("SELECT * FROM payments").Find(&payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payments})
}

// DELETE /Payment/:id
func DeletePayment(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM payments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /food_information
func UpdatePayment(c *gin.Context) {
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

	// อัปเดต Payment
	p_update2 := entity.Payment{
		Patient:              	patient,
		Employee:              	employee,
		Payment_status:       	payment_status,
		Total_price:			payment.Total_price,
		Payment_code:			payment.Payment_code,
		DateTimePayment: 		payment.DateTimePayment,
	}

	// บันทึก
	if err := entity.DB().Where("id = ?", payment.ID).Updates(&p_update2).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": p_update2})
}