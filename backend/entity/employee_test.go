package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestEmployeeIDMustBeInValidPattern(t *testing.T) {
	g := NewGomegaWithT(t)
	fixtures := []string{
		"X6000000",
		"EA000000",  // E ตามด้วย A และ \d 6 ตัว
		"E000000",   // E ตามด้วย \d 6 ตัว
		"E00000000", // E ตามด้วย \d 8 ตัว
	}

	for _, fixture := range fixtures {
		employee := Employee{
			Employee_number: fixture,
			FirstName:       "AAA",
			LastName:        "BBB",
			Personal_id:     "1234567890123",
			Password:        "123456789",
			Email:           "aaa@gmail.com",
			Old:             23,
			Salary:          28000,
			House_no:        "56",
		}

		ok, err := govalidator.ValidateStruct(employee)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมาlo
		g.Expect(err.Error()).To(Equal(fmt.Sprintf(`Employee_number ต้องขึ้นต้นด้วย E ตามด้วยตัวเลข 7 ตัว`)))
	}
}

func TestEmployeeEmail(t *testing.T) {
	g := NewGomegaWithT(t)
	employee := Employee{
		Employee_number: "E0000001",
		FirstName:       "first",
		LastName:        "Lastname",
		Personal_id:     "1158877436521",
		Password:        "123456789",
		Old:             23,
		Email:           "a@gmail.",
		Salary:          28000,
		House_no:        "56",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal(fmt.Sprintf(`รูปแบบ Email ไม่ถูกต้อง`)))
}

func TestEmployeeOldcannotbeNegative(t *testing.T) {
	g := NewGomegaWithT(t)
	employee := Employee{
		Employee_number: "E0000001",
		FirstName:       "firstName",
		LastName:        "lastName",
		Personal_id:     "1158877436521",
		Password:        "123456789",
		Old:             -23,
		Salary:          28000,
		House_no:        "56",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal(fmt.Sprintf(`อายุห้ามเป็นค่าลบและไม่ควรเกิน 200 ปี`)))
}

func TestEmployeePasswordEqul8digit(t *testing.T) {
	g := NewGomegaWithT(t)
	employee := Employee{
		Employee_number: "E0000001",
		FirstName:       "firstName",
		LastName:        "lastName",
		Personal_id:     "1158877436521",
		Password:        "1234",
		Old:             23,
		Salary:          28000,
		House_no:        "56",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal(fmt.Sprintf(`Password ต้องมีความยาวอย่างน้อย 8 ตัวอักษร`)))
}
