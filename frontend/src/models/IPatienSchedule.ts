import { ReasonInterface } from "./IReason";
import { EmployeeInterface } from "./IEmployee"
import { Type_of_treatments_Interface } from "./IType_of_treatment"
import { PatientInterface } from "./IPatient"

export interface PatienSceheduleInterface {
    ID?: number;
   
    PatientID?: number;
    Patient?:   PatientInterface;

    EmployeeID?: number;
	  Employee?:   EmployeeInterface ;

    ReasonID?: number;
    Reason?: ReasonInterface;

    Type_Of_TreatmentID?: number,
   	Type_Of_Treatment?:   Type_of_treatments_Interface;

    Date_time: Date | null;
    
  }