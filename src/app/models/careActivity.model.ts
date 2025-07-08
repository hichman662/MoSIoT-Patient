/* eslint-disable @typescript-eslint/naming-convention */
import { Medication } from './medication.model';
import { Communication } from './communication.model';
import { Appointment } from './appointment.model';
import { Nutrition } from './nutrition.model';
import { ValueCommunication } from './valueCommunication.model';
export class CareActivity {

    id: number;
    name: string;
    description: string;
    periodicity: number;
    duration: number;
    location: string;
    outcomeCode: string;
    typeActivity: number;
    activityCode: string;
    comunications: ValueCommunication[];
    appointments: Appointment;
    medications: Medication | null;
    nutritionOrders: Nutrition;
}
