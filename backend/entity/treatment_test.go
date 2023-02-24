package entity

import (
	"fmt"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"testing"
	"time"
	//"gorm.io/gorm"
)

func TestTreatment(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check Other teeth problems cannot be blank", func(t *testing.T) {
		treatment := Treatment{
			Number_of_cavities:     1,
			Number_of_swollen_gums: 1,
			Other_teeth_problems:   "",
			Number_of_treatment:    1,
			Treatment_detail:       "ถอนฟันบนขวา 2 ซี่",
			//Treatment_time: time.Now().Add(24 * time.Hour),
			Treatment_code: "T9086458",
		}

		ok, err := govalidator.ValidateStruct(treatment)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("ปัญหาฟันอื่นๆไม่สามารถเป็นค่าว่างได้"))
	})

	t.Run("Check Treatment detail cannot be blank", func(t *testing.T) {
		treatment := Treatment{
			Number_of_cavities:     1,
			Number_of_swollen_gums: 1,
			Other_teeth_problems:   "มีหินปูน",
			Number_of_treatment:    1,
			Treatment_detail:       "",
			//Treatment_time: time.Now().Add(24 * time.Hour),
			Treatment_code: "T9086458",
		}

		ok, err := govalidator.ValidateStruct(treatment)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("รายละเอียดการรักษาไม่สามารถเป็นค่าว่างได้"))
	})

	t.Run("Check Treatment detail must consist of 6 or more characters", func(t *testing.T) {
		treatment := Treatment{
			Number_of_cavities:     1,
			Number_of_swollen_gums: 1,
			Other_teeth_problems:   "มีหินปูน",
			Number_of_treatment:    1,
			Treatment_detail:       "t",
			//Treatment_time: time.Now().Add(24 * time.Hour),
			Treatment_code: "T9086458",
		}

		ok, err := govalidator.ValidateStruct(treatment)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("รายละเอียดการรักษาจะต้องมีอย่างน้อย 6 ตัวอักษรหรือมากกว่า"))
	})

	t.Run("Check Treatment code cannot be blank", func(t *testing.T) {
		treatment := Treatment{
			Number_of_cavities:     1,
			Number_of_swollen_gums: 1,
			Other_teeth_problems:   "มีหินปูน",
			Number_of_treatment:    1,
			Treatment_detail:       "ถอนฟันบนขวา 2 ซี่",
			//Treatment_time: time.Now().Add(24 * time.Hour),
			Treatment_code: "",
		}

		ok, err := govalidator.ValidateStruct(treatment)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("รหัสการรักษาไม่สามารถเป็นค่าว่างได้"))
	})

	t.Run("Check Treatment code cannot be blank", func(t *testing.T) {
		fixtures := []string{
			"O6000000",
			"kl798/8",
			"h4894",
			"y48948",
		}

		for _, fixture := range fixtures {
			treatment := Treatment{
				Number_of_cavities:     1,
				Number_of_swollen_gums: 1,
				Other_teeth_problems:   "มีหินปูน",
				Number_of_treatment:    1,
				Treatment_detail:       "tiouygy",
				//Treatment_time: time.Now().Add(24 * time.Hour),
				Treatment_code: fixture,
			}

			ok, err := govalidator.ValidateStruct(treatment)

			// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
			g.Expect(ok).ToNot(BeTrue())

			// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
			g.Expect(err).ToNot(BeNil())

			// err.Error ต้องมี error message แสดงออกมา
			g.Expect(err.Error()).To(Equal(fmt.Sprintf(`รหัสการรักษาจะต้องขึ้นต้นด้วย T ตามด้วยตัวเลข 7 ตัว`)))
		}
	})

	t.Run("Check Number of cavities cannot be negative or too much", func(t *testing.T) {
		treatment := Treatment{
			Number_of_cavities:     -1,
			Number_of_swollen_gums: 1,
			Other_teeth_problems:   "มีหินปูน",
			Number_of_treatment:    1,
			Treatment_detail:       "ถอนฟันบนขวา 2 ซี่",
			//Treatment_time: time.Now().Add(24 * time.Hour),
			Treatment_code: "T9086458",
		}

		ok, err := govalidator.ValidateStruct(treatment)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("จำนวนฟันผุจะต้องไม่เป็นลบหรือมากเกินไป"))
	})

	t.Run("Check Number of swollen gums cannot be negative or too much", func(t *testing.T) {
		treatment := Treatment{
			Number_of_cavities:     1,
			Number_of_swollen_gums: -1,
			Other_teeth_problems:   "มีหินปูน",
			Number_of_treatment:    1,
			Treatment_detail:       "ถอนฟันบนขวา 2 ซี่",
			//Treatment_time: time.Now().Add(24 * time.Hour),
			Treatment_code: "T9086458",
		}

		ok, err := govalidator.ValidateStruct(treatment)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("จำนวนเหงือกบวมจะต้องไม่เป็นลบหรือมากเกินไป"))
	})

	t.Run("Check Number of treatment cannot be negative or too much", func(t *testing.T) {
		treatment := Treatment{
			Number_of_cavities:     1,
			Number_of_swollen_gums: 1,
			Other_teeth_problems:   "มีหินปูน",
			Number_of_treatment:    -1,
			Treatment_detail:       "ถอนฟันบนขวา 2 ซี่",
			//Treatment_time: time.Now().Add(24 * time.Hour),
			Treatment_code: "T9086458",
		}

		ok, err := govalidator.ValidateStruct(treatment)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("จำนวนการรักษาจะต้องไม่เป็นลบหรือมากเกินไป"))
	})

	t.Run("Check Treatment time must be a past date", func(t *testing.T) {
		treatment := Treatment{
			Number_of_cavities:     1,
			Number_of_swollen_gums: 1,
			Other_teeth_problems:   "มีหินปูน",
			Number_of_treatment:    1,
			Treatment_detail:       "ถอนฟันบนขวา 2 ซี่",
			Treatment_time:         time.Now().Add(24 * time.Hour),
			Treatment_code:         "T9086458",
		}

		ok, err := govalidator.ValidateStruct(treatment)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("เวลาการรักษาจะต้องเป็นอดีต"))
	})

}
