import { DentistInterface } from "./IDentist"; 
import { PatientInterface } from "./IPatient"; 
import { Type_of_treatments_Interface } from "./IType_of_treatment"; 
import { Type_of_number_of_treatment_Interface } from "./IType_of_number_of_treatment"; 

export interface TreatmentsPlanInterface {
    ID?: number;
  
    DentistID?:  number;
	Dentist?:  DentistInterface
 
	PatientID?:  number;  
	Patient?:    PatientInterface 
 
    order_of_treatment?: number;  

	Type_Of_TreatmentID?:  number;
	Type_Of_Treatment?:    Type_of_treatments_Interface 

    number_of_treatment?:  number;

    Type_Of_Number_Of_TreatmentID?:  number;
	Type_Of_Number_Of_Treatment?:    Type_of_number_of_treatment_Interface

    treatment_detail?: string;

    treatment_explain?: string;

    Treatment_time?: Date | null;
 
}