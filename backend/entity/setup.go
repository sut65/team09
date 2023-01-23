package entity

import (
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
		//MedicalDevice
		&Type{},
		&Status{},
		&MedicalDevice{},
		//Repair
		&Damage_leval{},
		Repair{},

		//Patien_schedule
		&Reason{},
		&Patien_schedule{},
		&Repair{},
		//Dentist
		&Specialized{},
		&University{},
		&Dentist{},
	)

	db = database

	method1 := Reason{
		Method: "อยากโดนเข็ม",
	}
	db.Model(&Reason{}).Create(&method1)
}
