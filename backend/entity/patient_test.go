package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPatientLenght(t *testing.T) {
	g := NewGomegaWithT(t)
	patient := Patient{
		FirstName:          "Ayaka",
		LastName:           "Masahiro",
		Personal_id:        "1234567891234",
		Old:                20,
		Weight:             56,
		Height:             170,
		Underlying_disease: "AAA",
		Drug_alergy:        "AAA",
		House_no:           "56/A",
		Symptom_name:       "ฟันผุ เป็นโรคฮิตที่ใครๆ ก็เป็นกัน เพราะว่าเป็นง่ายมาก เพราะสาเหตุของเกิดฟันผุนั้นมาจากการเนื้อฟันของเรามีเศษอาหารตกค้างอยู่เพราะแปรงฟันไม่สะอาด",
	}
	ok, err := govalidator.ValidateStruct(patient)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ข้อความต้องมีความยาว 1 ถึง 50 ตัวอักษร"))
}

func TestPatientNamenotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	patient := Patient{
		FirstName:          "",
		LastName:           "Masahiro",
		Personal_id:        "1234567891234",
		Old:                20,
		Weight:             56,
		Height:             170,
		Underlying_disease: "AAA",
		Drug_alergy:        "AAA",
		House_no:           "56/A",
		Symptom_name:       "aaaaaaaa",
	}
	ok, err := govalidator.ValidateStruct(patient)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาใส่ชื่อ"))
}

func TestPatientlastnamenotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	patient := Patient{
		FirstName:          "Ayaka",
		LastName:           "",
		Personal_id:        "1234567891234",
		Old:                20,
		Weight:             56,
		Height:             170,
		Underlying_disease: "AAA",
		Drug_alergy:        "AAA",
		House_no:           "56/A",
		Symptom_name:       "aaaaaaaa",
	}
	ok, err := govalidator.ValidateStruct(patient)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาใส่นามสกุล"))
}

func TestPatientOldnotnegative(t *testing.T) {
	g := NewGomegaWithT(t)
	patient := Patient{
		FirstName:          "Ayaka",
		LastName:           "Miyuki",
		Personal_id:        "1234567891234",
		Old:                -20,
		Weight:             56,
		Height:             170,
		Underlying_disease: "AAA",
		Drug_alergy:        "AAA",
		House_no:           "56/A",
		Symptom_name:       "aaaaaaaa",
	}
	ok, err := govalidator.ValidateStruct(patient)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("อายุห้ามเป็นค่าติดลบและไม่ควรเกิน 200"))
}

func TestPatientWeightnotnegative(t *testing.T) {
	g := NewGomegaWithT(t)
	patient := Patient{
		FirstName:          "Ayaka",
		LastName:           "Miyuki",
		Personal_id:        "1234567891234",
		Old:                20,
		Weight:             -56,
		Height:             170,
		Underlying_disease: "AAA",
		Drug_alergy:        "AAA",
		House_no:           "56/A",
		Symptom_name:       "aaaaaaaa",
	}
	ok, err := govalidator.ValidateStruct(patient)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("น้ำหนักห้ามเป็นค่าติดลบและไม่ควรเกิน 300"))
}

func TestPatientHeightnotnegative(t *testing.T) {
	g := NewGomegaWithT(t)
	patient := Patient{
		FirstName:          "Ayaka",
		LastName:           "Miyuki",
		Personal_id:        "1234567891234",
		Old:                20,
		Weight:             56,
		Height:             -170,
		Underlying_disease: "AAA",
		Drug_alergy:        "AAA",
		House_no:           "56/A",
		Symptom_name:       "aaaaaaaa",
	}
	ok, err := govalidator.ValidateStruct(patient)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ส่วนสูงห้ามเป็นค่าติดลบและไม่ควรเกิน 300"))
}

func TestPatientPersonalIDIS13digit(t *testing.T) {
	g := NewGomegaWithT(t)
	patient := Patient{
		FirstName:          "Ayaka",
		LastName:           "Miyuki",
		Personal_id:        "1234567891",
		Old:                20,
		Weight:             56,
		Height:             170,
		Underlying_disease: "AAA",
		Drug_alergy:        "AAA",
		House_no:           "56/A",
		Symptom_name:       "aaaaaaaa",
	}
	ok, err := govalidator.ValidateStruct(patient)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("รหัสบัตรประชาชนต้องมี 13 ตัวและเป็นตัวเลข(0-9)"))
}
