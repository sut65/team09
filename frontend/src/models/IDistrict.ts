import { ProvinceInterface } from "./IProvince";
export interface DistrictInterface {
    ID: number,
    District_name: string,
    ProvinceID: number,
    Province?:    		ProvinceInterface,  
}