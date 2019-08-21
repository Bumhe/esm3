import {Payment} from './payment.model'
export interface MemberForCreation {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    zone: string;
    chapter: string;
    category: string;
    gender: string;
    regId:string;
    paid?:boolean;
    amount?:number;
}