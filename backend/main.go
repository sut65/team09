package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/controller/patienschedule"
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
