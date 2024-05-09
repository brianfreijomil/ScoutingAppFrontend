import { T } from "@fullcalendar/core/internal-common";
import { Timestamp } from "rxjs";
import { Scouter } from "./scouter";

export interface EventCalendar {
    id:number,
    title:string,
    dateInit:Timestamp<T>,
    dateEnd:Timestamp<T>,
    description:string,
    teamId:number,
    scouters:Scouter[]
}
