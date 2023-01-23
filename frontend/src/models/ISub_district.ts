import { DistrictInterface } from "./IDistrict";
export interface Sub_districtInterface {
    ID: number,
    Sub_district_name: string,
    DistrictID: number,
    District?:  DistrictInterface,  
}