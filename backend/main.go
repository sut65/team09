package main

import (
	//  employee_controller "github.com/sut65/team09/controller/employee"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

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

	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
