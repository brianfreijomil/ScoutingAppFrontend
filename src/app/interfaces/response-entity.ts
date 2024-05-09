import { HttpStatusCode } from "@angular/common/http";

export interface ResponseEntity {
    body?:any;
    status:HttpStatusCode;
    message?:string;
}
