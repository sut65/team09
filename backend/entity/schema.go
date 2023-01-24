package entity

import (
	"time"

	"gorm.io/gorm"
)

// ----ระบบพนักงาน------
type Role struct {
	gorm.Model
	Role_name string
	Employees []Employee `gorm:"foreignKey:RoleID"`
	Dentists  []Dentist  `gorm:"foreignKey:RoleID"`
}

type Gender struct {
	gorm.Model
	Gender_name string
	Employees   []Employee `gorm:"foreignKey:GenderID"`
	Patients    []Patient  `gorm:"foreignKey: GenderID"`
	Dentists    []Dentist  `gorm:"foreignKey:GenderID"`
}

type Province struct {
	gorm.Model
	Province_name string
	Districts     []District `gorm:"foreignKey:ProvinceID"`
	Dentists      []Dentist  `gorm:"foreignKey:ProvinceID"`
}

type District struct {
	gorm.Model
	District_name string
	//ProvinceID ทำหน้าที่เป็น FK
	ProvinceID    *uint
	Province      Province       `gorm:"references:id"`
	Sub_districts []Sub_district `gorm:"foreignKey:DistrictID"`
}

type Sub_district struct {
	gorm.Model
	Sub_district_name string
	//DistrictID ทำหน้าที่เป็น FK
	DistrictID *uint
	District   District   `gorm:"references:id"`
	Employees  []Employee `gorm:"foreignKey:Sub_districtID"`
	Patients   []Patient  `gorm:"foreignKey: Sub_districtID"`
}

type Employee struct {
	gorm.Model
	Employee_number string `gorm:"uniqueIndex"`
	FirstName       string
	LastName        string
	Personal_id     string `gorm:"uniqueIndex"`
	Password        string `gorm:"uniqueIndex"`
	Phone           uint
	House_no        string

	//Sub_districtID ทำหน้าที่เป็น FK
	Sub_districtID *uint
	Sub_district   Sub_district `gorm:"references:id"`

	//GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender `gorm:"references:id"`

	//RoleID ทำหน้าที่เป็น FK
	RoleID *uint
	Role   Role `gorm:"references:id"`

	Patients       []Patient       `gorm:"foreignKey: EmployeeID"`
	Medical_device []MedicalDevice `gorm:"foreignKey:EmployeeID"`
	Repairs        []Repair        `gorm:"foreignKey:EmployeeID"`
	//โยงกับระบบนัดผู้ป่วย
	Patien_schedule []Patien_schedule `gorm:"foreignKey:EmployeeID"`
}

// -----ระบบผู้ป่วย--------
type Symptom struct {
	gorm.Model
	Symptom_name string
	Patients     []Patient `gorm:"foreignKey: SymptomID"`
}

type Patient struct {
	gorm.Model
	FirstName          string
	LastName           string
	Personal_id        string `gorm:"uniqueIndex"`
	Old                uint
	Weight             uint
	Height             uint
	Underlying_disease string
	Drug_alergy        string
	House_no           string

	//Sub_districtID ทำหน้าที่เป็น FK
	Sub_districtID *uint
	Sub_district   Sub_district `gorm:"references:id"`

	//GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender `gorm:"references:id"`

	//RoleID ทำหน้าที่เป็น FK
	SymptomID *uint
	Symptom   Symptom `gorm:"references:id"`

	EmployeeID *uint
	Employee   Employee `gorm:"references:id"`

	Prescriptions []Prescription `gorm:"foreignKey:PatientID"`

	//สำหรับ entity การรักษาดึงไป
	Treatment []Treatment `gorm:"foreignkey:PatientID"`

	//ระบบนัดผู้ป่วย ดึงไป
	Patien_schedule []Patien_schedule `gorm:"foreignKey:Type_Of_TreatmentID"`
}

// -----ระบบเครื่องมือแพทย์-----
type Type struct {
	gorm.Model
	Type_Name      string
	Medical_device []MedicalDevice `gorm:"foreignKey:Type_ID"`
}

type Status struct {
	gorm.Model
	Status_Choice  string
	Medical_device []MedicalDevice `gorm:"foreignKey:Status_ID"`
}

type MedicalDevice struct {
	gorm.Model
	EmployeeID *uint
	Employee   Employee

	Type_ID *uint
	Type    Type

	Status_ID *uint
	Status    Status

	Device_Name string
	Amount      int
	Date        time.Time

	Repairs []Repair `gorm:"foreignKey:MedicalDeviceID"`
}

// -----ระบบแจ้งซ่อมเครื่องมือแพทย์-----
type DamageLevel struct {
	gorm.Model
	Damage_Choice string

	Repairs []Repair `gorm:"foreignKey:DamageLevelID"`
}

type Repair struct {
	gorm.Model
	EmployeeID *uint
	Employee   Employee

	MedicalDeviceID *uint
	MedicalDevice   MedicalDevice

	DamageLevelID *uint
	DamageLevel   DamageLevel

	Date_Of_Repair time.Time
}

// ระบบนัดผู้ป่วย
type Reason struct {
	gorm.Model
	Method          string
	Patien_schedule []Patien_schedule `gorm:"foreignKey:ReasonID"`
}

type Patien_schedule struct {
	gorm.Model

	PatientID *uint
	Patient   Patient `gorm:"references:id"`

	EmployeeID *uint
	Employee   Employee `gorm:"references:id"`

	ReasonID *uint
	Reason   Reason `gorm:"references:id"`

	Type_Of_TreatmentID *uint
	Type_Of_Treatment   Type_of_treatment `gorm:"references:id"`
	Date_time           time.Time
}

// -----ระบบบันทึกเครื่องมือแพทย์-----
type Specialized struct {
	gorm.Model
	Specialized_Name string

	Dentists []Dentist `gorm:"foreignKey:SpecializedID"`
}

type University struct {
	gorm.Model
	University_Name string

	Dentists []Dentist `gorm:"foreignKey:UniversityID"`
}

type Dentist struct {
	gorm.Model

	FirstName    string
	LastName     string
	Personal_id  string `gorm:"uniqueIndex"`
	Email        string `gorm:"uniqueIndex"`
	Password     string
	Age          int
	Phone_Number string `gorm:"uniqueIndex"`

	//GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender `gorm:"references:id"`

	//SpecializedID ทำหน้าที่เป็น FK
	SpecializedID *uint
	Specialized   Specialized `gorm:"references:id"`

	//UniversityID ทำหน้าที่เป็น FK
	UniversityID *uint
	University   University `gorm:"references:id"`

	//RoleID ทำหน้าที่เป็น FK
	RoleID *uint
	Role   Role `gorm:"references:id"`

	//ProvinceID ทำหน้าที่เป็น FK
	ProvinceID *uint
	Province   Province `gorm:"references:id"`

	Prescriptions []Prescription `gorm:"foreignKey:DentistID"`

	//สำหรับ entity การรักษาดึงไป
	Treatment []Treatment `gorm:"foreignkey:DentistID"`
}

// -----ระบบสั่งจ่ายยา-----
type Medicine struct {
	gorm.Model
	Medicine_name string
	Prescriptions []Prescription `gorm:"foreignKey:MedicineID"`
}

type Prescription struct {
	gorm.Model
	DateTimePrescription time.Time
	//PatientID 	ทำหน้าที่เป็น FK
	PatientID *uint
	Patient   Patient
	//DentistID 	ทำหน้าที่เป็น FK
	DentistID *uint
	Dentist   Dentist
	//MedicineID 	ทำหน้าที่เป็น FK
	MedicineID *uint
	Medicine   Medicine
}

// / ระบบบันทึกการรักษา
type Type_of_treatment struct {
	gorm.Model
	Type_of_treatment_name string
	Price                  int
	Treatment              []Treatment `gorm:"foreignkey:Type_Of_TreatmentID"`
	//โยงกับระบบนัดผู้ป่วย
	Patien_schedule []Patien_schedule `gorm:"foreignKey:Type_Of_TreatmentID"`
}

type Type_of_number_of_treatment struct {
	gorm.Model
	Type_of_number_of_treatment_name string
	Treatment                        []Treatment `gorm:"foreignkey:Type_Of_Number_Of_TreatmentID"`
}

type Treatment struct {
	gorm.Model

	DentistID *uint
	Dentist   Dentist

	PatientID *uint
	Patient   Patient

	Number_of_cavities int

	Number_of_swollen_gums int

	Other_teeth_problems string

	Type_Of_TreatmentID *uint
	Type_Of_Treatment   Type_of_treatment

	Number_of_treatment int

	Type_Of_Number_Of_TreatmentID *uint
	Type_Of_Number_Of_Treatment   Type_of_number_of_treatment

	Treatment_detail string

	Treatment_time time.Time

	Treatment_code string
}
