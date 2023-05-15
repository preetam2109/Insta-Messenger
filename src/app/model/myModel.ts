export class myModel {

    id: number | undefined;
    user_id: number | undefined;
    name: string | undefined;
    mobile: number | undefined;
    country: string | undefined;
    state: string | undefined;
    city: string | undefined;
    street: string | undefined;
    landmark: string | undefined;
    address: string | undefined;
    pincode: number | undefined;
    lattitute: number | undefined;
    longitute: number | undefined;
    address_type: string | undefined;
    is_default_address:number | undefined;
}
export class myModelRes {

    status: string | undefined;
    message: string | undefined;
    data!:any;
}