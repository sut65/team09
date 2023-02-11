package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestNoteNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	n := Room_Detail{
		Note: "", //ผิด
		
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(n)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("หมายเหตุห้ามเป็นช่องว่าง"))
}

func TestNoteInrange_1_to_50(t *testing.T) {
	g := NewGomegaWithT(t)
	n := Room_Detail{
		Note: "1234567890 1234567890 1234567890 1234567890 1234567890", //ผิด
		
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

