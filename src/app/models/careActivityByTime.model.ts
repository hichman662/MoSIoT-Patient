/* eslint-disable @typescript-eslint/naming-convention */
import { CareActivity } from './careActivity.model';
export class CareActivityByTime {
    id: number;
    name: string;
    state: number;
    description: string;
    timeAct: Date;
    valueCareActivity: CareActivity;

}
