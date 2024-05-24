export interface User {
    id:string,
    username:string,
    email:string,
    lastName:string,
    firstName:string,
    password?:string,
    roles?:string[],
    enabled: boolean,
    teamId:number
}
