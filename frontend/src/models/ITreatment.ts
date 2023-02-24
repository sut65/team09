import { DentistInterface } from "./IDentist";
import { PatientInterface } from "./IPatient";
import { Type_of_treatments_Interface } from "./IType_of_treatment"; 
import { Type_of_number_of_treatment_Interface } from "./IType_of_number_of_treatment"; 

export interface TreatmentsInterface {

    ID?: number; 
  
    DentistID?:  number;
	Dentist?:  DentistInterface 
 
	PatientID?:  number;
	Patient?:    PatientInterface 

	number_of_cavities?:  number;

	number_of_swollen_gums?:  number;

	other_teeth_problems?:  string;
 
	Type_of_treatmentsID?:  number;
	Type_of_treatments?:    Type_of_treatments_Interface 
  
	number_of_treatment?:  number;

	Type_Of_Number_Of_TreatmentID?:  number;
	Type_Of_Number_Of_Treatment?:    Type_of_number_of_treatment_Interface
		
	treatment_detail?: string;

	Treatment_time?: Date | null;

	treatment_code?: string;

	price?:  number;

    
 
    



}