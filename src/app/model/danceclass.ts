import { Student } from "./student";
import { DanceStyle } from "./dancestyle";
import { Place } from "./place";

export class DanceClass{
    _id: string;
    name: string;
    place: Place;
    about?:string;
    country?: string;
    city?: string;
    time: string;
    students: Student[];
    danceStyle: DanceStyle = new DanceStyle();
    toDate?: number;
    toDateFormated?: string;
    toTimeFormated?: string;
    fromDate?: number;
    fromDateFormated?: string;
    fromTimeFormated?: string;
}