import { GenderInterface } from "./IGender";
import { SpecializedInterface } from "./ISpecialized";
import { UniversityInterface } from "./IUniversity";
import { RoleInterface } from "./IRole";
import { ProvinceInterface } from "./IProvince";

export interface DentistInterface {
    ID?:        		number,
	FirstName?:  		string,
    LastName?:  		string,
    Personal_id?:  		string, 
	Email?:     		string,
	Password?:			string,
    Age?:               number,
    Phone_Number?:      string,
    Date?:              Date | null,

	
	GenderID?:        	number,    
	Gender?:        	GenderInterface,
    SpecializedID?:     number,
    Specialized?:       SpecializedInterface,
    UniversityID?:      number,
    University?:        UniversityInterface, 
	RoleID?:	        number, 
	Role?: 		        RoleInterface, 
    ProvinceID?:    	number,
	Province?:    		ProvinceInterface,  
}