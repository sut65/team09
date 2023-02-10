package controller

import (
	"github.com/sut65/team09/entity" // เรียกเพื่อเรียกใช้ฟังก์ชั่นใน setup.go (มันจะถูก declare อัตโนมัติว่าตัวมันเองเป็น entity)

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /users
func CreatePatient(c *gin.Context) {

	var patient entity.Patient
	var gender entity.Gender
	var symptom entity.Symptom
	var province entity.Province
	var district entity.District
	var sub_district entity.Sub_district
	var employee entity.Employee

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร employee
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", patient.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// 9: ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", patient.SymptomID).First(&symptom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "symptom not found"})
		return
	}

	// 10: ค้นหา province ด้วย id
	if tx := entity.DB().Where("id = ?", patient.ProvinceID).First(&province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "province not found"})
		return
	}

	// 10: ค้นหา district ด้วย id
	if tx := entity.DB().Where("id = ?", patient.DistrictID).First(&district); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "district not found"})
		return
	}

	// 10: ค้นหา sub-district ด้วย id
	if tx := entity.DB().Where("id = ?", patient.Sub_districtID).First(&sub_district); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sub-district not found"})
		return
	}
	// if tx := entity.DB().Where("id = ?", patient.EmployeeID).First(&employee); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
	// 	return
	// }

	// // เข้ารหัสลับจากบัตรประชาชนที่ Admin กรอกข้อมูล
	// hashPassword, err := bcrypt.GenerateFromPassword([]byte(patient.Password), 14)
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
	// 	return
	// }

	// employee.Password = string(hashPassword)

	// 12: สร้าง Employee
	pt := entity.Patient{
		FirstName:          patient.FirstName,
		LastName:           patient.LastName,
		Personal_id:        patient.Personal_id,
		Old:                patient.Old,
		Weight:             patient.Weight,
		Height:             patient.Height,
		Underlying_disease: patient.Underlying_disease,
		Drug_alergy:        patient.Drug_alergy,
		House_no:           patient.House_no,
		Symptom:            symptom,
		Symptom_name:       patient.Symptom_name,
		Gender:             gender,
		Province:           province,
		District:           district,
		Sub_district:       sub_district,
		Employee:           employee,
	}
	// 13: บันทึก
	if err := entity.DB().Create(&pt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pt})
}

// GET /patient/:id
func GetPatient(c *gin.Context) {
	var patient entity.Patient
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patient})
}

// GET /patients

func ListPatient(c *gin.Context) {

	var patients []entity.Patient

	if err := entity.DB().Preload("Symptom").Preload("Gender").Preload("Sub_district").Preload("District").Preload("Province").Preload("Employee").Raw("SELECT * FROM patients").Find(&patients).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"data": patients})

}

// DELETE /patients/:id

func DeletePatient(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM patients WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH patients

func UpdatePatient(c *gin.Context) {
	id := c.Param("id")
	var gender entity.Gender
	var symptom entity.Symptom
	var province entity.Province
	var district entity.District
	var sub_district entity.Sub_district
	var employee entity.Employee
	var patient entity.Patient

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร employee
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", patient.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// 9: ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", patient.SymptomID).First(&symptom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "symptom not found"})
		return
	}

	// 10: ค้นหา province ด้วย id
	if tx := entity.DB().Where("id = ?", patient.ProvinceID).First(&province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "province not found"})
		return
	}

	// 10: ค้นหา district ด้วย id
	if tx := entity.DB().Where("id = ?", patient.DistrictID).First(&district); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "district not found"})
		return
	}

	// 10: ค้นหา sub-district ด้วย id
	if tx := entity.DB().Where("id = ?", patient.Sub_districtID).First(&sub_district); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sub-district not found"})
		return
	}
	// if tx := entity.DB().Where("id = ?", patient.EmployeeID).First(&employee); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
	// 	return
	// }

	// // เข้ารหัสลับจากบัตรประชาชนที่ Admin กรอกข้อมูล
	// hashPassword, err := bcrypt.GenerateFromPassword([]byte(patient.Password), 14)
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
	// 	return
	// }

	// employee.Password = string(hashPassword)

	// 12: สร้าง Employee
	pt := entity.Patient{
		FirstName:          patient.FirstName,
		LastName:           patient.LastName,
		Personal_id:        patient.Personal_id,
		Old:                patient.Old,
		Weight:             patient.Weight,
		Height:             patient.Height,
		Underlying_disease: patient.Underlying_disease,
		Drug_alergy:        patient.Drug_alergy,
		House_no:           patient.House_no,
		Symptom:            symptom,
		Symptom_name:       patient.Symptom_name,
		Gender:             gender,
		Province:           province,
		District:           district,
		Sub_district:       sub_district,
		Employee:           employee,
	}
	// 13: อัพเดต
	if err := entity.DB().Where("id = ?", id).Updates(&patient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pt})

}
