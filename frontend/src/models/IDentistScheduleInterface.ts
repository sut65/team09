import { WorkingdayInterface } from "./IWorkingday"; 
import { ResponsityInterface } from "./IResponsity"; 
import { DentistInterface } from "./IDentist";
import { Room_NumberInterface } from "./IRoom_Number";
export interface DentistSceheduleInterface {
    ID?: number;
   
    ResponsityID?: number;
    Responsity?: ResponsityInterface;

    WorkingdayID?: number;
    Workingday?: WorkingdayInterface;

    DentistID?: number;
	  Dentist?:   DentistInterface;

    Room_NumberID?: number;
  	Room_Number?: Room_NumberInterface;

    Job_description?: string | null;

    TimeWork: Date | null;
    TimeEnd: Date | null;
  }