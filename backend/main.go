package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/controller"
	dentist "github.com/sut65/team09/controller/dentist"
	docterschedule "github.com/sut65/team09/controller/docterschedule"
	employee "github.com/sut65/team09/controller/employee"
	medicaldevice "github.com/sut65/team09/controller/medicaldevice"
	patienschedule "github.com/sut65/team09/controller/patienschedule"
	patient "github.com/sut65/team09/controller/patient"
	payment "github.com/sut65/team09/controller/payment"
	prescription "github.com/sut65/team09/controller/prescription"
	repair "github.com/sut65/team09/controller/repair"
	room "github.com/sut65/team09/controller/room"
	treatment "github.com/sut65/team09/controller/treatment"
	treatment_plan "github.com/sut65/team09/controller/treatment_plan"
	"github.com/sut65/team09/entity"
)

const PORT = "8080"

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")
	//------- patient -------
	router.GET("/symptoms", patient.ListSymptom)
	router.GET("/symptoms/:id", patient.GetSymptom)
	router.POST("/symptoms", patient.CreateSymptom)
	router.PATCH("/symptoms", patient.UpdateSymptom)
	router.DELETE("/symptoms/:id", patient.DeleteSymptom)

	router.GET("/patients", patient.ListPatient)
	router.GET("/patients/:id", patient.GetPatient)
	router.POST("/patients", patient.CreatePatient)
	router.PATCH("/patients/:id", patient.UpdatePatient)
	router.DELETE("/patients/:id", patient.DeletePatient)

	//---------Employee-------------
	router.GET("/roles", employee.ListRole)
	router.GET("/roles/:id", employee.GetRole)
	router.POST("/roles", employee.CreateRole)
	router.PATCH("/roles", employee.UpdateRole)
	router.DELETE("/roles/:id", employee.DeleteRole)

	router.GET("/genders", employee.ListGenders)
	router.GET("/gender/:id", employee.GetGender)
	router.POST("/genders", employee.CreateGender)
	router.PATCH("/genders", employee.UpdateGender)
	router.DELETE("/genders/:id", employee.DeleteGender)

	router.GET("/provinces", employee.ListProvince)
	router.GET("/province/:id", employee.GetProvince)
	router.POST("/provinces", employee.CreateProvince)
	router.PATCH("/provinces", employee.UpdateProvince)
	router.DELETE("/provinces/:id", employee.DeleteProvince)

	router.GET("/districts", employee.ListDistrict)
	router.GET("/district/:id", employee.GetDistrict)
	router.GET("/district_by/:id", employee.GetDistrictbyID) //เพิ่ม
	router.POST("/district", employee.CreateDistrict)
	router.PATCH("/district", employee.UpdateDistrict)
	router.DELETE("/district/:id", employee.DeleteDistrict)

	router.GET("/subdistricts", employee.ListSubDistrict)
	router.GET("/subdistrict/:id", employee.GetSubDistrict)
	router.GET("/subdistrict_by/:id", employee.GetSubDistrictbyID) //เพิ่ม
	router.POST("/subdistrict", employee.CreateSubDistrict)
	router.PATCH("/subdistrict", employee.UpdateSubDistrict)
	router.DELETE("/subdistrict/:id", employee.DeleteSubDistrict)

	router.GET("/employees", employee.ListEmployee)
	router.GET("/employee/:id", employee.GetEmployee)
	router.POST("/employees", employee.CreateEmployee)
	router.PATCH("/employees/:id", employee.UpdateEmployee)
	router.DELETE("/employees/:id", employee.DeleteEmployee)

	//------------------------------------

	// patien_schedule Routes
	router.GET("/patien_schedules", patienschedule.ListPatienSchedules)
	router.GET("/patien_schedules/:id", patienschedule.GetPatienSchedule)
	router.POST("/patien_schedules", patienschedule.CreatePatienSchedule)
	router.PATCH("/patien_schedules/:id", patienschedule.UpdatePatienSchedules)
	router.DELETE("/patien_schedules/:id", patienschedule.DeletePatienSchedule)

	// Reason Routes
	router.GET("/reasons", patienschedule.ListReasons)
	router.GET("/reason/:id", patienschedule.GetReason)
	router.POST("/reasons", patienschedule.CreateReason)
	router.PATCH("/reasons", patienschedule.UpdateReason)
	router.DELETE("/reasons/:id", patienschedule.DeleteReason)

	// Treatment Routes
	r.GET("/treatments", treatment.ListTreatmentShow)
	r.GET("/treatments/:id", treatment.GetTreatment)
	r.POST("/treatments", treatment.CreateTreatment)
	r.PATCH("/treatments/:id", treatment.UpdateTreatment)
	r.DELETE("/treatments/:id", treatment.DeleteTreatment)

	// Type of number of treatment Routes
	r.GET("/type_of_number_of_treatments", treatment.List_Type_of_number_of_treatment)
	r.GET("/type_of_number_of_treatments/:id", treatment.Get_Type_of_number_of_treatment)
	r.POST("/type_of_number_of_treatments", treatment.Create_Type_of_number_of_treatment)
	r.PATCH("/type_of_number_of_treatments", treatment.Update_Type_of_number_of_treatment)
	r.DELETE("/type_of_number_of_treatments/:id", treatment.Delete_Type_of_number_of_treatment)

	// Treatment Plan Routes
	r.GET("/treatment_plans", treatment_plan.ListTreatment_plan_show)
	r.GET("/treatment_plans/:id", treatment_plan.GetTreatment_plan)
	r.POST("/treatment_plans", treatment_plan.CreateTreatment_plan)
	r.PATCH("/treatment_plans/:id", treatment_plan.UpdateTreatment_plan)
	r.DELETE("/treatment_plans/:id", treatment_plan.DeleteTreatment_plan)

	// Type of treatment Routes
	r.GET("/type_of_treatments", treatment.List_Type_of_treatment)
	r.GET("/type_of_treatments/:id", treatment.Get_Type_of_treatment)
	r.POST("/type_of_treatments", treatment.Create_Type_of_treatment)
	r.PATCH("/type_of_treatments", treatment.Update_Type_of_treatment)
	r.DELETE("/type_of_treatments/:id", treatment.Delete_Type_of_treatment)

	//----medicaldevice-----
	r.GET("/medicaldevices", medicaldevice.ListMedicalDevices)
	r.GET("/medicaldevice/:id", medicaldevice.GetMedicalDevice)
	r.POST("/medicaldevices", medicaldevice.CreateMedicalDevice)
	r.PATCH("/medicaldevice", medicaldevice.UpdateMedicalDevice)
	r.DELETE("/medicaldevice/:id", medicaldevice.DeleteMedicalDevice)

	r.GET("/statuses", medicaldevice.ListStatuses)
	r.GET("/status/:id", medicaldevice.GetStatus)

	r.GET("/types", medicaldevice.ListTypes)
	r.GET("/ttype/:id", medicaldevice.GetType)

	//Daywork Routes
	router.GET("/workingdays", docterschedule.ListWorkingdays)
	router.GET("/workingday/:id", docterschedule.GetWorkingday)
	router.POST("/workingdays", docterschedule.CreateWorkingday)
	router.PATCH("/workingdays", docterschedule.UpdateWorkingday)
	router.DELETE("/workingdays/:id", docterschedule.DeleteWorkingday)

	//Doctask Routes
	router.GET("/responsitys", docterschedule.ListResponsitys)
	router.GET("/responsity/:id", docterschedule.GetResponsity)
	router.POST("/responsitys", docterschedule.CreateResponsity)
	router.PATCH("/responsitys", docterschedule.UpdateResponsity)
	router.DELETE("/responsitys/:id", docterschedule.DeleteResponsity)

	//Dentist_Schedule
	router.GET("/dentist_schedules", docterschedule.ListDentistSchedules)
	router.GET("/dentist_schedules/:id", docterschedule.GetDentistSchedule)
	router.POST("/dentist_schedules", docterschedule.CreateDentistSchedule)
	router.PATCH("/dentist_schedules/:id", docterschedule.UpdateDentistSchedules)
	router.DELETE("/dentist_schedules/:id", docterschedule.DeleteDentistSchedule)

	//-------------Dentist-------------------
	// specialized Routes
	router.GET("/specializeds", dentist.ListSpecialized)
	router.GET("/specialized/:id", dentist.GetSpecialized)
	router.POST("/specializeds", dentist.CreateSpecialized)
	router.PATCH("/specializeds", dentist.UpdateSpecialized)
	router.DELETE("/specialized/:id", dentist.DeleteSpecialized)

	// university Routes
	router.GET("/universitys", dentist.ListUniversity)
	router.GET("/university/:id", dentist.GetUniversity)
	router.POST("/universitys", dentist.CreateUniversity)
	router.PATCH("/universitys", dentist.UpdateUniversity)
	router.DELETE("/university/:id", dentist.DeleteUniversity)

	// dentists Routes
	router.GET("/dentists", dentist.ListDentist)
	router.GET("/dentist/:id", dentist.GetDentist)
	router.POST("/dentists", dentist.CreateDentist)
	router.PATCH("/dentists/:id", dentist.UpdateDentist)
	router.DELETE("/dentist/:id", dentist.DeleteDentist)

	//-------------Room-------------------
	// Room_Number Routes
	router.GET("/room_numbers", room.ListRoom_Number)
	router.GET("/room_number:id", room.GetRoom_Number)
	router.POST("/room_numbers", room.CreateRoom_Number)
	router.PATCH("/room_numbers", room.UpdateRoom_Number)
	router.DELETE("/room_number/:id", room.DeleteRoom_Number)

	// Category Routes
	router.GET("/categories", room.ListCategory)
	router.GET("/category:id", room.GetCategory)
	router.POST("/categories", room.CreateCategory)
	router.PATCH("/categories", room.UpdateCategory)
	router.DELETE("/category/:id", room.DeleteCategory)

	// Category Routes
	router.GET("/room_details", room.ListRoom_Detail)
	router.GET("/room_detail:id", room.GetRoom_Detail)
	router.POST("/room_details", room.CreateRoom_Detail)
	router.PATCH("/room_details", room.UpdateRoom_Detail)
	router.DELETE("/room_detail/:id", room.DeleteRoom_Detail)

	//---------Payment-------------
	// Payment_status Routes
	router.GET("/payment_statuses", payment.ListPayment_statuses)
	router.GET("/payment_status/:id", payment.GetPayment_status)

	// Payment Routes
	router.GET("/payments", payment.ListPayments)
	router.GET("/payment/:id", payment.GetPayment)
	router.POST("/payments", payment.CreatePayment)
	router.PATCH("/update-payment", payment.UpdatePayment)
	router.DELETE("/delete-payment/:id", payment.DeletePayment)

	//---------Prescription-------------
	// Medicine_status Routes
	router.GET("/medicine_statuses", prescription.ListMedicine_statuses)
	router.GET("/medicine_status/:id", prescription.GetMedicine_status)

	// Medicine Routes
	router.GET("/medicines", prescription.ListMedicines)
	router.GET("/medicine/:id", prescription.GetMedicine)

	// Prescription Routes
	router.GET("/prescriptions", prescription.ListPrescriptions)
	router.GET("/prescription/:id", prescription.GetPrescription)
	router.POST("/prescriptions", prescription.CreatePrescription)
	router.PATCH("/update-prescription", prescription.UpdatePrescription)
	router.DELETE("/delete-prescription/:id", prescription.DeletePrescription)

	//----Repair-----
	r.GET("/repairs", repair.ListRepairs)
	r.GET("/repair/:id", repair.GetRepair)
	r.POST("/repairs", repair.CreateRepair)
	r.PATCH("/repair", repair.UpdateRepairs)
	r.DELETE("/repair/:id", repair.DeleteRepair)

	r.GET("/damagelevels", repair.ListDamageLevels)
	r.GET("/damagelevel/:id", repair.GetDamageLevel)

	//--------------------------Login---------------------------------
	r.POST("/signup_employee", controller.CreateLoginEmployee)

	r.POST("/signup_dentist", controller.CreateLoginDentist)
	// login User Route
	r.POST("/login_employee", controller.LoginEmployee)

	r.POST("/login_dentist", controller.LoginDentist)

	r.Run() //("0.0.0.0:3001")

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, DELETE, PATCH, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
