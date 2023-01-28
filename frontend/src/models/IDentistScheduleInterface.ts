import { DayworkInterface } from "./IDaywork";
import { DoctaskInterface } from "./IDoctask";
import { DentistInterface } from "./IDentist";
export interface DentistSceheduleInterface {
    ID?: number;
   
    ResponID?: number;
    Respon?: DoctaskInterface;

    DayID?: number;
    Day?: DayworkInterface;

    DentistID?: number;
	  Dentist?:   DentistInterface;

    TimeWork: Date | null;
    TimeEnd: Date | null;
  }