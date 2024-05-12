import { Role } from "./role"

export interface User {
    id:number,
    username:string,
    email:string,
    lastName:string,
    firstName:string,
    password?:string,
    roles?:Role[],
    enabled: boolean,
    teamId:number
}
