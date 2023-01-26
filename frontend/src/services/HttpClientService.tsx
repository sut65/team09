import React from "react";

import { PatienSceheduleInterface } from "../models/IPatienSchedule";
import { EmployeeInterface } from "../models/IEmployee";
import {DentistSceheduleInterface} from "../models/IDentistScheduleInterface";
import { MedicalDeviceInterface } from "../models/IMedicaldevice";

const apiUrl = "http://localhost:3001";



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

async function GetDistrict() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/district`, requestOptions)
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
  

async function GetSubdistrict() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/subdistricts`, requestOptions)
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
          return res.data;
        } else {
          return false;
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
        return res.data;
      } else {
        return false;
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
  async function GetDayworks() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/dayworks`, requestOptions)
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
  async function GetDoctasks() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/doctasks`, requestOptions)
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
          return res.data;
        } else {
          return false;
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
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  export {
    GetPatientSchedules,
    GetDentistScehedules,
    GetDoctasks,
    DentistScehedules,
    GetReasons,
    PatientSchedules,
    GetRole,
    GetGender,
    GetProvince,
    GetDistrict,
    GetSubdistrict,
    GetEmployee,
    CreateEmployee,
    GetDayworks,
    GetType, 
    GetStatus,
    GetMedicalDevice,
    CreateMedicalDevice,
  };

