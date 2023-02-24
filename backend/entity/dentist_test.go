package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestFirstNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	fn := Dentist{
		FirstName: "", //ผิด
		LastName:  "DDD",
		Personal_id: "1267453897342",
		Email:     "ss@gmail.com",
		Password:  "3fdww",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(fn)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("FirstName cannot be blank"))
}

func TestLastNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	ln := Dentist{
		FirstName: "rdss", 
		LastName:  "", //ผิด
		Personal_id: "1267453897342",
		Email:     "ss@gmail.com",
		Password:  "3fdww",
	}
	ok, err := govalidator.ValidateStruct(ln)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("LastName cannot be blank"))
}

func TestPasswordNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	pass := Dentist{
		FirstName: "rdss", 
		LastName:  "dssa", 
		Personal_id: "1267453897342",
		Email:     "ss@gmail.com",
		Password:  "",//ผิด
	}
	ok, err := govalidator.ValidateStruct(pass)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Password cannot be blank"))
}

func TestAgeRangeBetween_0_to_100(t *testing.T) {
	g := NewGomegaWithT(t)

	pass := Dentist{
		FirstName: "esaw",
		LastName:  "jpkok",
		Personal_id: "1267453897342",
		Email:     "ss@gmail.com",
		Password:  "fdgfgd",
		Age:       101, //ผิด
		
	}
	ok, err := govalidator.ValidateStruct(pass)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Age is not in range 10 to 100"))
}

func TestEmail(t *testing.T) {
	g := NewGomegaWithT(t)

	email := Dentist{
		FirstName:   "esaw",
		LastName:    "jpkok",
		Password:    "fdgfgd",
		Age:         55,
		Personal_id: "1242848362743",
		Email:       "ss@fr", //ผิด
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
		Password:    "fdgfgd",
		Age:         34,
		Email:       "ss@gmail.com",
		Personal_id: "", //ผิด
	}
	ok, err := govalidator.ValidateStruct(pid)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Personal_id cannot be blank"))
}
