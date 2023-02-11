package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
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
	Employees     []Employee `gorm:"foreignKey:ProvinceID"`
	Patients      []Patient  `gorm:"foreignKey: ProvinceID"`
	Districts     []District `gorm:"foreignKey:ProvinceID"`
	Dentists      []Dentist  `gorm:"foreignKey:ProvinceID"`
}

type District struct {
	gorm.Model
	District_name string
	//ProvinceID ทำหน้าที่เป็น FK
	ProvinceID    *uint
	Province      Province       `gorm:"references:id"`
	Employees     []Employee     `gorm:"foreignKey:DistrictID"`
	Patients      []Patient      `gorm:"foreignKey:DistrictID"`
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
	Employee_number string `gorm:"uniqueIndex" valid:"matches(^[E]\\d{7}$)"`
	FirstName       string
	LastName        string
	Personal_id     string `gorm:"uniqueIndex" valid:"matches(^[0-9]{13}$)"`
	Password        string `gorm:"uniqueIndex"`
	Phone           string
	House_no        string

	//Sub_districtID ทำหน้าที่เป็น FK
	Sub_districtID *uint
	Sub_district   Sub_district `gorm:"references:id"`

	//DistrictID ทำหน้าที่เป็น FK
	DistrictID *uint
	District   District `gorm:"references:id"`

	//ProvinceID ทำหน้าที่เป็น FK
	ProvinceID *uint
	Province   Province `gorm:"references:id"`

	//GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender `gorm:"references:id"`

	//RoleID ทำหน้าที่เป็น FK
	RoleID *uint
	Role   Role `gorm:"references:id"`

	Patients []Patient `gorm:"foreignKey: EmployeeID"`
	// Medical_device []MedicalDevice `gorm:"foreignKey:EmployeeID"`
	Repairs []Repair `gorm:"foreignKey:EmployeeID"`
	//โยงกับระบบนัดผู้ป่วย
	Patien_schedule []Patien_schedule `gorm:"foreignKey:EmployeeID"`
}

// -----ระบบผู้ป่วย--------
type Symptom struct {
	gorm.Model
	Symptom_choice string
	Patients       []Patient `gorm:"foreignKey: SymptomID"`
}

type Patient struct {
	gorm.Model
	FirstName          string
	LastName           string
	Personal_id        string `gorm:"uniqueIndex"`
	Old                uint8
	Weight             uint8
	Height             uint8
	Underlying_disease string
	Drug_alergy        string
	House_no           string

	//Sub_districtID ทำหน้าที่เป็น FK
	Sub_districtID *uint
	Sub_district   Sub_district `gorm:"references:id"`

	//DistrictID ทำหน้าที่เป็น FK
	DistrictID *uint
	District   District `gorm:"references:id"`

	//ProvinceID ทำหน้าที่เป็น FK
	ProvinceID *uint
	Province   Province `gorm:"references:id"`

	//GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender `gorm:"references:id"`

	//SymptomID ทำหน้าที่เป็น FK
	SymptomID    *uint
	Symptom      Symptom `gorm:"references:id"`
	Symptom_name string

	EmployeeID *uint
	Employee   Employee `gorm:"references:id"`

	Prescriptions []Prescription `gorm:"foreignKey:PatientID"`

	//โยงกับระบบบันทึกการรักษา
	Treatment []Treatment `gorm:"foreignkey:PatientID"`

	//โยงกับระบบจัดแผนการรักษา
	Treatment_plan []Treatment_plan `gorm:"foreignkey:PatientID"`
}

// -----ระบบเครื่องมือแพทย์-----
type Type struct {
	gorm.Model
	Type_Name      string
	Medical_device []MedicalDevice `gorm:"foreignKey:TypeID"`
}

type Status struct {
	gorm.Model
	Status_Choice  string
	Medical_device []MedicalDevice `gorm:"foreignKey:StatusID"`
}

type MedicalDevice struct {
	gorm.Model
	EmployeeID *uint
	Employee   Employee `valid:"-"`

	TypeID *uint
	Type   Type

	StatusID *uint
	Status   Status

	Device_Name string    `valid:"required~Device_Name cannot be blank"`
	Amount      int       `valid:"range(1|1000)~Amount is invalid"`
	Record_Date time.Time `valid:"current~Record_Date must be a current date"`

	Repairs      []Repair      `gorm:"foreignKey:MedicalDeviceID"`
	Room_Details []Room_Detail `gorm:"foreignKey:MedicalDeviceID"`
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
	Employee   Employee `valid:"-"`

	MedicalDeviceID *uint
	MedicalDevice   MedicalDevice `valid:"-"`

	DamageLevelID *uint
	DamageLevel   DamageLevel

	Repair_Note    string
	Date_Of_Repair time.Time
}

// ระบบนัดผู้ป่วย
type Reason struct {
	gorm.Model
	Method          string            `valid:"required~Method not blank"`
	Patien_schedule []Patien_schedule `gorm:"foreignKey:ReasonID"`
}

type Patien_schedule struct {
	gorm.Model

	PatientID *uint
	Patient   Patient `gorm:"references:id" valid:"-"`

	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`

	ReasonID *uint
	Reason   Reason `gorm:"references:id" valid:"-"`

	Patien_Number string `valid:"matches(\\d{10}$)~Number must be Interger and 10 number"`

	Type_of_treatmentID *uint
	Type_of_treatment   Type_of_treatment `gorm:"references:id" valid:"-"`
	Date_time           time.Time         `valid:"future~Datetime must be a future date"`
}

// -----ระบบจัดการข้อมูลทันตแพทย์-----
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

	FirstName    string `valid:"required~FirstName cannot be blank"`
	LastName     string `valid:"required~LastName cannot be blank"`
	Personal_id  string `gorm:"uniqueIndex"  valid:"required~Personal_id cannot be blank"`
	Email        string `gorm:"uniqueIndex"  valid:"email~รูปแบบ Email ไม่ถูกต้อง,required~รูปแบบ Email ไม่ถูกต้อง"`
	Password     string	`valid:"required~Password cannot be blank"`
	Age          int	`valid:"range(10|100)~Age is not in range 10 to 100"`
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

	//โยงกับระบบบันทึกการรักษา
	Treatment []Treatment `gorm:"foreignkey:DentistID"`

	//โยงกับระบบจัดเเผนการรักษา
	Treatment_plan []Treatment_plan `gorm:"foreignkey:DentistID"`

	Prescriptions []Prescription `gorm:"foreignKey:DentistID"`
	//โยงกับระบบจัดตารางงานแพทย์
	Dentist_schedule []Dentist_schedule `gorm:"foreignKey:DentistID"`
}

// -----ระบบสั่งจ่ายยา-----
type Medicine_status struct {
	gorm.Model
	Medicine_status_name string
	Prescriptions        []Prescription `gorm:"foreignKey:Medicine_statusID"`
}

type Medicine struct {
	gorm.Model
	Medicine_name  string
	Medicine_price uint
	Prescriptions  []Prescription `gorm:"foreignKey:MedicineID"`
}

type Prescription struct {
	gorm.Model
	DateTimePrescription time.Time
	//PatientID 	ทำหน้าที่เป็น FK
	PatientID *uint `valid:"required~Name cannot be blank"`
	Patient   Patient
	//DentistID 	ทำหน้าที่เป็น FK
	DentistID *uint
	Dentist   Dentist
	//Medicine_statusID 	ทำหน้าที่เป็น FK
	Medicine_statusID *uint `valid:"required~Medicine_status cannot be blank"`
	Medicine_status   Medicine_status
	//MedicineID 	ทำหน้าที่เป็น FK
	MedicineID *uint
	Medicine   Medicine
}

// / ระบบบันทึกการรักษา
type Type_of_treatment struct {
	gorm.Model
	Type_of_treatment_name string
	Price                  int
	//โยงกับระบบบันทึกการักษา
	Treatment []Treatment `gorm:"foreignkey:Type_Of_TreatmentID"`

	//โยงกับระบบจัดเเผนการักษา
	Treatment_plan []Treatment_plan `gorm:"foreignkey:Type_Of_TreatmentID"`

	//โยงกับระบบนัดผู้ป่วย
	Patien_schedule []Patien_schedule `gorm:"foreignKey:Type_of_treatmentID"`
}

type Type_of_number_of_treatment struct {
	gorm.Model
	Type_of_number_of_treatment_name string

	//โยงกับระบบบันทึกการรักษา
	Treatment []Treatment `gorm:"foreignkey:Type_Of_Number_Of_TreatmentID"`

	//โยงกับระบบจัดเเผนการรักษา
	Treatment_plan []Treatment_plan `gorm:"foreignkey:Type_Of_Number_Of_TreatmentID"`
}

type Treatment struct {
	gorm.Model
	//DentistID 	ทำหน้าที่เป็น FK
	DentistID *uint
	Dentist Dentist `gorm:"references:id" valid:"-"`
	//PatientID 	ทำหน้าที่เป็น FK
	PatientID              *uint
	Patient                Patient `gorm:"references:id" valid:"-"`
	Number_of_cavities int `valid:"range(0|50)~Number of cavities cannot be negative"`
	Number_of_swollen_gums int `valid:"range(0|50)~Number of swollen gums cannot be negative"`
	Other_teeth_problems   string `valid:"required~Other teeth problems cannot be blank"`
	//Type_Of_TreatmentID 	ทำหน้าที่เป็น FK
	Type_Of_TreatmentID *uint
	Type_Of_Treatment   Type_of_treatment `gorm:"references:id" valid:"-"`
	Number_of_treatment int `valid:"range(0|50)~Number of treatment cannot be negative"`
	//Type_Of_Number_Of_TreatmentID 	ทำหน้าที่เป็น FK
	Type_Of_Number_Of_TreatmentID *uint
	Type_Of_Number_Of_Treatment   Type_of_number_of_treatment `gorm:"references:id" valid:"-"`
	Treatment_detail              string `valid:"stringlength(6|100)~Treatment detail must consist of 6 or more characters, required~Treatment detail cannot be blank"`
	Treatment_time                time.Time `valid:"past~Treatment time must be a past date"`
	Treatment_code                string `valid:"matches(^[T]\\d{7}$), required~Treatment code cannot be blank"`
}

// ------ระบบจัดแผนการรักษา------//
type Treatment_plan struct {
	gorm.Model
	//DentistID 	ทำหน้าที่เป็น FK
	DentistID *uint
	Dentist   Dentist `gorm:"references:id" valid:"-"`
	//PatientID 	ทำหน้าที่เป็น FK
	PatientID          *uint
	Patient            Patient `gorm:"references:id" valid:"-"`
	Order_of_treatment int	`valid:"range(0|50)~Order of treatment cannot be negative"`
	//Type_Of_TreatmentID 	ทำหน้าที่เป็น FK
	Type_Of_TreatmentID *uint
	Type_Of_Treatment   Type_of_treatment `gorm:"references:id" valid:"-"`
	Number_of_treatment int	`valid:"range(0|50)~Number of treatment cannot be negative"`
	//Type_Of_Number_Of_TreatmentID 	ทำหน้าที่เป็น FK
	Type_Of_Number_Of_TreatmentID *uint
	Type_Of_Number_Of_Treatment   Type_of_number_of_treatment `gorm:"references:id" valid:"-"`
	Treatment_detail              string `valid:"stringlength(6|100)~Treatment detail must consist of 6 or more characters, required~Treatment detail cannot be blank"` 
	Treatment_explain             string `valid:"required~Treatment explain cannot be blank, stringlength(6|100)~Treatment explain must consist of 6 or more characters"`
	Treatment_time                time.Time
}

// -----ระบบแจ้งยอดชำระ-----
type Payment_status struct {
	gorm.Model
	Payment_status_name string
	Payments            []Payment `gorm:"foreignKey:Payment_statusID"`
}

type Payment struct {
	gorm.Model
	Total_price     uint
	DateTimePayment time.Time
	//PatientID 	ทำหน้าที่เป็น FK
	PatientID *uint
	Patient   Patient
	//EmployeeID 	ทำหน้าที่เป็น FK
	EmployeeID *uint
	Employee   Employee
	//Payment_statusID 	ทำหน้าที่เป็น FK
	Payment_statusID *uint
	Payment_status   Payment_status
}

// ระบบจัดตารางงานแพทย์
type Workingday struct {
	gorm.Model
	Day              string
	Dentist_schedule []Dentist_schedule `gorm:"foreignKey:WorkingdayID"`
}

type Responsity struct {
	gorm.Model
	Respon           string
	Dentist_schedule []Dentist_schedule `gorm:"foreignKey:ResponsityID"`
}

type Dentist_schedule struct {
	gorm.Model

	ResponsityID *uint
	Responsity   Responsity `gorm:"references:id" valid:"-"`

	WorkingdayID *uint
	Workingday   Workingday `gorm:"references:id" valid:"-"`

	DentistID *uint
	Dentist   Dentist `gorm:"references:id" valid:"-"`

	Room_NumberID *uint
	Room_Number   Room_Number `gorm:"references:id" valid:"-"`

	Job_description  string `valid:"required~Job description cannot be blank"`

	TimeWork time.Time `valid:"past~TimeWork must be a past date"`
	TimeEnd  time.Time  `valid:"future~TimeEnd must be a future date"`
}

// ระบบจัดการห้อง
type Category struct {
	gorm.Model
	Category_Name string

	Room_Details []Room_Detail `gorm:"foreignKey:CategoryID"`
}

type Room_Number struct {
	gorm.Model
	Room_number string

	Room_Details []Room_Detail `gorm:"foreignKey:Room_NumberID"`
	Dentist_schedule []Dentist_schedule `gorm:"foreignKey:Room_NumberID"`
}

type Room_Detail struct {
	gorm.Model


	//CategoryID ทำหน้าที่เป็น FK
	CategoryID *uint
	Category   Category `gorm:"references:id" `

	//NumberID ทำหน้าที่เป็น FK
	Room_NumberID *uint
	Room_Number   Room_Number `gorm:"references:id"`

	//MedicialDeviceID ทำหน้าที่เป็น FK
	MedicalDeviceID *uint
	MedicalDevice   MedicalDevice `gorm:"references:id"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now()
		return now.After(t)
	})
	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now()
		return now.Before(time.Time(t))
	})
	govalidator.CustomTypeTagMap.Set("current", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now().Add(time.Minute * -10)
		return t.After(now) && t.Before(time.Now().Add(time.Minute*+1))
		// t(ค่าที่รับ)ต้องมีค่าเวลาหลังเวลาปัจจุบันไม่เกิน 10 นาที(ต้องบันทึกข้อมูลภายใน 10 นาที), t ต้องมีค่าก่อนเวลาปัจจุบันได้ไม่เกิน 1 นาที
	})
}
