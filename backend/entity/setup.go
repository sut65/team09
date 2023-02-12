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
		//Payment
		&Payment_status{},
		&Payment{},
	)

	db = database

	password1, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	password2, err := bcrypt.GenerateFromPassword([]byte("5678"), 14)
	password3, err := bcrypt.GenerateFromPassword([]byte("12123"), 14)
	password4, err := bcrypt.GenerateFromPassword([]byte("abcde00"), 14)
	password5, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	password6, err := bcrypt.GenerateFromPassword([]byte("0001111"), 14)
	password7, err := bcrypt.GenerateFromPassword([]byte("www"), 14)

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
		Province_name: "ปทุมธานี",
	}
	db.Model(&Province{}).Create(&province1)

	province2 := Province{
		Province_name: "อ่างทอง",
	}
	db.Model(&Province{}).Create(&province2)

	province3 := Province{
		Province_name: "สมุทรปราการ",
	}
	db.Model(&Province{}).Create(&province3)

	//district
	//ปทุม
	district1 := District{
		Model:         gorm.Model{},
		District_name: "เมืองปทุมธานี",
		ProvinceID:    new(uint),
		Province:      province1,
		Sub_districts: []Sub_district{},
	}
	db.Model(&District{}).Create(&district1)

	district2 := District{
		Model:         gorm.Model{},
		District_name: "คลองหลวง",
		ProvinceID:    new(uint),
		Province:      province1,
		Sub_districts: []Sub_district{},
	}
	db.Model(&District{}).Create(&district2)

	district3 := District{
		Model:         gorm.Model{},
		District_name: "ธัญบุรี",
		ProvinceID:    new(uint),
		Province:      province1,
		Sub_districts: []Sub_district{},
	}
	db.Model(&District{}).Create(&district3)

	district4 := District{
		Model:         gorm.Model{},
		District_name: "ลำลูกกา",
		ProvinceID:    new(uint),
		Province:      province1,
	}
	db.Model(&District{}).Create(&district4)

	//อ่างทอง
	district5 := District{
		Model:         gorm.Model{},
		District_name: "สามโก้",
		ProvinceID:    new(uint),
		Province:      province2,
	}
	db.Model(&District{}).Create(&district5)

	district6 := District{
		Model:         gorm.Model{},
		District_name: "ป่าโมก",
		ProvinceID:    new(uint),
		Province:      province2,
	}
	db.Model(&District{}).Create(&district6)

	//สมุทรปราการ
	district7 := District{
		Model:         gorm.Model{},
		District_name: "บางพลี",
		ProvinceID:    new(uint),
		Province:      province3,
	}
	db.Model(&District{}).Create(&district7)

	district8 := District{
		Model:         gorm.Model{},
		District_name: "พระสมุทรเจดีย์",
		ProvinceID:    new(uint),
		Province:      province3,
	}
	db.Model(&District{}).Create(&district8)

	//sub_district --ปทุม
	subdistrict1 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บางปรอก",
		DistrictID:        new(uint),
		District:          district1,
	}
	db.Model(&Sub_district{}).Create(&subdistrict1)

	subdistrict2 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บ้านใหม่",
		DistrictID:        new(uint),
		District:          district1,
	}
	db.Model(&Sub_district{}).Create(&subdistrict2)

	subdistrict3 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บ้านกลาง",
		DistrictID:        new(uint),
		District:          district1,
	}
	db.Model(&Sub_district{}).Create(&subdistrict3)

	subdistrict4 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บ้านฉาง",
		DistrictID:        new(uint),
		District:          district1,
	}
	db.Model(&Sub_district{}).Create(&subdistrict4)

	subdistrict5 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บ้านกระแชง",
		DistrictID:        new(uint),
		District:          district1,
	}
	db.Model(&Sub_district{}).Create(&subdistrict5)

	subdistrict6 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บางขะแยง",
		DistrictID:        new(uint),
		District:          district1,
	}
	db.Model(&Sub_district{}).Create(&subdistrict6)

	subdistrict7 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บางคูวัด",
		DistrictID:        new(uint),
		District:          district1,
	}
	db.Model(&Sub_district{}).Create(&subdistrict7)

	//2
	subdistrict8 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "คลองหนึ่ง",
		DistrictID:        new(uint),
		District:          district2,
	}
	db.Model(&Sub_district{}).Create(&subdistrict8)

	subdistrict9 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "คลองสอง",
		DistrictID:        new(uint),
		District:          district2,
	}
	db.Model(&Sub_district{}).Create(&subdistrict9)

	subdistrict10 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "คลองสาม",
		DistrictID:        new(uint),
		District:          district2,
	}
	db.Model(&Sub_district{}).Create(&subdistrict10)

	subdistrict11 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "คลองสี่",
		DistrictID:        new(uint),
		District:          district2,
	}
	db.Model(&Sub_district{}).Create(&subdistrict11)

	subdistrict12 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "คลองห้า",
		DistrictID:        new(uint),
		District:          district2,
	}
	db.Model(&Sub_district{}).Create(&subdistrict12)

	subdistrict13 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "คลองหก",
		DistrictID:        new(uint),
		District:          district2,
	}
	db.Model(&Sub_district{}).Create(&subdistrict13)

	subdistrict14 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "คลองเจ็ด",
		DistrictID:        new(uint),
		District:          district2,
	}
	db.Model(&Sub_district{}).Create(&subdistrict14)

	//3
	subdistrict15 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "ประชาธิปัตย์",
		DistrictID:        new(uint),
		District:          district3,
	}
	db.Model(&Sub_district{}).Create(&subdistrict15)

	subdistrict16 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บึงยี่โถ",
		DistrictID:        new(uint),
		District:          district3,
	}
	db.Model(&Sub_district{}).Create(&subdistrict16)

	subdistrict17 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "รังสิต",
		DistrictID:        new(uint),
		District:          district3,
	}
	db.Model(&Sub_district{}).Create(&subdistrict17)

	subdistrict18 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "ลำผักกูด",
		DistrictID:        new(uint),
		District:          district3,
	}
	db.Model(&Sub_district{}).Create(&subdistrict18)

	subdistrict19 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บึงสนั่น",
		DistrictID:        new(uint),
		District:          district3,
	}
	db.Model(&Sub_district{}).Create(&subdistrict19)

	subdistrict20 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บึงน้ำรักษ์",
		DistrictID:        new(uint),
		District:          district3,
	}
	db.Model(&Sub_district{}).Create(&subdistrict20)

	//4
	subdistrict21 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "คูคต",
		DistrictID:        new(uint),
		District:          district4,
	}
	db.Model(&Sub_district{}).Create(&subdistrict21)

	subdistrict22 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "ลาดสวาย",
		DistrictID:        new(uint),
		District:          district4,
	}
	db.Model(&Sub_district{}).Create(&subdistrict22)

	subdistrict23 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บึงคำพร้อย",
		DistrictID:        new(uint),
		District:          district4,
	}
	db.Model(&Sub_district{}).Create(&subdistrict23)

	subdistrict24 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "ลำลูกกา",
		DistrictID:        new(uint),
		District:          district4,
	}
	db.Model(&Sub_district{}).Create(&subdistrict24)

	subdistrict25 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บึงทองหลาง",
		DistrictID:        new(uint),
		District:          district4,
	}
	db.Model(&Sub_district{}).Create(&subdistrict25)

	subdistrict26 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "ลำไทร",
		DistrictID:        new(uint),
		District:          district4,
	}
	db.Model(&Sub_district{}).Create(&subdistrict26)

	subdistrict27 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บึงคอไห",
		DistrictID:        new(uint),
		District:          district4,
	}
	db.Model(&Sub_district{}).Create(&subdistrict27)

	subdistrict28 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "พืชอุดม",
		DistrictID:        new(uint),
		District:          district4,
	}
	db.Model(&Sub_district{}).Create(&subdistrict28)

	// --อ่างทอง 5
	subdistrict29 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "สามโก้",
		DistrictID:        new(uint),
		District:          district5,
	}
	db.Model(&Sub_district{}).Create(&subdistrict29)

	subdistrict30 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "ราษฎรพัฒนา",
		DistrictID:        new(uint),
		District:          district5,
	}
	db.Model(&Sub_district{}).Create(&subdistrict30)

	subdistrict31 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "อบทม",
		DistrictID:        new(uint),
		District:          district5,
	}
	db.Model(&Sub_district{}).Create(&subdistrict31)

	subdistrict32 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "โพธิ์ม่วงพันธ์",
		DistrictID:        new(uint),
		District:          district5,
	}
	db.Model(&Sub_district{}).Create(&subdistrict32)

	subdistrict33 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "มงคลธรรมนิมิต",
		DistrictID:        new(uint),
		District:          district5,
	}
	db.Model(&Sub_district{}).Create(&subdistrict33)

	//6
	subdistrict34 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บางปลากด",
		DistrictID:        new(uint),
		District:          district6,
	}
	db.Model(&Sub_district{}).Create(&subdistrict34)

	subdistrict35 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "ป่าโมก",
		DistrictID:        new(uint),
		District:          district6,
	}
	db.Model(&Sub_district{}).Create(&subdistrict35)

	subdistrict36 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "สายทอง",
		DistrictID:        new(uint),
		District:          district6,
	}
	db.Model(&Sub_district{}).Create(&subdistrict36)

	subdistrict37 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "โรงช้าง",
		DistrictID:        new(uint),
		District:          district6,
	}
	db.Model(&Sub_district{}).Create(&subdistrict37)

	subdistrict38 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บางเสด็จ",
		DistrictID:        new(uint),
		District:          district6,
	}
	db.Model(&Sub_district{}).Create(&subdistrict38)

	subdistrict39 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "นรสิงห์",
		DistrictID:        new(uint),
		District:          district6,
	}
	db.Model(&Sub_district{}).Create(&subdistrict39)

	subdistrict40 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "เอกราช",
		DistrictID:        new(uint),
		District:          district6,
	}
	db.Model(&Sub_district{}).Create(&subdistrict40)

	subdistrict41 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "โผงเผง",
		DistrictID:        new(uint),
		District:          district6,
	}
	db.Model(&Sub_district{}).Create(&subdistrict41)

	//7
	subdistrict42 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บางพลีใหญ่",
		DistrictID:        new(uint),
		District:          district7,
	}
	db.Model(&Sub_district{}).Create(&subdistrict42)

	subdistrict43 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บางแก้ว",
		DistrictID:        new(uint),
		District:          district7,
	}
	db.Model(&Sub_district{}).Create(&subdistrict43)

	subdistrict44 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บางปลา",
		DistrictID:        new(uint),
		District:          district7,
	}
	db.Model(&Sub_district{}).Create(&subdistrict44)

	subdistrict45 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บางโฉลง",
		DistrictID:        new(uint),
		District:          district7,
	}
	db.Model(&Sub_district{}).Create(&subdistrict45)

	subdistrict46 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "ราชาเทวะ",
		DistrictID:        new(uint),
		District:          district7,
	}
	db.Model(&Sub_district{}).Create(&subdistrict46)

	subdistrict47 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "หนองปรือ",
		DistrictID:        new(uint),
		District:          district7,
	}
	db.Model(&Sub_district{}).Create(&subdistrict47)

	//8
	subdistrict48 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "นาเกลือ",
		DistrictID:        new(uint),
		District:          district8,
	}
	db.Model(&Sub_district{}).Create(&subdistrict48)

	subdistrict49 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "บ้านคลองสวน",
		DistrictID:        new(uint),
		District:          district8,
	}
	db.Model(&Sub_district{}).Create(&subdistrict49)

	subdistrict50 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "แหลมฟ้าผ่า",
		DistrictID:        new(uint),
		District:          district8,
	}
	db.Model(&Sub_district{}).Create(&subdistrict50)

	subdistrict51 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "ปากคลองบางปลากด",
		DistrictID:        new(uint),
		District:          district8,
	}
	db.Model(&Sub_district{}).Create(&subdistrict51)

	subdistrict52 := Sub_district{
		Model:             gorm.Model{},
		Sub_district_name: "ในคลองบางปลากด",
		DistrictID:        new(uint),
		District:          district8,
	}
	db.Model(&Sub_district{}).Create(&subdistrict52)

	//employee
	em1 := Employee{
		Employee_number: "E0000001",
		FirstName:       "Ayato",
		LastName:        "Mitoma",
		Personal_id:     "1163388945367",
		Password:        string(password1),
		Phone:           "0986542781",
		House_no:        "10/a",
		Sub_districtID:  new(uint),
		Sub_district:    subdistrict2,
		DistrictID:      new(uint),
		District:        district1,
		ProvinceID:      new(uint),
		Province:        province1,
		GenderID:        new(uint),
		Gender:          gender1,
		RoleID:          new(uint),
		Role:            role1,
	}
	db.Model(&Employee{}).Create(&em1)

	em2 := Employee{
		Employee_number: "E0000002",
		FirstName:       "Kamiki",
		LastName:        "Jisaru",
		Personal_id:     "1290033526782",
		Password:        string(password2),
		Phone:           "0890241627",
		House_no:        "90",
		Sub_districtID:  new(uint),
		Sub_district:    subdistrict33,
		DistrictID:      new(uint),
		District:        district5,
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
		Symptom_choice: "มีอาการเบื้องต้น",
	}
	db.Model(&Symptom{}).Create(&symp1)

	symp2 := Symptom{
		Symptom_choice: "ไม่มีอาการเบื้องต้น",
	}
	db.Model(&Symptom{}).Create(&symp2)

	symp3 := Symptom{
		Symptom_choice: "อื่นๆ",
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
		Sub_district:       subdistrict52,
		DistrictID:         new(uint),
		District:           district8,
		ProvinceID:         new(uint),
		Province:           province3,
		GenderID:           new(uint),
		Gender:             gender2,
		SymptomID:          new(uint),
		Symptom:            symp2,
		Symptom_name:       "-",
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
		Sub_district:       subdistrict24,
		DistrictID:         new(uint),
		District:           district4,
		ProvinceID:         new(uint),
		Province:           province1,
		GenderID:           new(uint),
		Gender:             gender1,
		SymptomID:          new(uint),
		Symptom:            symp1,
		Symptom_name:       "ปวดฟัน",
		// EmployeeID:         new(uint),
		Employee: em1,
	}
	db.Model(&Patient{}).Create(&patient2)

	///////////////ข้อมูล ทดสอบ///////////

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

	///////////////ข้อมูลใน entity Medicine///////////
	Medicine1 := Medicine{
		Medicine_name:  "paracetamol 250 mg/5 mL) syrup, 60 mL bottle",
		Medicine_price: 145,
	}
	db.Model(&Medicine{}).Create(&Medicine1)

	Medicine2 := Medicine{
		Medicine_name:  "Ibuprofen",
		Medicine_price: 100,
	}
	db.Model(&Medicine{}).Create(&Medicine2)

	Medicine3 := Medicine{
		Medicine_name:  "Mefenamic acid",
		Medicine_price: 100,
	}
	db.Model(&Medicine{}).Create(&Medicine3)

	Medicine4 := Medicine{
		Medicine_name:  "Triamcinolone acetonide oral paste",
		Medicine_price: 100,
	}
	db.Model(&Medicine{}).Create(&Medicine4)

	Medicine5 := Medicine{
		Medicine_name:  "Acyclovir cream",
		Medicine_price: 100,
	}
	db.Model(&Medicine{}).Create(&Medicine5)

	Medicine6 := Medicine{
		Medicine_name:  "Sodium fluoride 0.25 mg.",
		Medicine_price: 100,
	}
	db.Model(&Medicine{}).Create(&Medicine6)

	Medicine7 := Medicine{
		Medicine_name:  "Chlorhexidine 0.02%",
		Medicine_price: 100,
	}
	db.Model(&Medicine{}).Create(&Medicine7)

	Medicine8 := Medicine{
		Medicine_name:  "Penicillin V",
		Medicine_price: 100,
	}
	db.Model(&Medicine{}).Create(&Medicine8)

	Medicine9 := Medicine{
		Medicine_name:  "Amoxicillin",
		Medicine_price: 100,
	}
	db.Model(&Medicine{}).Create(&Medicine9)

	Medicine10 := Medicine{
		Medicine_name:  "Roxithromycin",
		Medicine_price: 100,
	}
	db.Model(&Medicine{}).Create(&Medicine10)

	Medicine11 := Medicine{
		Medicine_name:  "Metronidazole",
		Medicine_price: 100,
	}
	db.Model(&Medicine{}).Create(&Medicine11)

	Medicine12 := Medicine{
		Medicine_name:  "Tetracy-cline HCl",
		Medicine_price: 100,
	}
	db.Model(&Medicine{}).Create(&Medicine12)

	///////////////ข้อมูลใน entity Medicine_status///////////
	Medicine_status1 := Medicine_status{
		Medicine_status_name: "รับยาแล้ว",
	}
	db.Model(&Medicine_status{}).Create(&Medicine_status1)

	Medicine_status2 := Medicine_status{
		Medicine_status_name: "ยังไม่ได้รับยา",
	}
	db.Model(&Medicine_status{}).Create(&Medicine_status2)

	///////////////ข้อมูลใน entity Prescription///////////
	DateTimePrescriptionA := time.Date(2022, time.September, 1, 13, 23, 44, 0, time.Local)
	DateTimePrescriptionB := time.Date(2022, time.September, 6, 13, 55, 26, 0, time.Local)
	DateTimePrescriptionC := time.Date(2022, time.September, 8, 25, 22, 33, 0, time.Local)

	Prescription1 := Prescription{
		Qty:				  2,	     			 	
		Details:			  "รับประทานหลังอาหาร",
		Medicine:             Medicine1,
		Medicine_status:      Medicine_status1,
		Patient:              patient1,
		Dentist:              dentist1,
		DateTimePrescription: DateTimePrescriptionA,
	}
	db.Model(&Prescription{}).Create(&Prescription1)

	Prescription2 := Prescription{
		Qty:				  10,	     			 	
		Details:			  "รับประทานวันละ 1 เม็ด",
		Medicine:             Medicine12,
		Medicine_status:      Medicine_status2,
		Patient:              patient2,
		Dentist:              dentist2,
		DateTimePrescription: DateTimePrescriptionB,
	}
	db.Model(&Prescription{}).Create(&Prescription2)

	Prescription3 := Prescription{
		Qty:				  5,	     			 	
		Details:			  "ทานยาแล้วอาจรู้สึกง่วงซึม",
		Medicine:             Medicine2,
		Medicine_status:      Medicine_status2,
		Patient:              patient2,
		Dentist:              dentist3,
		DateTimePrescription: DateTimePrescriptionC,
	}
	db.Model(&Prescription{}).Create(&Prescription3)

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

	//---------------------------------- ตารางหลัก treatment ---------------------------------
	treatment1 := Treatment{
		Dentist: dentist2,
		Patient: patient2,
		Number_of_cavities: 1,
		Number_of_swollen_gums: 1,
		Other_teeth_problems: "มีหินปูน",
		Type_Of_Treatment: Type_of_treatment8,
		Number_of_treatment: 1,
		Type_Of_Number_Of_Treatment: Type_of_number_of_treatment1,
		Treatment_detail: "ถอนฟัน1ซี่ ซ้ายบน",
		Treatment_time: time.Date(2022, time.September, 01, 13, 23, 44, 0, time.Local),
		Treatment_code: "T8906834",
		
	}
	db.Model(&Treatment{}).Create(&treatment1)

	//---------------------------------- ตารางหลัก treatment plan ---------------------------------
	treatment_plan1 := Treatment_plan{
		Dentist: dentist2,
		Patient: patient2,
		Order_of_treatment: 1,
		Type_Of_Treatment: Type_of_treatment8,
		Number_of_treatment: 1,
		Type_Of_Number_Of_Treatment: Type_of_number_of_treatment1,
		Treatment_detail: "ถอนฟัน1ซี่ ซ้ายบน",
		Treatment_explain: "ถอนฟันก่อนทำการจัดฟัน",
		Treatment_time: time.Date(2022, time.September, 01, 13, 23, 44, 0, time.Local),
		
	}
	db.Model(&Treatment_plan{}).Create(&treatment_plan1)

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
		Note:          "เพิ่มอุปกรณ์",
		Room_Number:   room_number3,
		Category:      category1,
		MedicalDevice: MedicalDevice1,
	}
	db.Model(&Room_Detail{}).Create(&room_detail1)

	room_detail2 := Room_Detail{
		Note:          "เพิ่มอุปกรณ์",
		Room_Number:   room_number4,
		Category:      category3,
		MedicalDevice: MedicalDevice3,
	}
	db.Model(&Room_Detail{}).Create(&room_detail2)

	//----------Repair---------------
	//damagelevel
	damageLevel1 := DamageLevel{
		Damage_Choice: "เสียหายหนัก",
	}
	db.Model(&DamageLevel{}).Create(&damageLevel1)

	damageLevel2 := DamageLevel{
		Damage_Choice: "เสียหายปานกลาง",
	}
	db.Model(&DamageLevel{}).Create(&damageLevel2)

	damageLevel3 := DamageLevel{
		Damage_Choice: "เสียหายเล็กน้อย",
	}
	db.Model(&DamageLevel{}).Create(&damageLevel3)

	//Repair
	RepairDateTime := time.Date(2022, time.September, 01, 13, 23, 44, 0, time.Local)

	repair1 := Repair{
		Employee:       em1,
		MedicalDevice:  MedicalDevice1,
		DamageLevel:    damageLevel3,
		Repair_Note:    "หลอดไฟไม่ทำงาน",
		Date_Of_Repair: RepairDateTime,
	}
	db.Model(&Repair{}).Create(&repair1)

	var re = []Reason{
		{Method: "อยากเจอแพทย์"},
		{Method: "ช่องปากต้องการรักษา"},
		{Method: "อาการสาหัส"},
		{Method: "ปวดใจว่าปวดแล้วปวดฟันดันซ้ำเติม"},
	}
	db.CreateInBatches(re, 4)

	///////////////ข้อมูลใน entity Payment_status///////////
	Payment_status1 := Payment_status{
		Payment_status_name: "ชำระแล้ว",
	}
	db.Model(&Payment_status{}).Create(&Payment_status1)

	Payment_status2 := Payment_status{
		Payment_status_name: "ยังไม่ได้ชำระ",
	}
	db.Model(&Payment_status{}).Create(&Payment_status2)

	///////////////ข้อมูลใน entity Prescription///////////
	DateTimePaymentA := time.Date(2022, time.September, 1, 13, 23, 44, 0, time.Local)
	DateTimePaymentB := time.Date(2022, time.September, 6, 13, 55, 26, 0, time.Local)
	DateTimePaymentC := time.Date(2022, time.September, 8, 25, 22, 33, 0, time.Local)

	Payment1 := Payment{
		Total_price:          1500,
		Payment_status:       Payment_status1,
		Patient:              patient1,
		Employee:             em2,
		DateTimePayment: DateTimePaymentA,
	}
	db.Model(&Payment{}).Create(&Payment1)

	Payment2 := Payment{
		Total_price:          2500,
		Payment_status:       Payment_status1,
		Patient:              patient2,
		Employee:             em1,
		DateTimePayment: DateTimePaymentB,
	}
	db.Model(&Payment{}).Create(&Payment2)

	Payment3 := Payment{
		Total_price:          500,
		Payment_status:       Payment_status2,
		Patient:              patient1,
		Employee:             em2,
		DateTimePayment: DateTimePaymentC,
	}
	db.Model(&Payment{}).Create(&Payment3)

}
