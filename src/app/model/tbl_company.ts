import { tbl_roles } from "./tbl_roles";
export class tbl_company {
    company_id: number | undefined;
    name:string | undefined;
    mobile: number | undefined;
    email: string | undefined;
    address: string | undefined;
    city: string | undefined;
    state: string | undefined;
    create_by: number | undefined;
    create_date:  Date | undefined;
    update_by: number | undefined;
    update_date: Date | undefined;
    status: number | undefined;
    photo: string | undefined;
}
export class tbl_login{
    
    user_id:number |undefined;
    mobile:number |undefined;
    name:string|undefined;
    email:string|undefined;
    password:number |undefined;
    salt:string|undefined;
    role_id:number |undefined;
    address:string|undefined;
    city:string|undefined;
    state:string|undefined;
    status:number |undefined;
    photo:string|undefined;
    default_language_id: number | undefined;
    logged_in_time:  Date | undefined;
    logged_out_time:  Date | undefined;
    create_by: number | undefined;
    create_date:  Date | undefined;
    update_by: number | undefined;
    update_date:  Date | undefined;
    otp:number | undefined;
    
}

export class md_company_reg
    {
         tbl_company: tbl_company | undefined;
         tbl_login: tbl_login | undefined
    }
