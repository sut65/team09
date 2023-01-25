import { Sub_districtInterface } from "./ISub_district";
import { GenderInterface } from "./IGender";
import { RoleInterface } from "./IRole";
import { ProvinceInterface } from "./IProvince";
import { DistrictInterface } from "./IDistrict";
export interface EmployeeInterface {
    ID?:        		number,
    Employee_number?:    string,
	FirstName?:          string,
	LastName?:           string,
	Personal_id ?:      string,
	Password?:			string,
    Phone?:             string,
	House_no?:           string,
	RoleID?:    	    number,
	Role?:    		    RoleInterface,  
	GenderID?:        	number,    
	Gender?:        	GenderInterface,  
	ProvinceID?: 		number,
	Province?:          ProvinceInterface,
	DistrictID?:        number,
	District?:          DistrictInterface,   
	Sub_districtID?:	number, 
	Sub_district?: 		Sub_districtInterface, 
}