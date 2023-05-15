export class TblError { 
    id?: number | null; 
    role?: string; 
    user_id?: number | null; 
    statusCode?: string | null; 
    message?: string | null; 
    innerException?: string | null; 
    stackTrace?: string | null; 
    source?: string | null; 
    source_app?: string = 'Web'; 
    create_date?: Date = new Date(); 
    status?: number = 1; 
    is_resolve?: number = 1;   
}
