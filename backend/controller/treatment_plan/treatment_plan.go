package controller

import (
	"net/http"
	"github.com/sut65/team09/entity"
	"github.com/gin-gonic/gin" 
) 

func CreateTreatment_plan(c *gin.Context) {
	var treatment_plans entity.Treatment_plan
	var dentists entity.Dentist
	var patients entity.Patient
	var type_of_treatments entity.Type_of_treatment
	var type_of_number_of_treatments entity.Type_of_number_of_treatment
	
	if err := c.ShouldBindJSON(&treatment_plans); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", treatment_plans.DentistID).First(&dentists); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dentist not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", treatment_plans.PatientID).First(&patients); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", treatment_plans.Type_Of_TreatmentID).First(&type_of_treatments); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type_of_treatments not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", treatment_plans.Type_Of_Number_Of_TreatmentID).First(&type_of_number_of_treatments); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type_of_number_of_treatments not found"})
		return
	}

	treatment_plan := entity.Treatment_plan{
		Dentist:                dentists,           
		Patient:                patients,           
		Order_of_treatment: treatment_plans.Order_of_treatment,
		Type_Of_Treatment:      type_of_treatments, 
		Number_of_treatment: treatment_plans.Number_of_treatment,
		Type_Of_Number_Of_Treatment: type_of_number_of_treatments,
		Treatment_detail:       treatment_plans.Treatment_detail,
		Treatment_explain: treatment_plans.Treatment_explain,
		Treatment_time: treatment_plans.Treatment_time,				
	}

	if err := entity.DB().Create(&treatment_plan).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": treatment_plan})
}

func GetTreatment_plan(c *gin.Context) {
	var treatment_plans entity.Treatment_plan
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM treatment_plans WHERE id = ?", id).Scan(&treatment_plans).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": treatment_plans})
}

func ListTreatment_plan(c *gin.Context) {
	var treatments []entity.Treatment
	if err := entity.DB().Raw("SELECT * FROM treatment_plans").Scan(&treatments).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": treatments}) 

}

func ListTreatment_plan_show(c *gin.Context) {
	result := []map[string]interface{}{}
	entity.DB().Table("treatment_plans").
		Select("treatment_plans.id, dentists.first_name, patients.first_name, treatment_plans.order_of_treatment, type_of_treatments.type_of_treatment_name, type_of_number_of_treatments.type_of_number_of_treatment_name, treatment_plans.treatment_detail, treatment_plans.treatment_time").
		Joins("left join dentists on dentists.id = treatment_plans.dentist_id").
		Joins("left join patients on patients.id = treatment_plans.patient_id").
		Joins("left join type_of_treatments on type_of_treatments.id = treatment_plans.type_of_treatment_id").
		Joins("left join type_of_number_of_treatments on type_of_number_of_treatments.id = treatment_plans.type_of_number_of_treatment_id").
		Find(&result)
	c.JSON(http.StatusOK, gin.H{"data": result})
}

func DeleteTreatment_plan(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM treatment_plans WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "treatment_plans not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func UpdateTreatment_plan(c *gin.Context) {
	
	var treatment_plans entity.Treatment_plan
	id := c.Param("id")
	var dentists entity.Dentist
	var patients entity.Patient
	var type_of_treatments entity.Type_of_treatment
	var type_of_number_of_treatments entity.Type_of_number_of_treatment

	if err := c.ShouldBindJSON(&treatment_plans); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", treatment_plans.Type_Of_TreatmentID).First(&type_of_treatments); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type_of_treatments not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", treatment_plans.Type_Of_Number_Of_TreatmentID).First(&type_of_number_of_treatments); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type_of_number_of_treatments not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", treatment_plans.DentistID).First(&dentists); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dentists not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", treatment_plans.PatientID).First(&patients); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patients not found"})
		return
	}
	treatmentplans := entity.Treatment_plan{
		Dentist:                dentists,           
		Patient:                patients,           
		Order_of_treatment: treatment_plans.Order_of_treatment,
		Type_Of_Treatment:      type_of_treatments, 
		Number_of_treatment: treatment_plans.Number_of_treatment,
		Type_Of_Number_Of_Treatment: type_of_number_of_treatments,
		Treatment_detail:       treatment_plans.Treatment_detail,
		Treatment_explain: treatment_plans.Treatment_explain,
		Treatment_time: treatment_plans.Treatment_time,			
	}
	if err := entity.DB().Where("id = ?", id).Updates(&treatmentplans).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": treatmentplans})
}
