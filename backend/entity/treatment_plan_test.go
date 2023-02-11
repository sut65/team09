package entity

import (
	//"time"
	"testing"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	//"gorm.io/gorm"
	
)

func TestTreatmentPlan(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check Order of treatment cannot be negative or too much", func(t *testing.T) {
		treatmentplan := Treatment_plan{
			Order_of_treatment: -1,
			Number_of_treatment: 1,
			Treatment_detail: "ถอนฟันบนขวา 2 ซี่",
			Treatment_explain: "ถอนฟันออก2เล่มก่อนจัดฟัน",
			
		}

		ok, err := govalidator.ValidateStruct(treatmentplan)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Order of treatment cannot be negative or too much"))
	})

	t.Run("Check Number of treatment cannot be negative or too much", func(t *testing.T) {
		treatmentplan := Treatment_plan{
			Order_of_treatment: 1,
			Number_of_treatment: -1,
			Treatment_detail: "ถอนฟันบนขวา 2 ซี่",
			Treatment_explain: "ถอนฟันออก2เล่มก่อนจัดฟัน",
			
		}

		ok, err := govalidator.ValidateStruct(treatmentplan)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Number of treatment cannot be negative or too much"))
	})

	t.Run("Check Treatment detail must consist of 6 or more characters", func(t *testing.T) {
		treatmentplan := Treatment_plan{
			Order_of_treatment: 1,
			Number_of_treatment: 1,
			Treatment_detail: "T",
			Treatment_explain: "ถอนฟันออก2เล่มก่อนจัดฟัน",
		}

		ok, err := govalidator.ValidateStruct(treatmentplan)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Treatment detail must consist of 6 or more characters"))
	})

	t.Run("Check Treatment detail cannot be blank", func(t *testing.T) {
		treatmentplan := Treatment_plan{
			Order_of_treatment: 1,
			Number_of_treatment: 1,
			Treatment_detail: "",
			Treatment_explain: "ถอนฟันออก2เล่มก่อนจัดฟัน",

		}

		ok, err := govalidator.ValidateStruct(treatmentplan)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Treatment detail cannot be blank"))
	})

	t.Run("Check Treatment explain cannot be blank", func(t *testing.T) {
		treatmentplan := Treatment_plan{
			Order_of_treatment: 1,
			Number_of_treatment: 1,
			Treatment_detail: "ถอนฟันบนขวา 2 ซี่",
			Treatment_explain: "",
			
		}

		ok, err := govalidator.ValidateStruct(treatmentplan)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Treatment explain cannot be blank"))
	})

	t.Run("Check Treatment explain must consist of 6 or more characters", func(t *testing.T) {
		treatmentplan := Treatment_plan{
			Order_of_treatment: 1,
			Number_of_treatment: 1,
			Treatment_detail: "ถอนฟันบนขวา 2 ซี่",
			Treatment_explain: "ถอน",
			
		}

		ok, err := govalidator.ValidateStruct(treatmentplan)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Treatment explain must consist of 6 or more characters"))
	})
	
}