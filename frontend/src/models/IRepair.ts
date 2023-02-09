import { EmployeeInterface } from "./IEmployee";
import { MedicalDeviceInterface } from "./IMedicaldevice";
import { DamageLevelInterface } from "./IDamageLevel";

export interface RepairInterface{
    ID?: number,

    Employee?: EmployeeInterface,
    EmployeeID?: number,

    MedicalDevice?: MedicalDeviceInterface,
    MedicalDeviceID?: number,

    DamageLevel?: DamageLevelInterface,
    DamageLevelID?: number,

    Repair_Note?: string,
    Date_Of_Repair?: Date | null,
}