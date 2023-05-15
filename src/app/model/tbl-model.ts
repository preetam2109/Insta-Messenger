import { DecimalPipe } from "@angular/common";
import { tbl_order_items_dine_in } from "./tbl-order-items";
import { tbl_order } from "./tbl-order";
import { tbl_order_items } from "./tbl-order-items";

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
  export class tbl_sms_header {
    id: number | undefined;
    company_id: number | undefined;
    header: string | undefined;
    status: number | undefined;
    create_by: string | undefined;
    create_date: Date | undefined;
    update_by: string | undefined;
    update_date: Date | undefined;
  }
  export class tbl_sms_template {
    id: number | undefined;
    company_id: number | undefined;
    header_id: number | undefined;
    template_id: number | undefined;
    template:string|undefined;
    status: number | undefined;
    create_by: string | undefined;
    create_date: Date | undefined;
    update_by: string | undefined;
    update_date: Date | undefined;
  
  }
  export class tbl_header_list {
    id: number | undefined;
    company_id: number | undefined;
    header_id: number | undefined;
    template_id: number | undefined;
    status: number | undefined;
    create_by: string | undefined;
    create_date: Date | undefined;
    update_by: string | undefined;
    update_date: Date | undefined;
  }
  export class tbl_api{
      id: number | undefined;
      company_id: number | undefined;
      url: string | undefined;
      type: number | undefined;
      status: number | undefined;
      create_by: string | undefined;
      create_date: Date | undefined;
      update_by: string | undefined
      update_date: Date | undefined;

  }
  // {
    // "tbl_api": {
    //   "id": 0,
    //   "company_id": 0,
    //   "url": "string",
    //   "type": 0,
    //   "status": 0,
    //   "create_by": 0,
    //   "create_date": "2023-05-10T06:06:10.427Z",
    //   "update_by": 0,
    //   "update_date": "2023-05-10T06:06:10.427Z"
    // },
  //   "tbl_api_key": [
  //     {
  //       "id": 0,
  //       "api_id": 0,
  //       "key": "string",
  //       "value": "string",
  //       "status": 0,
  //       "create_by": 0,
  //       "create_date": "2023-05-10T06:06:10.427Z",
  //       "update_by": 0,
  //       "update_date": "2023-05-10T06:06:10.427Z"
  //     }
  //   ]
  // }
    export class tbl_api_key{
            title!:string;
            id: number | undefined;
            api_id: number | undefined;
            key: string | undefined;
            value: string | undefined;
            status: number | undefined;
            create_by: string | undefined;
            create_date: Date | undefined;
            update_by: String | undefined;
            update_date: Date | undefined;
    } 
    export class md_api_key
    {
         tbl_api :tbl_api =new tbl_api();
         tbl_api_key:tbl_api_key=new tbl_api_key();
        //  tbl_api_key:tbl_api_key[]=[];
    }

    // public partial class md_api_key
    // {
    //     public tbl_api tbl_api { get; set; }
    //     public List<tbl_api_key> tbl_api_key { get; set; }
    // }



// #endregion


// #region Old Model
export class tbl_category {
  sub_category_id: number | undefined;
  sub_category_type: number | undefined;
  sub_category: number | undefined;
  image_item: number | undefined
}

export class tbl_restaurant {
  restaurant_id: number | undefined;
  restaurant_name: string | undefined;
  address: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  logo: string | undefined;
  bg_image: string | undefined;
  delivery_time: string | undefined;
  restaurant_type: string | undefined;
  service_charge!: number;
  delivery_fee!: number;
  discount_percent: number=0;
  coupon: number | undefined;
  coupon_code: string | undefined;
  coupon_percent: number =0;
  coupon_status: number | undefined;
  open_time: string | undefined;
  close_at: string | undefined;
  is_closed: number | undefined;
  total_review: number | undefined;
  rating: number | undefined;
  promotion_rank: number | undefined;
  total_order: number | undefined;
  cgst!: number;
  sgst!: number;
  discount:number =0;
  discount_type: number | undefined;
  discount_title: string | undefined; 
  coupon_amount: number | undefined;
}

export class tbl_item {
  order_id!:number;
  coupon_amount: number | undefined;
  item_id: any | undefined;
  item: string | undefined;
  restaurant_id: number | undefined;
  sub_category: string | undefined;
  sub_category_id: number | undefined;  
  sub_category_type: number | undefined;
  category: string | undefined;
  category_id: number | undefined;
  category_type: number | undefined;
  item_group: string | undefined;
  item_group_id: number | undefined;
  item_group_type: number | undefined;
  item_type: string | undefined;
  description: string | undefined;
  full_price: number | undefined;
  full_price_desc: string | undefined;
  medium_price: number | undefined;
  medium_price_desc: string | undefined;
  small_price: number | undefined;
  small_price_desc: string | undefined;
  image_item: string | undefined;
  restaurant_name: string | undefined;
  address: string | undefined;
  latitude: string | undefined;
  longitude: string | undefined;
  delivery_time: string | undefined;
  restaurant_type: string | undefined;
  service_charge: number | undefined;
  delivery_fee: number | undefined;
  discount_percent: number | undefined;
  coupen: string | undefined;
  coupon_code: string | undefined;
  coupon_percent: number | undefined;
  coupon_status: number | undefined;
  open_time: string | undefined;
  closed_at: string | undefined;
  open_day: string | undefined;
  is_closed: number | undefined;
  total_review: number | undefined;
  rating: number | undefined;
  cgst: number | undefined;
  sgst: number | undefined;
  item_price!: number; 
  quantity!: number; 
  sub_total_price!: number; 
}


export class rating_details {
  rating_name: string | undefined;
  total_review: number | undefined;
  rating_percent: string | undefined;
  rating: number | undefined;
  nouse: number | undefined;
}


export class top_review {
  id: number | undefined;
  rating: number | undefined;
  comment: string | undefined;
  create_date: Date | undefined;
  like_count: number | undefined;
  dislike: number | undefined;
}
export class special_offer_details {
  coupon_amount: number | undefined;
  offer_id: number | undefined;
  off_id: string | undefined;
  special_offer_id: number | undefined;
  restaurant_id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  from_date: Date | undefined;
  to_date: Date | undefined;
  capacity: number | undefined;
  chief_guest: string | undefined;
  price: number | undefined;
  service_charge: number | undefined;
  discount: number | undefined;
  discount_type: number | undefined;
  discount_title: string | undefined;
  final_price: number | undefined;
  sub_total_price: number | undefined;
  grand_total_price: number | undefined;
  bg_image: string | undefined;
  restaurant_name: string | undefined;
  address: string | undefined;
  latitude: DecimalPipe | undefined;
  longitude: DecimalPipe | undefined;
  logo: string | undefined;
  delivery_time: string | undefined;
  restaurant_type: string | undefined;
  delivery_fee: number | undefined;
  open_time: Date | undefined;
  closed_at: Date | undefined;
  is_closed: string | undefined;
  total_review: number | undefined;
  rating: number | undefined;
  promotion_rank: number | undefined;
  total_order: number | undefined;
  cgst!: number ;
  sgst!: number ;
  id: string | undefined;
  order_id: number | undefined;
  customer_id: number | undefined;
  booking_date: number | undefined;
  total_guest: number | undefined;
  payment_method: number | undefined;
  payment_status: number | undefined;
  remark: string | undefined;
  create_date: Date | undefined;
  create_by: number | undefined;
  update_date: Date | undefined;
  update_by: number | undefined;
  status: number | undefined;
  order_type: number | undefined;
  order_from_date: Date | undefined;
  order_to_date: Date | undefined;
}

export class orders_get_all_orders_open{
  order_id!:number;
  id!: string;
  restaurant_id!: number;
  restaurant_name!: string;
  order_type!: number;
  order_from_date!: Date;
  order_to_date!: Date;
  sub_total_price!: number;
  cgst!: number;
  sgst!: number;
  coupon_code!: string;
  coupon_percent!: number;
  discount_type!: number;
  discount!: number;
  service_charge!: number;
  grand_total_price!: number;
  description!: string;
  total_guest!: number;
  delivery_type!: string;
  payment_method!: string;
  payment_status!: string;
  status!: number;
  special_offer_id!: number;
  items!: any;
}

export class walkin_customer {
  name: string| undefined;;
  mobile: number| undefined;
  address: string| undefined;
}

export class vm_items {
  item_group: string| undefined;
  item: tbl_order_items_dine_in[] | []| undefined; 
}



export class kot_order_item{

  order_id!:number;
  id!:number;
  item_id!:number ;
  item!:string;
  plate_type!:string;
 offer_discount!:number;
  offer_type!:number;
  grand_total_price!:number;

}


/* Delivery Models */


export class tbl_address {
  id:number|undefined;
  user_id:number|undefined;
  
  name!:string;
  mobile!:string;
  country!:string;

  
  state:string|undefined;
  city:string|undefined;
  street:string|undefined;
  landmark:string|undefined;
  address:string|undefined;
  pincode!:string;

  lattitute:string|undefined;
  longitute:string|undefined;
  address_type!:string;
  is_default_address!:number;
  // create_date:string|undefined;
  // status:string|undefined;

  
}
export class tbl_payments{
    id:number|undefined;
     order_id!:number;
    payment_method!:string;
    payment_amount!:number;
   transaction_number!:string;
   transaction_status!:string;
   bank_id:number=0;
   status!:number;
    create_by!:number;
   create_date!:string;
}

export class tbl_cards
{
  user_id!:number;
   card_id!:number;
    card_number!:number;
    name!:string;
    expiry_month!:number;
    expiry_year!:number;
    is_saved!:number;
    status!:number;
    create_date!:string;
    create_by!:number;

   
}

export class vm_orders {
  tbl_order: tbl_order = new tbl_order();
  tbl_order_items : tbl_order_items[] = [];
  tbl_payments!:tbl_payments;
  tbl_cards!:tbl_cards;
  tbl_banks!:tbl_banks;
}

export class  tbl_banks {
  bank_name!: string;
  bank_id!: number;
}
export class  tbl_geolocation {
  
    latitute:any;
    longitute:any;

}
export class  tbl_restaurant_get_filter_sort {
    sort_near_me:any = null ;
    sort_rating!: number;
    filter_pure_veg!: number;
    filter_pure_none_veg!: number;
    filter_rating : any;
    filter_alcohol_served!: number;
    district_id!: number;
    search_value!:string;
    
}
export class  tbl_vm_filters_item {
    // sort_near_me:any = null ;
    // sort_rating!: number;
    filter_pure_veg!: number;
    filter_pure_none_veg!: number;
    // filter_rating : any;
    // filter_alcohol_served!: number;
    // district_id!: number;
    search_value!:string;

    // "search_value": "string",
  // "filter_pure_veg": 0,
  // "filter_pure_none_veg": 0
    
}

export class tbl_vm_delivery_order_update {
  order_id!:number;
  assignment_id!: number;
  user_id!:number;
  status!:number;
  lattitute!:string;
  longitute!:string;
  address!:string;
}
export class  tbl_geolocation_address {
  
  latitute:any;
  longitute:any;
  address!:string;
}
export class tbl_md_send_sms
    {
      type: number | undefined; 
      send_to:number  | undefined; 
      mobile_nos: string | undefined;
      header_id: string | undefined;
      template_id:string|undefined;
      message: string | undefined;
    }
export class  tbl_md_send_whatsapp{
  type: number | undefined; 
  send_to:number  | undefined; 
  mobile_nos: string | undefined;
  message_type:string |undefined;
  message: string | undefined;
}
// #endregion
