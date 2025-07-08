/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */

import { Condition } from './condition.model';
import { Disability } from './disability.model';

export class PatientProfile {

      id: number;
      name?: string;
      description?: string;
      preferredLanguage?: number;
      region?: string;
      hazardAvoidance?: number;
      disability?: Disability[];
      diseases?: Condition[];

}
