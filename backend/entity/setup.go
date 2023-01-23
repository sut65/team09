package entity

import (
	//"fmt"
	//"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("dental.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		//Employee
		&Gender{},
		&Role{},
		&Province{},
		&District{},
		&Sub_district{},
		&Employee{},
		//Patient
		&Symptom{},
		&Patient{},
	)

	db = database
}
