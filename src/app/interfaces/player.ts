import { Time } from "@angular/common";
import { Stats } from "./stat";
import { Scouter } from "./scouter";
import { ClinicHistory } from "./clinic-history";

export interface Player {
    dni:number,
    surname:string,
    name:string,
    contact:string,
    category:number,
    ubication:string,
    height?:number,
    skillLeg?:string,
    urlImage?:string,
    firstPosition:string,
    secondPosition?:string,
    valoration?:string,
    characteristics?:string,
    scouter:Scouter,
    dateSeen:Date,
    timeSeen?:Time,
    divisionSeen:string,
    teamSeen:string,
    campSeen:string,
    contactTeamSeen:string,
    urlsVideos?:string[],
    status:string,
    teamId:number,
    stats?:Stats[],
    clinicHistory?:ClinicHistory[];
}
