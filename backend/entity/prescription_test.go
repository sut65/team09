package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPrescription(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Qty check cannot be negative", func(t *testing.T) {
		Prescription := Prescription{
			Qty:					-1,//false
			Details:    			"ยานอนหลับ",//true
			DateTimePrescription:    time.Now(),//true
			Prescription_code: 		"T9086458",//true
		}

		ok, err := govalidator.ValidateStruct(Prescription)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Qty cannot be negative or too much"))
	})

	t.Run("Check DateTimePrescription must be a current date", func(t *testing.T) {
		Prescription := Prescription{
			Qty:					1,//true
			Details:    			"ยานอนหลับ",//true
			DateTimePrescription:    time.Now().Add(time.Hour * 2),//false
			Prescription_code: 		"T9086458",//true
		}

		ok, err := govalidator.ValidateStruct(Prescription)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("DateTimePrescription must be a current date"))
	})

	t.Run("Check Details note cannot be blank", func(t *testing.T) {
		Prescription := Prescription{
			Qty:					1,//true
			Details:    			"",//false
			DateTimePrescription:    time.Now(),//true
			Prescription_code: 		"T9086458",//true
		}

		ok, err := govalidator.ValidateStruct(Prescription)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Details note cannot be blank"))
	})

	t.Run("Check Details note must consist of 6 or more characters", func(t *testing.T) {
		Prescription := Prescription{
			Qty:					1,//true
			Details:    			"k",//false
			DateTimePrescription:    time.Now(),//true
			Prescription_code: 		"T9086458",//true
		}

		ok, err := govalidator.ValidateStruct(Prescription)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Details note must consist of 6 or more characters"))
	})

	t.Run("Check Prescription_code code cannot be blank", func(t *testing.T) {
		Prescription := Prescription{
			Qty:					1,//true
			Details:    			"ยานอนหลับ",//true
			DateTimePrescription:   time.Now(),//true
			Prescription_code: 		"",//false
		}

		ok, err := govalidator.ValidateStruct(Prescription)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Prescription_code code cannot be blank"))
	})

	t.Run("Check Details note must consist of 6 or more characters", func(t *testing.T) {
		
			Prescription := Prescription{
				Qty:					1,//true
				Details:    			"ยานอนหลับ",//true
				DateTimePrescription:   time.Now(),//true
				Prescription_code: 		"O6000000",//false
			}

		ok, err := govalidator.ValidateStruct(Prescription)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Prescription_code does not validate as matches(^[T]\\d{7}$) to equal"))
		
	})

}
