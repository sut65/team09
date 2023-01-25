package main

import (
	"github.com/gin-gonic/gin"
	employee "github.com/sut65/team09/controller/employee"
	medicaldevice "github.com/sut65/team09/controller/medicaldevice"
	patienschedule "github.com/sut65/team09/controller/patienschedule"
	controller "github.com/sut65/team09/controller/treatment"
	docterschedule "github.com/sut65/team09/controller/docterschedule"
	"github.com/sut65/team09/entity"
)

const PORT = "3001"

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")
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

	router.GET("/district", employee.ListDistrict)
	router.GET("/district/:id", employee.GetDistrict)
	router.POST("/district", employee.CreateDistrict)
	router.PATCH("/district", employee.UpdateDistrict)
	router.DELETE("/district/:id", employee.DeleteDistrict)

	router.GET("/subdistricts", employee.ListSubDistrict)
	router.GET("/subdistricts/:id", employee.GetSubDistrict)
	router.POST("/subdistrict", employee.CreateSubDistrict)
	router.PATCH("/subdistrict", employee.UpdateSubDistrict)
	router.DELETE("/subdistrict/:id", employee.DeleteSubDistrict)

	router.GET("/employees", employee.ListEmployee)
	router.GET("/employee/:id", employee.GetEmployee)
	router.POST("/employees", employee.CreateEmployee)
	router.PATCH("/employees", employee.UpdateEmployee)
	router.DELETE("/employees/:id", employee.DeleteEmployee)

	//------------------------------------

	// patien_schedule Routes
	router.GET("/patien_schedules", patienschedule.ListPatienSchedules)
	router.GET("/patien_schedules/:id", patienschedule.GetPatienSchedule)
	router.POST("/patien_schedules", patienschedule.CreatePatienSchedule)
	router.PATCH("/patien_schedules", patienschedule.UpdatePatienSchedules)
	router.DELETE("/patien_schedules/:id", patienschedule.DeletePatienSchedule)

	// Reason Routes
	router.GET("/reasons", patienschedule.ListReasons)
	router.GET("/reason/:id", patienschedule.GetReason)
	router.POST("/reasons", patienschedule.CreateReason)
	router.PATCH("/reasons", patienschedule.UpdateReason)
	router.DELETE("/reasons/:id", patienschedule.DeleteReason)

	// Treatment Routes
	r.GET("/treatments", controller.ListTreatmentShow)
	r.GET("/treatments/:id", controller.GetTreatment)
	r.POST("/treatments", controller.CreateTreatment)
	r.PATCH("/treatments", controller.UpdateTreatment)
	r.DELETE("/treatments/:id", controller.DeleteTreatment)

	// Type of number of treatment Routes
	r.GET("/type_of_number_of_treatments", controller.List_Type_of_number_of_treatment)
	r.GET("/type_of_number_of_treatments/:id", controller.Get_Type_of_number_of_treatment)
	r.POST("/type_of_number_of_treatments", controller.Create_Type_of_number_of_treatment)
	r.PATCH("/type_of_number_of_treatments", controller.Update_Type_of_number_of_treatment)
	r.DELETE("/type_of_number_of_treatments/:id", controller.Delete_Type_of_number_of_treatment)

	// Type of treatment Routes
	r.GET("/type_of_treatments", controller.List_Type_of_treatment)
	r.GET("/type_of_treatments/:id", controller.Get_Type_of_treatment)
	r.POST("/type_of_treatments", controller.Create_Type_of_treatment)
	r.PATCH("/type_of_treatments", controller.Update_Type_of_treatment)
	r.DELETE("/type_of_treatments/:id", controller.Delete_Type_of_treatment)

	//----medicaldevice-----
	r.GET("/medicaldevices", medicaldevice.ListMedicalDevices)
	r.GET("/medicaldevice/:id", medicaldevice.GetMedicalDevice)
	r.POST("/medicaldevices", medicaldevice.CreateMedicalDevice)
	r.PATCH("/medicaldevices", medicaldevice.UpdateMedicalDevice)
	r.DELETE("/medicaldevice/:id", medicaldevice.DeleteMedicalDevice)

	r.GET("/statuses", medicaldevice.ListStatuses)
	r.GET("/status/:id", medicaldevice.GetStatus)

	r.GET("/types", medicaldevice.ListTypes)
	r.GET("/ttype/:id", medicaldevice.GetType)

	//Daywork Routes
	router.GET("/dayworks", docterschedule.ListDayworks)
	router.GET("/daywork/:id", docterschedule.GetDaywork)
	router.POST("/dayworks", docterschedule.CreateDaywork)
	router.PATCH("/dayworks", docterschedule.UpdateDaywork)
	router.DELETE("/dayworks/:id", docterschedule.DeleteDaywork)

	//Doctask Routes
	router.GET("/doctasks", docterschedule.ListDoctasks)
	router.GET("/doctask/:id", docterschedule.GetDoctask)
	router.POST("/doctasks", docterschedule.CreateDoctask)
	router.PATCH("/doctasks", docterschedule.UpdateDoctask)
	router.DELETE("/doctasks/:id", docterschedule.DeleteDoctask)

	//Dentist_Schedule
	router.GET("/dentist_schedules", docterschedule.ListDentistSchedules)
	router.GET("/dentist_schedules/:id", docterschedule.GetDentistSchedule)
	router.POST("/dentist_schedules", docterschedule.CreateDentistSchedule)
	router.PATCH("/dentist_schedules", docterschedule.UpdateDentistSchedules)
	router.DELETE("/dentist_schedules/:id", docterschedule.DeleteDentistSchedule)


	// // login User Route
	// r.POST("/login/user", login_controller.LoginUser)
	// r.POST("/users", user_controller.CreateUser)
	// r.GET("/genders", user_controller.ListGenders)

	// // login Admin Route
	// r.POST("/login/admin", login_controller.LoginAdmin)

	// router := r.Group("/")
	// {
	// 	protected := router.Use(middlewares.Authorizes())
	// 	{
	// 		// User Routes
	// 		protected.GET("/users", user_controller.ListUsers)
	// 		protected.GET("/user/:email", user_controller.GetUser)
	// 		protected.PATCH("/users", user_controller.UpdateUser)
	// 		protected.DELETE("/users/:email", user_controller.DeleteUser)

	// 		protected.GET("/sellers", user_controller.ListSellers)
	// 		protected.GET("/user_storage/:email", user_controller.ListUserStorages)
	// 		protected.GET("/user_game/:email", user_controller.ListUserGames)
	// 	}
	// }

	// Run the server

	r.Run("localhost: " + PORT)

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
