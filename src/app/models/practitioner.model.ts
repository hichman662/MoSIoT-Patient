/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */

import { PractitionerData} from './practitionerData.model';

export class Practitioner {
      Id: number;
      Name?: string;
      Description?: string;
      PractitionerData?: PractitionerData;
}
