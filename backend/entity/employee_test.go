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
			Password:        "1234",
			Phone:           "0956478156",
			House_no:        "56",
		}

		ok, err := govalidator.ValidateStruct(employee)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal(fmt.Sprintf(`Employee_number: %s does not validate as matches(^[E]\d{7}$)`, fixture)))
	}
}

func TestEmployeeEqualthirteenDigit(t *testing.T) {
	g := NewGomegaWithT(t)
	personal := "12345678910" //ผิด
	employee := Employee{
		Employee_number: "E6489129",
		FirstName:       "AAA",
		LastName:        "BBB",
		Personal_id:     personal,
		Password:        "1234",
		Phone:           "0956478156",
		House_no:        "56",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal(fmt.Sprintf(`Personal_id: %s does not validate as matches(^[0-9]{13}$)`, personal)))
}
