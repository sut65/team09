package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPatient(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run("Check Old cannot be negative", func(t *testing.T) {
		patient := Patient{
			FirstName:          "Ayato",
			LastName:           "Koru",
			Personal_id:        "1234567891234",
			Old:                -1,
			Weight:             50,
			Height:             160,
			Underlying_disease: "-",
			Drug_alergy:        "-",
			House_no:           "56/A",
		}
		ok, err := govalidator.ValidateStruct(patient)
		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())
		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())
		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal((`Old cannot be negative`)))
	})

	t.Run("Check Weight cannot be negative", func(t *testing.T) {
		patient := Patient{
			FirstName:          "Ayato",
			LastName:           "Koru",
			Personal_id:        "1234567891234",
			Old:                20,
			Weight:             -1,
			Height:             160,
			Underlying_disease: "-",
			Drug_alergy:        "-",
			House_no:           "56/A",
		}
		ok, err := govalidator.ValidateStruct(patient)
		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())
		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())
		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal((`Weight cannot be negative`)))
	})

	t.Run("Check Height cannot be negative", func(t *testing.T) {
		patient := Patient{
			FirstName:          "Ayato",
			LastName:           "Koru",
			Personal_id:        "1234567891234",
			Old:                20,
			Weight:             56,
			Height:             -1,
			Underlying_disease: "-",
			Drug_alergy:        "-",
			House_no:           "56/A",
		}
		ok, err := govalidator.ValidateStruct(patient)
		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())
		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())
		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal((`Height cannot be negative`)))
	})

	t.Run("FirstName cannot be blank", func(t *testing.T) {
		patient := Patient{
			FirstName:          "",
			LastName:           "Koru",
			Personal_id:        "1234567891234",
			Old:                20,
			Weight:             56,
			Height:             170,
			Underlying_disease: "-",
			Drug_alergy:        "-",
			House_no:           "56/A",
		}
		ok, err := govalidator.ValidateStruct(patient)
		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())
		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())
		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal((`FirstName can't be blank`)))
	})

	t.Run("LastName cannot be blank", func(t *testing.T) {
		patient := Patient{
			FirstName:          "Ayato",
			LastName:           "",
			Personal_id:        "1234567891234",
			Old:                20,
			Weight:             56,
			Height:             170,
			Underlying_disease: "-",
			Drug_alergy:        "-",
			House_no:           "56/A",
		}
		ok, err := govalidator.ValidateStruct(patient)
		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())
		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())
		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal((`LastName can't be blank`)))
	})

	t.Run("Personal_id is 13 digit", func(t *testing.T) {
		personal := "12345678910" //ผิด
		patient := Patient{
			FirstName:          "Ayato",
			LastName:           "",
			Personal_id:        personal,
			Old:                20,
			Weight:             56,
			Height:             170,
			Underlying_disease: "-",
			Drug_alergy:        "-",
			House_no:           "56/A",
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(patient)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal(fmt.Sprintf(`Personal_id: %s does not validate as matches(^[0-9]{13}$)`, personal)))
	})

}
