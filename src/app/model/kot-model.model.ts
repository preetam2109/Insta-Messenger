export class KotModel {
    restaurant_id: number | undefined;
    restaurant_name: string | undefined;
    address: string | undefined;
   
    logo: string | undefined;
    bg_image: string | undefined;
    delivery_time: string | undefined;
    restaurant_type: string | undefined;
    service_charge: number | undefined;
    delivery_fee: number | undefined;
    discount_percent: number | undefined;
    coupon: number | undefined;
    coupon_code: string | undefined;
    coupon_percent: number | undefined;
    coupon_status: number | undefined;
    open_time: string | undefined;
    close_at: string | undefined;
    is_closed: number | undefined;
    total_review: number | undefined;
    rating: number | undefined;
    promotion_rank: number | undefined;
    total_order: number | undefined;
    cgst: number | undefined;
    sgst: number | undefined;




}
export class dine_in_tables {
        table_id: number | undefined;
        table_name: string| undefined;;
        capacity: number| undefined;
        description: string| undefined;
        floor_number:number| undefined;
        section:number| undefined;

}
export class dine_in_tables_orders {
    order_id:number|undefined;
    total_guest:number|undefined;
    status:number|undefined;
    grand_total_price:number|undefined;
    total_time:Date|undefined;
    create_by:number|undefined;
}

export class profile{
    mobile:number|undefined;
      user_id:number|undefined;
      email:string|undefined;
      name:string|undefined;
        role_id:number|undefined;
        status:number|undefined;
      photo:string|undefined;
}
export class change_password_data{
  email!:string;
  password!:string;
  confirm_password!:string;
  otp!:string;
  otP_for!:string;
  old_password!:string;
  user_id:number=0;
}
 

export class get_otp_profile{
email!: string;
password!: string;
confirm_password!: string;
otp!: string;
otP_for!: string;
old_password!: string;
user_id!: number;
}