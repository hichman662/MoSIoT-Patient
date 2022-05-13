/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */

import { Condition } from './condition.model';
import { Disability } from './disability.model';
import { AccessMode } from './accessMode.model';

export class PatientProfile {
  constructor(
      Id: number,
      Name?: string,
      Description?: string,
      AccessMode?: AccessMode[],
      PreferredLanguage?: number,
      Region?: string,
      HazardAvoidance?: number,
      Disability?: Disability[],
      CarePlan_oid?: number[],
      Diseases?: Condition[]
        )
  {}
}
