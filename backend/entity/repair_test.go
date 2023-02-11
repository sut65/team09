package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestRepair(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check Repair_Note cannot be blank", func(t *testing.T) {
		rp := Repair{
			Repair_Note:    "",         //false
			Date_Of_Repair: time.Now(), //true
		}
		ok, err := govalidator.ValidateStruct(rp)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Repair_Note cannot be blank"))
	})

	t.Run("check Repair_Note must not exceed 50 characters", func(t *testing.T) {
		rp := Repair{
			Repair_Note:    "หลอดไฟเสีย, ไฟไม่เข้าเครื่อง, ที่ปรับระดับเบาะใช้งานไม่ได้", //false
			Date_Of_Repair: time.Now(),                                                   //true
		}
		ok, err := govalidator.ValidateStruct(rp)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Repair_Note must not exceed 50 characters"))
	})

	t.Run("check Repair_Note must not exceed 50 characters", func(t *testing.T) {
		rp := Repair{
			Repair_Note:    "หลอดไฟเสีย, ไฟไม่เข้าเครื่อง, ที่ปรับระดับเบาะใช้งานไม่ได้", //false
			Date_Of_Repair: time.Now(),                                                   //true
		}
		ok, err := govalidator.ValidateStruct(rp)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Repair_Note must not exceed 50 characters"))
	})

	t.Run("check Date_Of_Repair is current date", func(t *testing.T) {
		rp := Repair{
			Repair_Note:    "หลอดไฟเสีย",                  //true
			Date_Of_Repair: time.Now().Add(time.Hour * 2), //false
		}
		ok, err := govalidator.ValidateStruct(rp)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Date_Of_Repair must be a current date"))
	})
}
