export class tbl_order_items {

    id: number | undefined;
    order_id: number | undefined;
    item_id: number | undefined;
    item_type: number | undefined;
    quantity: number | undefined;
    item_price: number | undefined;
    sub_total_price: number | undefined;
    coupon_amount: number | undefined;
    cgst: number | undefined;
    sgst: number | undefined;
    offer_code: string | undefined ="string";
    offer_discount: number | undefined = 0;
    offer_type: number | undefined = 0;
    grand_total_price: number | undefined = 0;
    description: string | undefined;
    item: string | undefined;
    create_date: string = "2022-06-28T05:54:48.240Z";
    create_by: number = 0;
    update_date: string = "2022-06-28T05:54:48.240Z";
    update_by: number = 0;
    status: number = 0;
    plate_type!: string;
    delivery_address_id!:number;


}

export class tbl_order_items_dine_in {

    public id: number | undefined;;
    public order_id: number | undefined;;
    public item_id!: number;
    
    public full_quantity: number | undefined;;
    public full_price: number | undefined;;
    public full_sub_total_price: number | undefined;;
    public full_grand_total_price: number | undefined = 0;
    
    public medium_quantity: number | undefined;;
    public medium_price: number | undefined;;
    public medium_sub_total_price: number | undefined;;
    public medium_grand_total_price: number | undefined = 0;

    public small_quantity: number | undefined;;
    public small_price: number | undefined;;
    public small_sub_total_price: number | undefined;;
    public small_grand_total_price: number | undefined = 0;

    public cgst: number | undefined;;
    public sgst: number | undefined;;
    public offer_code: string | undefined;
    public offer_discount: number | undefined = 0;
    public offer_type: number | undefined = 0;    
    
    public description: string | undefined;
    public item: string | undefined;
    public category_id: number|undefined;
    public category_type: number|undefined;
    public sub_category:string|undefined;
    public  sub_category_type:number|undefined;
    public sub_category_id:number|undefined;
    public category:string|undefined;
    public item_type:number|undefined;


    create_date: string = "2022-06-28T05:54:48.240Z";
    create_by: number = 0;
    update_date: string = "2022-06-28T05:54:48.240Z";
    update_by: number = 0;
    status: number = 1;



}

// export class tbl_order_items_dine_in {

//     public id: number | undefined;;
//     public order_id: number | undefined;;
//     public item_id!: number;
    
//     public full_quantity: number | undefined;;
//     public full_price: number | undefined;;
//     public full_sub_total_price: number | undefined;;
//     public full_grand_total_price: number | undefined = 0;
    
//     public medium_quantity: number | undefined;;
//     public medium_price: number | undefined;;
//     public medium_sub_total_price: number | undefined;;
//     public medium_grand_total_price: number | undefined = 0;

//     public small_quantity: number | undefined;;
//     public small_price: number | undefined;;
//     public small_sub_total_price: number | undefined;;
//     public small_grand_total_price: number | undefined = 0;

//     public cgst: number | undefined;;
//     public sgst: number | undefined;;
//     public offer_code: string | undefined;
//     public offer_discount: number | undefined = 0;
//     public offer_type: number | undefined = 0;    
    
//     public description: string | undefined;
//     public item: string | undefined;
//     public category_id: number|undefined;
//     public category_type: number|undefined;
//     public sub_category:string|undefined;
//     public  sub_category_type:number|undefined;
//     public sub_category_id:number|undefined;
//     public category:string|undefined;
//     public item_type:number|undefined;


//     create_date: string = "2022-06-28T05:54:48.240Z";
//     create_by: number = 0;
//     update_date: string = "2022-06-28T05:54:48.240Z";
//     update_by: number = 0;
//     status: number = 1;



// }
export class tbl_order_table_view {
    delivery_type:string|undefined;
    table_name:string|undefined;
    table_id:string|undefined;

}