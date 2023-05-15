export class tbl_order {
    push(): never[] {
      throw new Error('Method not implemented.');
    }
    order_id: number | undefined;
    id: string | undefined;
    user_id: number | undefined;
    restaurant_id: number | undefined;
    order_type: number | undefined;
    order_from_date: Date | undefined;
    order_to_date: Date | undefined;
    sub_total_price: number=0;
    cgst!: number;
    sgst!: number;
    offer_code: string = "string";
    coupon_amount: number | undefined;
    offer_discount: number = 0;
    offer_type: number = 0;
    grand_total_price: number | undefined;
    description: string | undefined;
    total_guest: number = 0;
    delivery_type: number = 0;
    payment_method!: string;
    payment_status: number = 0;
    create_date:string = "2022-06 - 28T05: 54: 48.240Z"; 
    create_by :number= 0;
    update_date:string= "2022 - 06 - 28T05: 54: 48.240Z";
    update_by:number= 0;
    status:number | undefined;
    coupon_code: string | undefined;
    coupon_percent: number | undefined;
    discount_type: number | undefined;
    discount: number | undefined;
    service_charge: number | undefined;
    special_offer_id: number | undefined;
    table_number: string | undefined;
    delivery_address_id!:number;
  }
  export class tbl_order1 {
    static sub_total_price: number;
    push(): never[] {
      throw new Error('Method not implemented.');
    }
    public order_id: number | undefined;
    public id: string | undefined;
    public user_id: number | undefined;
    public restaurant_id: number | undefined;
    public order_type: number =4;
    public order_from_date: Date | undefined;
    public order_to_date: Date | undefined;
    public sub_total_price: number=0;
    public cgst: number | undefined;
    public sgst: number | undefined;
    public offer_code: string = "string";
    public offer_discount: number = 0;
    public offer_type: number = 0;
    public grand_total_price: number | undefined;
    public description: string | undefined;
    public total_guest: number = 0;
    public delivery_type: string |undefined;
    public payment_method: number = 0;
    public payment_status: number = 0;
    public table_number: string |undefined;
    public  name: string | undefined;
    public mobile: string | undefined;
   
   
    create_date:string = "2022-06 - 28T05: 54: 48.240Z"; 
    create_by :number= 0;
    update_date:string= "2022 - 06 - 28T05: 54: 48.240Z";
    update_by:number= 0;
    status:number= 1;
    discount_type: number | undefined;
    discount: number | undefined;
    service_charge: number | undefined;
  }
