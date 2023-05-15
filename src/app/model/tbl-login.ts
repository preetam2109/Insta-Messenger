import { Role } from "./role";


// #region Insta Messanger

export enum tbl_roles{
  Admin='Admin',
  Operator='Operator',
  App_Admin='App Admin',
  Super_Admin='Super Admin',
}


export class tbl_company {                                                                   
  company_id: number | undefined;
  name:string | undefined;
  mobile: number | undefined;
  email: string | undefined;
  address: string | undefined;
  city: string | undefined;
  state: string | undefined;
  status: number | undefined;
  photo: string | undefined;
  create_by: number | undefined;
  create_date:  Date | undefined;
  update_by: number | undefined;
  update_date: Date | undefined;
}

export class tbl_login{
  
  
  mobile:number |undefined;
  user_id:number |undefined;
  company_id:number|undefined;
  email:string|undefined;
  password:string |undefined;
  name:string|undefined;
  salt:string|undefined;
  role_id:number |undefined;
  status:number |undefined;
  create_date:  Date | undefined;
  default_language_id: number | undefined;
  logged_in_time:  Date | undefined;
  logged_out_time:  Date | undefined;
  photo:string|undefined;
  create_by: number | undefined;
  update_by: number | undefined;
  update_date:  Date | undefined;
  address:string|undefined;
  city:string|undefined;
  state:string|undefined;
  source_app:string|undefined;
  otp:number|undefined;
  
}

export class md_company_reg
  {
       tbl_company: tbl_company | undefined;
       tbl_login: tbl_login | undefined
          }


// #endregion







// export class tbl_login {
//   mobile: number | undefined;
//   id : number | undefined;
//   user_id : number | undefined;
//   restaurant_id : number | undefined;
//   email :string | undefined
//   password :string | undefined
//   name : string | undefined;
//   salt : string | undefined;
//   role_id : number | undefined;
//   status : number | undefined;
//   create_date : Date | undefined;
//   default_language_id :number = 1;
//   logged_in_time :Date | undefined;
//   logged_out_time :Date | undefined;
//   photo : string | undefined;
// }
export class tbl_validateotp {
  otp: number | undefined;
  otp1: number | undefined;
  otp2: number | undefined;
  otp3: number | undefined;
  otp4: number | undefined;
  otp5: number | undefined;
  otp6: number | undefined;
}

export interface tbl_varifyied_response {
  status: string | undefined;
  token: string | undefined;
  expiration: Date | undefined;
  name: string | undefined;
  photo: string | undefined;
  role: Role;
  rolrestaurant_detailse: string | undefined;
}




