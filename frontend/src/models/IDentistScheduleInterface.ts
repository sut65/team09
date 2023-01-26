import { DayworkInterface } from "./IDaywork";
import { DoctaskInterface } from "./IDoctask";
export interface DentistSceheduleInterface {
    ID?: number;
   
    ResponID?: number;
    Respon?: DoctaskInterface;

    DayID?: number;
    Day?: DayworkInterface;
    
  }