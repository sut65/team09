import { PatientInterface } from "./IPatient";
import { EmployeeInterface } from "./IEmployee";
import { Payment_statusInterface } from "./IPayment_status";

export interface PaymentInterface {
    ID?: number,
    Total_price?: number,
    Note?: string,

    PatientID?: number,
    Patient?: PatientInterface,

    EmployeeID?: number,
    Employee?: EmployeeInterface,

    Payment_statusID?: number,
    Payment_status?: Payment_statusInterface,

    DateTimePayment?: Date | null,
}