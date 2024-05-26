import { Scouter } from "./scouter";

export interface EventCalendar {
    id:number,
    title:string,
    dateInit:Date,
    dateEnd:Date,
    description:string,
    teamId:number,
    scouters:Scouter[]
}
