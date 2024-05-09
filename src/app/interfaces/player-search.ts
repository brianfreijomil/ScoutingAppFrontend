import { Scouter } from "./scouter";

export interface PlayerSearch {
    dni:number,
    surname:string,
    name:string,
    category:number,
    status:boolean,
    scouter:Scouter
}
