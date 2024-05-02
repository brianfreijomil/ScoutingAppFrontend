import { Time } from "@angular/common";
import { User } from "./user";
import { Stats } from "./stats";
import { ListClinicHistory } from "./list-clinic-history";

export interface Player {
    id?:number,
    dni:string,
    surname:string,
    name:string,
    contact:string,
    category:number,
    ubication:string,
    height?:number,
    skillLeg?:string,
    urlImage?:string,
    characteristics?:string,
    firstPosition:string,
    secondPosition?:string,
    valoration?:string,
    scouter:User,
    dateSeen:Date,
    timeSeen?:Time,
    divisionSeen:string,
    teamSeen:string,
    campSeen:string,
    contactTeamSeen:string,
    urlsVideos?:string[],
    status?:string,
    stats?:Stats[],
    clinicHistory?:ListClinicHistory[]
}
