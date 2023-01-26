import { EmployeeInterface } from "./IEmployee";
import { TypeInterface } from "./IType";
import { StatusInterface } from "./IStatus";

export interface MedicalDeviceInterface{
    ID?: number,
    Employee?: string,
    EmployeeID?: EmployeeInterface,

    Type?: TypeInterface,
    TypeID?: number,

    Status?: StatusInterface
    StatusID?: number,

    Device_Name?: string,
    Amount?: number,
    Date?: Date
}