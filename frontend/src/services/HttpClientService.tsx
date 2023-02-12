import React from "react";

import { PatienSceheduleInterface } from "../models/IPatienSchedule";
import { EmployeeInterface } from "../models/IEmployee";
import {DentistSceheduleInterface} from "../models/IDentistScheduleInterface";
import { MedicalDeviceInterface } from "../models/IMedicaldevice";
import { PatientInterface } from "../models/IPatient";
import { DentistInterface } from "../models/IDentist";
import { Room_DetailInterface } from "../models/IRoom_Detail";
import { PrescriptionInterface } from "../models/IPrescription";
import { RepairInterface } from "../models/IRepair";
import { PaymentInterface } from "../models/IPayment";

const apiUrl = "http://localhost:8080";



// async function Login(data: SigninInterface) {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   };

//   let res = await fetch(`${apiUrl}/login_employee`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.data) {
//         console.log(res.data);
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("uid", res.data.id);
//         // เก็บข้อมูล position ที่ login เข้ามา
//         localStorage.setItem("position", res.data.position);
//         // เก็บข้อมูล position ที่ login เข้ามา
//         localStorage.setItem("role", res.data.role);
//         return res.data;
//       } else {
//         return false;
//       }
//     });

//   return res;
// }

// async function LoginStudent(data: SigninInterface) {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   };

//   let res = await fetch(`${apiUrl}/login_student`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.data) {
//         console.log(res.data);
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("uid", res.data.id);
//         // เก็บข้อมูล position ที่ login เข้ามา
//         localStorage.setItem("position", res.data.position);
//         // เก็บข้อมูล position ที่ login เข้ามา
//         localStorage.setItem("role", res.data.role);
//         return res.data;
//       } else {
//         return false;
//       }
//     });

//   return res;
// }

//---------------- patient -----------------
//------------------------------------------
async function GetSymptom() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/symptoms`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreatePatient(data: PatientInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/patients`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function GetPatient() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/patients`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

  //*get token by ID
async function GetEmployeeByUID() {
  let uid = localStorage.getItem("uid");
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/employee/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

// --------------------------------Employee--------------------------------------
// ---------------------------------------------------------------------------------
async function GetRole() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/roles`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetGender() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/genders`, requestOptions)  
    .then((response) => response.json()) 
    .then((res) => {   
      if (res.data) { 
        return res.data;
      } else {
        return false;
      }
    });
  
  return res;
}

async function GetProvince() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/provinces`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}  

// async function GetDistrict() {
//   let uid = localStorage.getItem("provinceId");
//   const requestOptions = {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//   };

//   let res = await fetch(`${apiUrl}/district/${uid}`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.data) {
//         return res.data;
//       } else {
//         return false;
//       }
//     });

//   return res;
// }

  

// async function GetSubdistrict() {
//   let uid = localStorage.getItem("districtId");
//   const requestOptions = {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//   };

//   let res = await fetch(`${apiUrl}/subdistrict/${uid}`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.data) {
//         return res.data;
//       } else {
//         return false;
//       }
//     });

//   return res;
// }

async function GetEmployee() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/employees`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

  async function CreateEmployee(data: EmployeeInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/employees`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });

    return res;
  }


// //*get token by ID
// async function GetEmployeeByUID() {
//   let uid = localStorage.getItem("uid");
//   const requestOptions = {
//       method: "GET",
//       headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json"
//       },
//   };

//   let res = await fetch(`${apiUrl}/employee/${uid}`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//           if (res.data) {
//               console.log(res.data);
//               return res.data;
//           } else {
//               return false;
//           }
//       });

//   return res;
// }

// --------------------------------------------------------------

//------MedicalDevice-------
async function GetType() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/types`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetStatus() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/statuses`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetMedicalDevice() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/medicaldevices`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreateMedicalDevice(data: MedicalDeviceInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/medicaldevices`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}
//--------------------------------------------------------------------

async function GetPatientSchedules() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/patien_schedules`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetDentistScehedules() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/dentist_schedules`, requestOptions)
  .then((response) => response.json())
  .then((res) => {
    if (res.data) {
      return res.data;
    } else {
      return false;
    }
  });

return res;
}

async function GetReasons() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/reasons`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }
  async function GetWorkingdays() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/workingdays`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }
  async function GetResponsitys() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/responsitys`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }


  async function DentistScehedules(data: DentistSceheduleInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/dentist_schedules`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          console.log(res)
           return { status: false, message: res.error };
        }
      });
  
    return res;
  }

  
  async function PatientSchedules(data: PatienSceheduleInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/patien_schedules`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          console.log(res)
          if(res.Patien_schedule === 'Datetime must be a future date'){
            return {status: false, message: "Date time must be future"};
          }else if(res.Patien_schedule === 'Number must be Interger and 10 number'){
            return {status: false, message: res.Patien_schedule};
          }
           
           else{ return { status: false, message: res.error }};
        }
      });
  
    return res;
  }
  async function PatientSchedulesUpdate(data: PatienSceheduleInterface,) {
    const requestOptions = {
      method: "PATCH",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
  };
  
    let res = await fetch(`${apiUrl}/patien_schedules/:id`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      
        if (res.data) {
          console.log(res)
           return{status: true, message: res.data};
        } else {
            return{status: false, message: res.error};
        }
    });
  
    return res;
  }

  //---------------------treatment---------------------//
  async function GetTreatment() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/treatments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function CreateTreatment(data: PatienSceheduleInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/treatments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  //-------------Type of treatment------------//
  async function GetTypeOfTreatment() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/type_of_treatments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function CreateTypeOfTreatment(data: PatienSceheduleInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/type_of_treatments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  //------------Type of number of treatment-----------------//
  async function GetTypeOfNumberOfTreatment() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/type_of_number_of_treatments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function CreateTypeOfNumberOfTreatment(data: PatienSceheduleInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/type_of_number_of_treatments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  //------------------------------------------------------------------------
  //--------------------------Dentist---------------------------------------
  async function GetSpecializeds() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/specializeds`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function GetUniversitys() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/universitys`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function GetDentists() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/dentists`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          // console.log(res.data)
          return res.data;
        } else {
          // console.log(res.data)
          return false;
        }
      });
  
    return res;
  }

  async function CreateDentists(data: DentistInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/dentists`, requestOptions)
      .then((response) => response.json())
      .then((res) => { 
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });
  
    return res;
  }


  async function UpdateDentists(data: DentistInterface) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/dentists/:id`, requestOptions)
      .then((response) => response.json())
      .then((res) => { 
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });
  
    return res;
  }

  //-----------------------------------Room_Detail--------------------------------
  async function GetRoom_Number() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/room_numbers`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function GetRoom_Detail() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/room_details`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function CreateRoom_Details(data: Room_DetailInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/room_details`, requestOptions)
      .then((response) => response.json())
      .then((res) => { 
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });
  
    return res;
  }



  async function GetCategory() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/categories`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function GetMedicine() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/medicines`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function GetMedicine_status() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/medicine_statuses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function CreatePrescription(data: PrescriptionInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/prescriptions`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
      });
  
    return res;
  }

  async function GetPrescription() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/prescriptions`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function GetPayment_status() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/payment_statuses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function CreatePayment(data: PaymentInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/payments`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
      });
  
    return res;
  }

  async function GetPayment() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/payments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  //-------------Repair------------------------
  async function GetDamageLevel() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/damagelevels`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }
  
  async function GetRepair() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/repairs`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }
  
  async function CreateRepair(data: RepairInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/repairs`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });
  
    return res;
  }

  async function DentistSchedulesUpdate(data: DentistSceheduleInterface,) {
    const requestOptions = {
      method: "PATCH",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
  };
  
    let res = await fetch(`${apiUrl}/dentist_schedules/:id`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      
        if (res.data) {
          console.log(res)
           return{status: true, message: res.data};
        } else {
            return{status: false, message: res.error};
        }
    });
  
    return res;
  }

  export {
    GetPatientSchedules,
    GetDentistScehedules,
    GetWorkingdays,
    DentistScehedules,

    PatientSchedulesUpdate,
    GetReasons,
    PatientSchedules,
    GetRole,
    GetGender,
    GetProvince,
    // GetDistrict,
    // GetSubdistrict,
    GetEmployee,
    CreateEmployee,

    GetResponsitys,
    GetType, 
    GetStatus,
    GetMedicalDevice,
    CreateMedicalDevice,
    GetPatient,
    CreatePatient,

    GetEmployeeByUID,
    GetSymptom,
    GetTreatment,
    CreateTreatment,

    GetTypeOfTreatment,
    CreateTypeOfTreatment,
    GetTypeOfNumberOfTreatment,
    CreateTypeOfNumberOfTreatment,

    GetSpecializeds,
    GetUniversitys,
    GetDentists,
    CreateDentists,
    UpdateDentists,

    GetRoom_Number,
    GetCategory,
    GetRoom_Detail,
    CreateRoom_Details,

    GetMedicine,
    GetMedicine_status,
    GetPrescription,
    CreatePrescription,

    GetPayment_status,
    GetPayment,
    CreatePayment,

    GetDamageLevel,
    GetRepair,
    CreateRepair,

    DentistSchedulesUpdate,
  };

