import { Role } from "./role"

export interface User {
    id:number,
    username:string,
    email:string,
    surname:string,
    name:string,
    password?:string,
    roles:Role[],
    enable: boolean,
    teamId:number
}
