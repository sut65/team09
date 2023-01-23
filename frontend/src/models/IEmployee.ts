import { Sub_districtInterface } from "./ISub_district";
import { GenderInterface } from "./IGender";
import { RoleInterface } from "./IRole";
export interface EmployeeInterface {
    ID?:        		number,
    Employee_number:    string,
	Employee_name?:     string,
	Personal_id ?:      number,
	Password?:			string,
    Phone?:             number,
	RoleID?:    	    number,
	Role?:    		    RoleInterface,  
	GenderID?:        	number,    
	Gender?:        	GenderInterface,       
	Sub_districtID?:	number, 
	Sub_district?: 		Sub_districtInterface, 
}