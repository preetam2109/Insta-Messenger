import { DecimalPipe } from "@angular/common";

export class tbl_restaurant_get_by_id {
    restaurant_id: number | undefined;
    restaurant_name:  string | undefined;
    address:  string | undefined;
    country_id: number | undefined;
    country_en:  string | undefined;
    state_id: number | undefined;
    state_en:  string | undefined;
    city_id: number | undefined;
    city_en:  string | undefined;
    delivery_fee:  number | undefined;
    cgst: DecimalPipe| undefined;
    sgst: DecimalPipe | undefined;
    pan: number | undefined;
    latitude: number | undefined;
    longitude: number | undefined;
    owner_name: number | undefined;
    logo: string | undefined;
    bg_image: string | undefined;
}
