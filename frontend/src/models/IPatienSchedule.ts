import { ReasonInterface } from "./IReason";
import { EmployeeInterface } from "./IEmployee"
import { Type_of_treatments_Interface } from "./IType_of_treatment"
import { PatientInterface } from "./IPatient"
import { Room_NumberInterface } from "./IRoom_Number";

export interface PatienSceheduleInterface {
    ID?: number;
       
    PatientID?: number;
    Patient?:   PatientInterface;

    EmployeeID?: number; 
	  Employee?:   EmployeeInterface ;

    ReasonID?: number;
    Reason?: ReasonInterface;

    
    Room_NumberID?: number;
  	Room_Number?: Room_NumberInterface;

    Type_Of_TreatmentID?: number,
   	Type_Of_Treatment?:   Type_of_treatments_Interface;

    Patien_Number: string | null;

    Date_time: Date | null;
    
  }