export class CookModel {
    order_id! :number;
    id!:string;
    restaurant_id!: number;
    restaurant_name!: string;
    order_type!: number;
    order_from_date!:string;
    order_to_date!: string;
    sub_total_price!: number;
    cgst!:number;
    sgst!: number;
    coupon_code!: null;
    coupon_percent!: null;
    discount_type!: null;
    discount!: number;
    service_charge!: number;
    grand_total_price!: number;
    description!: null;
    total_guest!: null;
    delivery_type!: string;
    payment_method!: null;
    payment_status!: null;
    status!: 0;
    special_offer_id!: string;
    create_date!: string;
    update_date!:string  
}
export class cook_tbl_item {
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
//  export class cook_tbl_item {
//     order_id!:number;
//   id!:number;
//   item_id!:number;
//   item!:string;
//   plate_type!:string;
//   offer_discount!:number;
//   offer_type!:number;
//   grand_total_price!:number;
//   }
  