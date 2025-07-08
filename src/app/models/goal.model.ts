import { Target } from './target.model';
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */

export class Goal {
    id: number;
    name: string;
    description: string;
    category: number;
    priority: number;
    status: number;
    outcomeCode: string;
    targets: Target[];
}
