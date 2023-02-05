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
		//treatment and treatment_plan
		&Treatment{},
		&Treatment_plan{},
		&Type_of_treatment{},
		&Type_of_number_of_treatment{},
		//Prescription
		&Medicine{},
		&Medicine_status{},
		&Prescription{},
		//DoctorSchedule
		&Workingday{},
		&Responsity{},
		&Dentist_schedule{},
		//Room
		&Room_Number{},
		&Category{},
		&Room_Detail{},
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

	role3 := Role{
		Role_name: "Dentist",
	}
	db.Model(&Role{}).Create(&role3)

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

	province3 := Province{
		Province_name: "Bangkok",
	}
	db.Model(&Province{}).Create(&province3)

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
	password3, err := bcrypt.GenerateFromPassword([]byte("12123"), 14)
	password4, err := bcrypt.GenerateFromPassword([]byte("abcde00"), 14)
	password5, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	password6, err := bcrypt.GenerateFromPassword([]byte("0001111"), 14)
	password7, err := bcrypt.GenerateFromPassword([]byte("www"), 14)

	em1 := Employee{
		Employee_number: "B0000001",
		FirstName:       "Ayato",
		LastName:        "Mitoma",
		Personal_id:     "1163388945367",
		Password:        string(password1),
		Phone:           "0986542781",
		House_no:        "10/a",
		Sub_districtID:  new(uint),
		Sub_district:    subdistrict3,
		DistrictID:      new(uint),
		District:        district2,
		ProvinceID:      new(uint),
		Province:        province1,
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
		Personal_id:     "1290033526782",
		Password:        string(password2),
		Phone:           "0890241627",
		House_no:        "90",
		Sub_districtID:  new(uint),
		Sub_district:    subdistrict1,
		DistrictID:      new(uint),
		District:        district3,
		ProvinceID:      new(uint),
		Province:        province2,
		GenderID:        new(uint),
		Gender:          gender2,
		RoleID:          new(uint),
		Role:            role2,
	}
	db.Model(&Employee{}).Create(&em2)
	//----------- ผู้ป่วย --------
	//symptom
	symp1 := Symptom{
		Symptom_name: "have a toothache",
	}
	db.Model(&Symptom{}).Create(&symp1)

	symp2 := Symptom{
		Symptom_name: "gum pain",
	}
	db.Model(&Symptom{}).Create(&symp2)

	symp3 := Symptom{
		Symptom_name: "Other",
	}
	db.Model(&Symptom{}).Create(&symp3)

	//patient
	patient1 := Patient{
		FirstName:          "Kaoru",
		LastName:           "Saki",
		Personal_id:        "1162567945367",
		Old:                23,
		Weight:             60,
		Height:             170,
		Underlying_disease: "-",
		Drug_alergy:        "-",
		House_no:           "112",
		Sub_districtID:     new(uint),
		Sub_district:       subdistrict1,
		DistrictID:         new(uint),
		District:           district3,
		ProvinceID:         new(uint),
		Province:           province2,
		GenderID:           new(uint),
		Gender:             gender2,
		SymptomID:          new(uint),
		Symptom:            symp1,
		EmployeeID:         new(uint),
		Employee:           em1,
	}
	db.Model(&Patient{}).Create(&patient1)

	patient2 := Patient{
		FirstName:          "Miya",
		LastName:           "Takaru",
		Personal_id:        "1234343526782",
		Old:                25,
		Weight:             90,
		Height:             190,
		Underlying_disease: "-",
		Drug_alergy:        "-",
		House_no:           "56",
		Sub_districtID:     new(uint),
		Sub_district:       subdistrict1,
		DistrictID:         new(uint),
		District:           district3,
		ProvinceID:         new(uint),
		Province:           province2,
		GenderID:           new(uint),
		Gender:             gender1,
		SymptomID:          new(uint),
		Symptom:            symp2,
		// EmployeeID:         new(uint),
		Employee: em1,
	}
	db.Model(&Patient{}).Create(&patient2)

	///////////////ข้อมูล ทดสอบ///////////
	Dentist1 := Dentist{
		FirstName: "หมอเทวดา",
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
		Patient:              patient1,
		Dentist:              Dentist1,
		DateTimePrescription: DateTimePrescriptionA,
	}
	db.Model(&Prescription{}).Create(&Prescription1)

	//จำลองข้อมูลระบบจัดตารางงานแพทย์
	var Ttype = []Type_of_treatment{
		{Type_of_treatment_name: "อยากรักษาาาาาา", Price: 1000},
		{Type_of_treatment_name: "อยากออกไปแตะขอบฟ้าาาา", Price: 2000},
	}
	db.CreateInBatches(Ttype, 2)

	var day = []Workingday{
		{Day: "วันจันทร์"},
		{Day: "วันอังคาร"},
		{Day: "วันพุธ"},
		{Day: "วันพฤหัสบดี"},
	}
	db.CreateInBatches(day, 4)

	var task = []Responsity{
		{Respon: "ตรวจผู้ป่วย"},
		{Respon: "เข้าเวร"},
		{Respon: "ตรวจสอบอุปกรณ์"},
		{Respon: "ทำการรักษา"},
	}
	db.CreateInBatches(task, 4)

	//-------MedicalDevice------------
	//---Type---
	Type1 := Type{
		Type_Name: "วัสดุและอุปกรณ์สำหรับพิมพ์ฟัน",
	}
	db.Model(&Type{}).Create(&Type1)

	Type2 := Type{
		Type_Name: "ทันตกรรมจัดฟัน",
	}
	db.Model(&Type{}).Create(&Type2)

	Type3 := Type{
		Type_Name: "วัสดุสิ้นเปลืองทางทันตกรรม",
	}
	db.Model(&Type{}).Create(&Type3)

	Type4 := Type{
		Type_Name: "อุปกรณ์ทั่วไป",
	}
	db.Model(&Type{}).Create(&Type4)

	//---Status---
	Status1 := Status{
		Status_Choice: "Sterile",
	}
	db.Model(&Status{}).Create(&Status1)

	Status2 := Status{
		Status_Choice: "Non-Sterile",
	}
	db.Model(&Status{}).Create(&Status2)

	//----ตารางหลัก-----
	DateTimeA := time.Date(2022, time.September, 01, 13, 23, 44, 0, time.Local)

	MedicalDevice1 := MedicalDevice{
		Employee:    em1,
		Type:        Type4,
		Status:      Status2,
		Device_Name: "เก้าอี้ทำฟัน",
		Amount:      1,
		Record_Date: DateTimeA,
	}
	db.Model(&MedicalDevice{}).Create(&MedicalDevice1)

	MedicalDevice2 := MedicalDevice{
		Employee:    em2,
		Type:        Type2,
		Status:      Status2,
		Device_Name: "เหล็กดัดฟัน",
		Amount:      2,
		Record_Date: DateTimeA,
	}
	db.Model(&MedicalDevice{}).Create(&MedicalDevice2)

	MedicalDevice3 := MedicalDevice{
		Employee:    em1,
		Type:        Type4,
		Status:      Status2,
		Device_Name: "เครื่องขูด",
		Amount:      1,
		Record_Date: DateTimeA,
	}
	db.Model(&MedicalDevice{}).Create(&MedicalDevice3)

	//--------ระบบจัดการข้อมูลแพทย์---------
	//---Specialized---
	specialized1 := Specialized{
		Specialized_Name: "สาขาปริทันตวิทยา",
	}
	db.Model(&Specialized{}).Create(&specialized1)

	specialized2 := Specialized{
		Specialized_Name: "สาขาทันตกรรมหัตถการ",
	}
	db.Model(&Specialized{}).Create(&specialized2)

	specialized3 := Specialized{
		Specialized_Name: "สาขาศัลยศาสตร์ช่องปากและแม็กซิลโลเฟเชียล",
	}
	db.Model(&Specialized{}).Create(&specialized3)

	specialized4 := Specialized{
		Specialized_Name: "สาขาทันตสาธารณสุข",
	}
	db.Model(&Specialized{}).Create(&specialized4)

	specialized5 := Specialized{
		Specialized_Name: "สาขาทันตกรรมประดิษฐ์",
	}
	db.Model(&Specialized{}).Create(&specialized5)

	specialized6 := Specialized{
		Specialized_Name: "สาขาทันตกรรมสำหรับเด็ก",
	}
	db.Model(&Specialized{}).Create(&specialized6)

	specialized7 := Specialized{
		Specialized_Name: "สาขาวิทยาเอ็นโดดอนต์",
	}
	db.Model(&Specialized{}).Create(&specialized7)

	specialized8 := Specialized{
		Specialized_Name: "สาขาทันตกรรมจัดฟัน",
	}
	db.Model(&Specialized{}).Create(&specialized8)

	specialized9 := Specialized{
		Specialized_Name: "สาขาวิทยาการวินิจฉัยโรคช่องปาก",
	}
	db.Model(&Specialized{}).Create(&specialized9)

	//University
	University1 := University{
		University_Name: "มหาวิทยาลัยมหิดล",
	}
	db.Model(&University{}).Create(&University1)

	University2 := University{
		University_Name: "จุฬาลงกรณ์มหาวิทยาลัย",
	}
	db.Model(&University{}).Create(&University2)

	University3 := University{
		University_Name: "มหาวิทยาลัยเชียงใหม่",
	}
	db.Model(&University{}).Create(&University3)

	University4 := University{
		University_Name: "มหาวิทยาลัยเชียงใหม่",
	}
	db.Model(&University{}).Create(&University4)

	University5 := University{
		University_Name: "มหาวิทยาลัยเชียงใหม่",
	}
	db.Model(&University{}).Create(&University5)

	University6 := University{
		University_Name: "มหาวิทยาลัยรังสิต",
	}
	db.Model(&University{}).Create(&University6)

	University7 := University{
		University_Name: "มหาวิทยาลัยเทคโนโลยีสุรนารี",
	}
	db.Model(&University{}).Create(&University7)

	//insert dentist
	dentist1 := Dentist{
		FirstName:    "Lawn",
		LastName:     "Helkin",
		Personal_id:  "6520365417856",
		Email:        "lawn@gmail.com",
		Password:     string(password4),
		Age:          31,
		Phone_Number: "0645127854",

		Gender:      gender1,
		Specialized: specialized9,
		University:  University2,
		Role:        role3,
		Province:    province2,
	}
	db.Model(&Dentist{}).Create(&dentist1)

	dentist2 := Dentist{
		FirstName:    "Emma",
		LastName:     "Watson",
		Personal_id:  "4752103658952",
		Email:        "emma@gmail.com",
		Password:     string(password3),
		Age:          28,
		Phone_Number: "0854123457",

		Gender:      gender2,
		Specialized: specialized4,
		University:  University5,
		Role:        role3,
		Province:    province1,
	}
	db.Model(&Dentist{}).Create(&dentist2)

	dentist3 := Dentist{
		FirstName:    "Shiro",
		LastName:     "Uki",
		Personal_id:  "4521032568745",
		Email:        "shiro@hotmail.com",
		Password:     string(password5),
		Age:          41,
		Phone_Number: "0965412547",

		Gender:      gender1,
		Specialized: specialized1,
		University:  University1,
		Role:        role3,
		Province:    province3,
	}
	db.Model(&Dentist{}).Create(&dentist3)

	dentist4 := Dentist{
		FirstName:    "Olivia",
		LastName:     "Cruz",
		Personal_id:  "5230145278964",
		Email:        "olivia@hotmail.com",
		Password:     string(password7),
		Age:          39,
		Phone_Number: "0654174582",

		Gender:      gender2,
		Specialized: specialized8,
		University:  University6,
		Role:        role3,
		Province:    province3,
	}
	db.Model(&Dentist{}).Create(&dentist4)

	dentist5 := Dentist{
		FirstName:    "Bucky",
		LastName:     "Crosia",
		Personal_id:  "9520136457824",
		Email:        "bucky@gmail.com",
		Password:     string(password6),
		Age:          45,
		Phone_Number: "0854127833",

		Gender:      gender1,
		Specialized: specialized2,
		University:  University4,
		Role:        role3,
		Province:    province1,
	}
	db.Model(&Dentist{}).Create(&dentist5)

	//Type of treatment
	Type_of_treatment1 := Type_of_treatment{
		Type_of_treatment_name: "รักษารากฟัน(ฟันหน้า)",
		Price:                  5000,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment1)

	Type_of_treatment2 := Type_of_treatment{
		Type_of_treatment_name: "รักษารากฟัน(ฟันกราน้อย)",
		Price:                  7000,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment2)

	Type_of_treatment3 := Type_of_treatment{
		Type_of_treatment_name: "รักษารากฟัน(ฟันกราม)",
		Price:                  7000,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment3)

	Type_of_treatment4 := Type_of_treatment{
		Type_of_treatment_name: "รากฟันเทียม",
		Price:                  50000,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment4)

	Type_of_treatment5 := Type_of_treatment{
		Type_of_treatment_name: "รากฟันเทียม",
		Price:                  50000,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment5)

	Type_of_treatment6 := Type_of_treatment{
		Type_of_treatment_name: "การถ่ายภาพรังสี (X-ray)",
		Price:                  150,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment6)

	Type_of_treatment7 := Type_of_treatment{
		Type_of_treatment_name: "อุดฟัน",
		Price:                  1000,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment7)

	Type_of_treatment8 := Type_of_treatment{
		Type_of_treatment_name: "ถอนฟัน",
		Price:                  800,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment8)

	Type_of_treatment9 := Type_of_treatment{
		Type_of_treatment_name: "จัดฟัน",
		Price:                  100000,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment9)

	Type_of_treatment10 := Type_of_treatment{
		Type_of_treatment_name: "ฟอกสีฟัน",
		Price:                  2000,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment10)

	Type_of_treatment11 := Type_of_treatment{
		Type_of_treatment_name: "รักษาโรคเหงือก",
		Price:                  500,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment11)

	Type_of_treatment12 := Type_of_treatment{
		Type_of_treatment_name: "ใส่ฟันเทียมบางส่วนเเบบถอดได้",
		Price:                  4000,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment12)

	Type_of_treatment13 := Type_of_treatment{
		Type_of_treatment_name: "ใส่ฟันเทียมบางส่วนเเบบติดเเน่น",
		Price:                  10000,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment13)

	Type_of_treatment14 := Type_of_treatment{
		Type_of_treatment_name: "ใส่ฟันเทียมทั้งปาก (บน-ล่าง)",
		Price:                  20000,
	}
	db.Model(&Type_of_treatment{}).Create(&Type_of_treatment14)

	//Type of number of treatment
	Type_of_number_of_treatment1 := Type_of_number_of_treatment{
		Type_of_number_of_treatment_name: "ซี่",
	}
	db.Model(&Type_of_number_of_treatment{}).Create(&Type_of_number_of_treatment1)

	Type_of_number_of_treatment2 := Type_of_number_of_treatment{
		Type_of_number_of_treatment_name: "ฟิล์ม",
	}
	db.Model(&Type_of_number_of_treatment{}).Create(&Type_of_number_of_treatment2)

	Type_of_number_of_treatment3 := Type_of_number_of_treatment{
		Type_of_number_of_treatment_name: "ด้าน",
	}
	db.Model(&Type_of_number_of_treatment{}).Create(&Type_of_number_of_treatment3)

	//------------------------------------------------------------------------
	//---------------------------------Room-----------------------------------

	//room_number
	room_number1 := Room_Number{
		Room_number: "001",
	}
	db.Model(&Room_Number{}).Create(&room_number1)

	room_number2 := Room_Number{
		Room_number: "002",
	}
	db.Model(&Room_Number{}).Create(&room_number2)

	room_number3 := Room_Number{
		Room_number: "003",
	}
	db.Model(&Room_Number{}).Create(&room_number3)

	room_number4 := Room_Number{
		Room_number: "004",
	}
	db.Model(&Room_Number{}).Create(&room_number4)

	room_number5 := Room_Number{
		Room_number: "005",
	}
	db.Model(&Room_Number{}).Create(&room_number5)

	//category
	category1 := Category{
		Category_Name: "ห้องทันตกรรมทั่วไป",
	}
	db.Model(&Category{}).Create(&category1)

	category2 := Category{
		Category_Name: "ห้องเอ็กซ์เรย์",
	}
	db.Model(&Category{}).Create(&category2)

	category3 := Category{
		Category_Name: "ห้องเก็บเครื่องมือ",
	}
	db.Model(&Category{}).Create(&category3)

	//room_detail
	room_detail1 := Room_Detail{
		Room_Number:   room_number3,
		Category:      category1,
		MedicalDevice: MedicalDevice1,
	}
	db.Model(&Room_Detail{}).Create(&room_detail1)

	room_detail2 := Room_Detail{
		Room_Number:   room_number4,
		Category:      category3,
		MedicalDevice: MedicalDevice3,
	}
	db.Model(&Room_Detail{}).Create(&room_detail2)

}
