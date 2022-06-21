/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */

import { Condition } from './condition.model';
import { Disability } from './disability.model';

export class PatientProfile {

      Id: number;
      Name?: string;
      Description?: string;
      PreferredLanguage?: number;
      Region?: string;
      HazardAvoidance?: number;
      Disability?: Disability[];
      Diseases?: Condition[];

}
