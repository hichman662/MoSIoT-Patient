import { Target } from './target.model';
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */

export class Goal {
    Id: number;
    Name: string;
    Description: string;
    Category: number;
    Priority: number;
    Status: number;
    OutcomeCode: string;
    Targets: Target[];
}
