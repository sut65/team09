package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	// "gorm.io/gorm"
)

func TestDentistSchedule(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Job description cannot be blank", func(t *testing.T) {
		Dentistschedule := Dentist_schedule{
			Job_description: "", //ผิด
			TimeWork:        time.Now().Add(24 - time.Hour),
			TimeEnd:         time.Now().Add(24 * time.Hour),
		}

		ok, err := govalidator.ValidateStruct(Dentistschedule)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Job description cannot be blank"))
	})

	t.Run("Datetime must be a past date", func(t *testing.T) {
		Dentistschedule := Dentist_schedule{
			Job_description: "แพทย์ต้องการออกไปไล่ล่าความฝันเพราะฉะนั้นงานนี้แพทย์ไม่ซี", //ผิด
			TimeWork:        time.Now().Add(24 * time.Hour),                              // ผิด
			TimeEnd:         time.Now().Add(24 * time.Hour),
		}

		ok, err := govalidator.ValidateStruct(Dentistschedule)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("TimeWork must be a past date"))
	})
	t.Run("Datetime must be a future date", func(t *testing.T) {
		Dentistschedule := Dentist_schedule{
			Job_description: "แพทย์ต้องการออกไปไล่ล่าความฝันเพราะฉะนั้นงานนี้แพทย์ไม่ซี", //ผิด
			TimeWork:        time.Now().Add(24 - time.Hour),
			TimeEnd:         time.Now().Add(24 - time.Hour), //ผิด
		}

		ok, err := govalidator.ValidateStruct(Dentistschedule)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("TimeEnd must be a future date"))
	})

}
