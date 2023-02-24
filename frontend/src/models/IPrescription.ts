import { PatientInterface } from "./IPatient";
import { DentistInterface } from "./IDentist";
import { MedicineInterface } from "./IMedicine";
// import { Medicine_statusInterface } from "./IMedicine_status";

export interface PrescriptionInterface {
    ID?: number,

    PatientID?: number,
    Patient?: PatientInterface,

    DentistID?: number,
    Dentist?: DentistInterface,

    MedicineID?: number,
    Medicine?: MedicineInterface,

    Qty?: number,
	Details?: string,
    Prescription_code?: string,
    DateTimePrescription?: Date | null,
}