/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */

import { PatientProfile } from './patientProfile.model';
import { UserData } from './userData.model';
export class Patient {
  constructor(
      Id: number,
      Name?: string,
      Description?: string,
      PatientProfile?: PatientProfile,
      Userdata?: UserData
        )
  {}
}
