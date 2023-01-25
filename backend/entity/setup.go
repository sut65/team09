package entity

import (
	"time"
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
	    //DoctorSchedule
		&Daywork{},
		&Doctask{},
		&Dentist_schedule{},
		
	)

	db = database

	method1 := Reason{
		Method: "อยากโดนเข็ม",
	}
	db.Model(&Reason{}).Create(&method1)
	
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
		Medicine_name: "แก้ปวด",
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
		Medicine:			Medicine1,
		Medicine_status:	Medicine_status1,
		Patient:			Patient1,
		Dentist:			Dentist1,
		DateTimePrescription: DateTimePrescriptionA,
	}
	db.Model(&Prescription{}).Create(&Prescription1)

	//จำลองข้อมูลระบบจัดตารางงานแพทย์
var day = []Daywork{
	{Day: "วันจันทร์"},
	{Day: "วันอังคาร"},
	{Day: "วันพุธ"},
	{Day: "วันพฤหัสบดี"},
} 
db.CreateInBatches(day, 4)

var task = []Doctask{
	{Respon: "ตรวจผู้ป่วย"},
	{Respon: "เข้าเวร"},
	{Respon: "ตรวจสอบอุปกรณ์"},
	{Respon: "ทำการรักษา"},
} 
db.CreateInBatches(task, 4)
}

