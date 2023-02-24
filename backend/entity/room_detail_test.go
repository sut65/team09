package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestAmount(t *testing.T) {
	g := NewGomegaWithT(t)
	n := Room_Detail{
		Note: "", 
		Amount: 1500,
		Date: time.Now(),
		
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(n)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาใส่จำนวนระหว่าง 1 - 1000"))
}

func TestNoteInrange_1_to_50(t *testing.T) {
	g := NewGomegaWithT(t)
	n := Room_Detail{
		Note: "1234567890 1234567890 1234567890 1234567890 1234567890", //ผิด
		Amount: 20,
		Date: time.Now(),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(n)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ห้ามพิมพ์เกิน 50 ตัวอักษร"))
}

func TestTime(t *testing.T) {
	g := NewGomegaWithT(t)
	n := Room_Detail{
		Note: "เพิ่มอุปกรณ์", //ผิด
		Amount: 30,
		Date: time.Now().Add(time.Hour * 4),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(n)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาใส่เวลาปัจจุบัน"))
}

