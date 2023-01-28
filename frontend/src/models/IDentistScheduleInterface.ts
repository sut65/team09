import { WorkingdayInterface } from "./IWorkingday"; 
import { ResponsityInterface } from "./IResponsity"; 
import { DentistInterface } from "./IDentist";
export interface DentistSceheduleInterface {
    ID?: number;
   
    ResponsityID?: number;
    Responsity?: ResponsityInterface;

    WorkingdayID?: number;
    Workingday?: WorkingdayInterface;

    DentistID?: number;
	  Dentist?:   DentistInterface;

    TimeWork: Date | null;
    TimeEnd: Date | null;
  }