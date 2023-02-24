package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPayment(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check Total_price cannot be negative", func(t *testing.T) {
		Payment := Payment{
			Total_price:		-1,//false
			DateTimePayment:    time.Now(),//true
			Payment_code: 		"T9086458",//true
		}

		ok, err := govalidator.ValidateStruct(Payment)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("ราคารวมต้องเป็นเลขจำนวนเต็มบวก"))
	})

	t.Run("Check DateTimePayment must be a current date", func(t *testing.T) {
		Payment := Payment{
			Total_price:			1,//false
			DateTimePayment:    	time.Now().Add(time.Hour * 2),//false
			Payment_code: 			"T9086458",//true
		}

		ok, err := govalidator.ValidateStruct(Payment)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("เวลาต้องเป็นค่าปัจจุบัน"))
	})

	t.Run("Check payment_code code cannot be blank", func(t *testing.T) {
		Payment := Payment{
			Total_price:			1,//true
			DateTimePayment:   		time.Now(),//true
			Payment_code: 			"",//false
		}

		ok, err := govalidator.ValidateStruct(Payment)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("รหัสแจ้งยอดชำระห้ามใส่ค่าว่าง"))
	})


	t.Run("Check payment_code note must consist of 6 or more characters", func(t *testing.T) {
		Payment := Payment{
			Total_price:			1,//true
			DateTimePayment:   		time.Now(),//true
			Payment_code: 			"0222200",//false
		}

		ok, err := govalidator.ValidateStruct(Payment)

		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("รหัสแจ้งยอดชำระต้องขึ้นต้นด้วยตัว T และต่อด้วยเลขอีก 7 ตัว"))
	})

}
