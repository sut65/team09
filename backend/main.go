package main

import (
	"github.com/gin-gonic/gin"
	medicaldevice "github.com/sut65/team09/controller/medicaldevice"
	"github.com/sut65/team09/controller/patienschedule"
	controller "github.com/sut65/team09/controller/treatment"
	"github.com/sut65/team09/entity"
)

const PORT = "3001"

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")
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
