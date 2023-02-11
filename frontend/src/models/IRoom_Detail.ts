import { Room_NumberInterface } from "./IRoom_Number";
import { CategoryInterface } from "./ICategory";
import { MedicalDeviceInterface } from "./IMedicaldevice";

export interface Room_DetailInterface {
    ID?: number,
    
    Room_NumberID?:        	number,    
	Room_number?:        	Room_NumberInterface,
    CategoryID?:            number,
    Category_Name?:         CategoryInterface,
    MedicalDeviceID?:       number,
    Device_Name?:           MedicalDeviceInterface,
}