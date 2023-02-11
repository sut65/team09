package entity

import (
	"testing"
	"time"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestReasonMethodNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	ra := Reason{

		Method: "", //ผิด
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ra)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Method not blank"))
}

// ตรวจสอบ past and future
func TestWatchTimeMustBeInThePast(t *testing.T) {
	g := NewGomegaWithT(t)

	ps := Patien_schedule{
		Patien_Number: "0123456789",
		Date_time:     time.Now().Add(24 - time.Hour), //ผิด
	}
	ok, err := govalidator.ValidateStruct(ps)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Datetime must be a future date"))
}


func TestNumbermustbeInterger(t *testing.T) {
	g := NewGomegaWithT(t)

	
	
	
		ps := Patien_schedule{
			Patien_Number: "CX", //ผิด
			Date_time:     time.Now().Add(24 * time.Hour),
		}
		ok, err := govalidator.ValidateStruct(ps)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Number must be Interger and 10 number"))
	}

	func TestNumberCannotbeblank(t *testing.T) {
		g := NewGomegaWithT(t)
	
		
		
		
			ps := Patien_schedule{
				Patien_Number: "", //ผิด
				Date_time:     time.Now().Add(24 * time.Hour),
			}
			ok, err := govalidator.ValidateStruct(ps)
			g.Expect(ok).ToNot(BeTrue())
			g.Expect(err).ToNot(BeNil())
			g.Expect(err.Error()).To(Equal("Number cannot be blank"))
		}
