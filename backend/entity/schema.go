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
}

type Gender struct {
	gorm.Model
	Gender_name string
	Employees   []Employee `gorm:"foreignKey:GenderID"`
	Patients    []Patient  `gorm:"foreignKey: GenderID"`
}

type Province struct {
	gorm.Model
	Province_name string
	Districts     []District `gorm:"foreignKey:ProvinceID"`
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
	Employee_name   string
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
}

// -----ระบบผู้ป่วย--------
type Symptom struct {
	gorm.Model
	Symptom_name string
	Patients     []Patient `gorm:"foreignKey: SymptomID"`
}

type Patient struct {
	gorm.Model
	Patient_name       string
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
type DamageLeval struct {
	gorm.Model
	Damage_Choice string
	Repairs       []Repair `gorm:"foreignKey:DamageLevalID"`
}

type Repair struct {
	gorm.Model
	EmployeeID *uint
	Employee   Employee

	MedicalDeviceID *uint
	MedicalDevice   MedicalDevice

	DamageLevalID *int
	DamageLeval   DamageLeval

	Date_Of_Repair time.Time
}
