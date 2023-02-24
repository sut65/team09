package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestFirstNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	fn := Dentist{
		FirstName:   "", //ผิด
		LastName:    "DDD",
		Personal_id: "1267453897342",
		Email:       "ss@gmail.com",
		Password:    "3fdwwvfxs",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(fn)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อ"))
}

func TestLastNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	ln := Dentist{
		FirstName:   "rdss",
		LastName:    "", //ผิด
		Personal_id: "1267453897342",
		Email:       "ss@gmail.com",
		Password:    "3fdwwvfdv",
		Date:        time.Now(),
	}
	ok, err := govalidator.ValidateStruct(ln)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกนามสกุล"))
}

func TestPasswordNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	pass := Dentist{
		FirstName:   "rdss",
		LastName:    "dssa",
		Personal_id: "1267453897342",
		Email:       "ss@gmail.com",
		Password:    "dsd23", //ผิด
		Date:        time.Now(),
	}
	ok, err := govalidator.ValidateStruct(pass)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร"))
}

func TestAgeRangeBetween_0_to_100(t *testing.T) {
	g := NewGomegaWithT(t)

	pass := Dentist{
		FirstName:   "esaw",
		LastName:    "jpkok",
		Personal_id: "1267453897342",
		Email:       "ss@gmail.com",
		Password:    "fdgfgdvfdc",
		Age:         101, //ผิด
		Date:        time.Now(),
	}
	ok, err := govalidator.ValidateStruct(pass)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกอายุระหว่าง 10 - 100"))
}

func TestEmail(t *testing.T) {
	g := NewGomegaWithT(t)

	email := Dentist{
		FirstName:   "esaw",
		LastName:    "jpkok",
		Password:    "fdgfgdgbfs334",
		Age:         55,
		Personal_id: "1242848362743",
		Email:       "ss@fr", //ผิด
		Date:        time.Now(),
	}
	ok, err := govalidator.ValidateStruct(email)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("รูปแบบ Email ไม่ถูกต้อง"))
}

func TestPersonal_id(t *testing.T) {
	g := NewGomegaWithT(t)

	pid := Dentist{
		FirstName:   "esaw",
		LastName:    "jpkok",
		Password:    "fdgfgdh5434",
		Age:         34,
		Email:       "ss@gmail.com",
		Personal_id: "", //ผิด
		Date:        time.Now(),
	}
	ok, err := govalidator.ValidateStruct(pid)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกบัตรประจำตัวประชาขน"))
}

func TestDate(t *testing.T) {
	g := NewGomegaWithT(t)

	pid := Dentist{
		FirstName:   "esaw",
		LastName:    "jpkok",
		Password:    "fdgfgdh5434",
		Age:         34,
		Email:       "ss@gmail.com",
		Personal_id: "123543574722",
		Date:        time.Now().Add(time.Hour * 4), //ผิด
	}
	ok, err := govalidator.ValidateStruct(pid)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณาใส่เวลาปัจจุบัน"))
}
