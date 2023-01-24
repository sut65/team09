import { ReasonInterface } from "./IReason";

export interface PatienSceheduleInterface {
    ID?: number;
   
    ReasonID?: number;
    Reason?: ReasonInterface;
    
  }