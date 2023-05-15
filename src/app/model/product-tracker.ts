export class model_authentication {
    email: string | undefined;
    password: string | undefined;
    confirm_password: string | undefined;
    otp: string | undefined;
    otP_for: string | undefined;
}
export class tbl_login {
    mobile: number | undefined;
    id: number | undefined;
    user_id: number | undefined;
    employee_id: number | undefined;
    email: string | undefined
    password: string | undefined
    name: string | undefined;
    salt: string | undefined;
    role_id: number | undefined;
    status: number | undefined;
    create_date: Date | undefined;
    default_language_id: number = 1;
    logged_in_time: Date | undefined;
    logged_out_time: Date | undefined;
    photo: string | undefined;
    create_by: number | undefined;
    update_by: number | undefined;
    update_date: Date | undefined;
    address: string | undefined;
    city: string | undefined;
    state: string | undefined;
    weldor_code!:string;
    file_ID_proof!:string;
}
export class mst_rail_grade {
    rail_grade_id!: number;
    rail_grade: string | undefined;
    status!: number;
}
export class mst_rail_section {
    rail_section_id!: number;
    rail_section: string | undefined;
    status!: number ;
}
export class mst_welding_technique {
    welding_technique_id!: number;
    welding_technique: string | undefined;
    status!: number;
}
export class mst_portion_mould_ssc {
    portion_mould_ssc_type: number | undefined;
    portion_mould_ssc: string | undefined;
}


export class mst_states {
    state_id: number | undefined;
    state_en: string | undefined;
    state_hi: string | undefined;
    status: number | undefined;
}
export class tbl_product_qr {
    qr_code_id: number | undefined;
    product_id: number | undefined;
    portion_mould_ssc_type: number | undefined;
    portion_mould_ssc_value: string | undefined;
    status: number | undefined;
}

export class tbl_product {
    product_id: number = 0;
    rail_section_id: number | undefined;
    rail_grade_id: number | undefined;
    welding_technique_id: number | undefined;
    batch_number: string | undefined;
    uom: string | undefined;
    quantity: string | undefined;
    portion_start: string | undefined;
    portion_mould_ssc_type: number | undefined = 0;
    create_by: number | undefined;
    create_date: Date | undefined;
    update_by: number | undefined;
    update_date: Date | undefined;
    status: number = 1;
    manufacturing_date: Date | undefined;
    checked_portion: number | undefined = 0;
    checked_mould: number | undefined = 0;
    checked_ssc: number | undefined = 0; rail_section: string | undefined;
    rail_grade: string | undefined;
    welding_technique: string | undefined;
    itr_test   !:number ;  
    rdso_test_1  !:number ;
    rdso_test_2  !:number ;
}

export class tbl_scanning_detail {

    scan_id: number = 0;
    qr_code_id!: number;
    user_id: number = 0;
    create_date!: string;
    address!: string;
    city!: string;
    state!: string;
    lattitude!: string;
    longitude!: string;
    remark!: string;
    status!: any;

}

export class md_print_qr {
    qr_code_id: number | undefined = 0;
    batch_number: string | undefined
    manufacturing_date: Date | undefined
    portion_mould_ssc_type: number | undefined
    portion_mould_ssc_value: string | undefined;
    portion_mould_ssc: string | undefined;
    quantity: number | undefined;
    base64string: string | undefined;
itr_test :number=0;
rdso_test_1 :number=0;
rdso_test_2 :number=0;
}

export class md_sccanned_product_report {
    product_id: number | undefined;
    rail_section: string | undefined;
    rail_section_id: number | undefined;
    rail_grade: string | undefined;
    rail_grade_id: number | undefined;
    welding_technique: string | undefined;
    welding_technique_id: number | undefined;
    batch_number: string | undefined;
    manufacturing_date: Date | undefined;
    uom: string | undefined;
    quantity: number | undefined;
    portion_mould_ssc: string | undefined;
    create_date: Date | undefined;
    address: string | undefined;
    city: string | undefined;
    state: string | undefined;
    lattitude: string | undefined;
    longitude: string | undefined;
}


export class tbi_rail_section {


    rail_section_id!: number;
    rail_section!: string;
    status: number=0 
}