package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestMedicalDevice(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check Device_Name cannot be blank", func(t *testing.T) {
		md := MedicalDevice{
			Device_Name: "",         //false
			Amount:      10,         //true
			Record_Date: time.Now(), //true
		}
		ok, err := govalidator.ValidateStruct(md)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Device_Name cannot be blank"))
	})

	t.Run("check Amount is 1-1000", func(t *testing.T) {
		md := MedicalDevice{
			Device_Name: "เก้าทำฟัน", //true
			Amount:      2000,        //false
			Record_Date: time.Now(),  //true
		}
		ok, err := govalidator.ValidateStruct(md)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Amount is invalid"))
	})

	t.Run("check Record_Date is current date", func(t *testing.T) {
		md := MedicalDevice{
			Device_Name: "เก้าทำฟัน",                   //true
			Amount:      10,                            //true
			Record_Date: time.Now().Add(time.Hour * 2), //false
		}
		ok, err := govalidator.ValidateStruct(md)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Record_Date must be a current date"))
	})
}
