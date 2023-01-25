package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
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
		&DamageLevel{},
		&Repair{},

		//Patien_schedule
		&Reason{},
		&Patien_schedule{},
		&Repair{},
		//Dentist
		&Specialized{},
		&University{},
		&Dentist{},
		&Treatment{},
		//Prescription
		&Medicine{},
		&Medicine_status{},
		&Prescription{},
	)

	db = database

	method1 := Reason{
		Method: "อยากโดนเข็ม",
	}
	db.Model(&Reason{}).Create(&method1)

	//add example

	// ======================================  Employee  =====================================================================
	//role
	role1 := Role{
		Role_name: "Admin",
	}
	db.Model(&Role{}).Create(&role1)

	role2 := Role{
		Role_name: "Nurse",
	}
	db.Model(&Role{}).Create(&role2)

	//Gender
	gender1 := Gender{
		Gender_name: "Male",
	}
	db.Model(&Gender{}).Create(&gender1)

	gender2 := Gender{
		Gender_name: "FeMale",
	}
	db.Model(&Gender{}).Create(&gender2)

	//province
	province1 := Province{
		Province_name: "Chiang Rai",
	}
	db.Model(&Province{}).Create(&province1)

	province2 := Province{
		Province_name: "Chiang Mai",
	}
	db.Model(&Province{}).Create(&province2)

	//district
	district1 := District{
		Model:         gorm.Model{},
		District_name: "Chiang Saen",
		ProvinceID:    new(uint),
		Province:      province1,
		Sub_districts: []Sub_district{},
	}
	db.Model(&District{}).Create(&district1)

	district2 := District{
		Model:         gorm.Model{},
		District_name: "Chiang Dao",
		ProvinceID:    new(uint),
		Province:      province2,
		Sub_districts: []Sub_district{},
	}
	db.Model(&District{}).Create(&district2)

	district3 := District{
		Model:         gorm.Model{},
		District_name: "Omkoi",
		ProvinceID:    new(uint),
		Province:      province2,
		Sub_districts: []Sub_district{},
	}
	db.Model(&District{}).Create(&district3)

	//sub_district
	subdistrict1 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "Wiang",
		DistrictID:        new(uint),
		District:          district1,
		Employees:         []Employee{},
		Patients:          []Patient{},
	}
	db.Model(&Sub_district{}).Create(&subdistrict1)

	subdistrict2 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "Mon Chong",
		DistrictID:        new(uint),
		District:          district2,
		Employees:         []Employee{},
		Patients:          []Patient{},
	}
	db.Model(&Sub_district{}).Create(&subdistrict2)

	subdistrict3 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "Yang Piang",
		DistrictID:        new(uint),
		District:          district2,
		Employees:         []Employee{},
		Patients:          []Patient{},
	}
	db.Model(&Sub_district{}).Create(&subdistrict3)

	//employee
	password1, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	password2, err := bcrypt.GenerateFromPassword([]byte("5678"), 14)

	em1 := Employee{
		Employee_number: "B0000001",
		FirstName:       "Ayato",
		LastName:        "Mitoma",
		Personal_id:     1163388945367,
		Password:        string(password1),
		Phone:           "0986542781",
		House_no:        "10/a",
		Sub_districtID:  new(uint),
		Sub_district:    subdistrict3,
		GenderID:        new(uint),
		Gender:          gender1,
		RoleID:          new(uint),
		Role:            role1,
	}
	db.Model(&Employee{}).Create(&em1)

	em2 := Employee{
		Employee_number: "B0000002",
		FirstName:       "Kamiki",
		LastName:        "Jisaru",
		Personal_id:     1290033526782,
		Password:        string(password2),
		Phone:           "0890241627",
		House_no:        "90",
		Sub_districtID:  new(uint),
		Sub_district:    subdistrict1,
		GenderID:        new(uint),
		Gender:          gender2,
		RoleID:          new(uint),
		Role:            role2,
	}
	db.Model(&Employee{}).Create(&em2)
	///////////////ข้อมูล ทดสอบ///////////
	Patient1 := Patient{
		FirstName: "อยากโดนเข็ม",
	}
	db.Model(&Patient{}).Create(&Patient1)

	///////////////ข้อมูล ทดสอบ///////////
	Dentist1 := Dentist{
		FirstName: "อยากโดนเข็ม",
	}
	db.Model(&Dentist{}).Create(&Dentist1)

	///////////////ข้อมูลใน entity Medicine///////////
	Medicine1 := Medicine{
		Medicine_name:  "แก้ปวด",
		Medicine_price: 100,
	}
	db.Model(&Medicine{}).Create(&Medicine1)

	///////////////ข้อมูลใน entity Medicine_status///////////
	Medicine_status1 := Medicine_status{
		Medicine_status_name: "รับยาแล้ว",
	}
	db.Model(&Medicine_status{}).Create(&Medicine_status1)

	///////////////ข้อมูลใน entity Prescription///////////
	DateTimePrescriptionA := time.Date(2022, time.September, 01, 13, 23, 44, 0, time.Local)
	//DateTimePrescriptionB := time.Date(2022, time.September, 01, 13, 23, 44, 0, time.Local)
	Prescription1 := Prescription{
		Medicine:             Medicine1,
		Medicine_status:      Medicine_status1,
		Patient:              Patient1,
		Dentist:              Dentist1,
		DateTimePrescription: DateTimePrescriptionA,
	}
	db.Model(&Prescription{}).Create(&Prescription1)
}
