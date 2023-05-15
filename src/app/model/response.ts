export class response{
    status: string | undefined;
    message:string | undefined;
    data:any;
}

export class model_pg_response{
    order_id!:number;
    payment_id!: number;
    transaction_number!: string;
    transaction_status!: string;
    pg_response!: string;
}

