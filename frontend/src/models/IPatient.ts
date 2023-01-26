import { Sub_districtInterface } from "./ISub_district";
import { GenderInterface } from "./IGender";
import { SymptomInterface } from "./ISymptom";
import { ProvinceInterface } from "./IProvince";
import { DistrictInterface } from "./IDistrict";
import { EmployeeInterface } from "./IEmployee";
export interface PatientInterface {
    ID?:        		number,
	FirstName?:         string,
	LastName?:          string,
	Personal_id ?:      string,
    Old?:               number,
    Weight?:            number,
    Height?:            number,
    Underlying_disease?: string,
	Drug_alergy?:       string,
	House_no?:          string,
	SymptomID?:    	    number,
	Symptom?:    		SymptomInterface,  
	GenderID?:        	number,    
	Gender?:        	GenderInterface,  
	ProvinceID?: 		number,
	Province?:          ProvinceInterface,
	DistrictID?:        number,
	District?:          DistrictInterface,   
	Sub_districtID?:	number, 
	Sub_district?: 		Sub_districtInterface, 
    EmployeeID? : number;
    Employee? : EmployeeInterface;
}