/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */

import { RelatedPersonData} from './relatedPersonData.model';

export class RelatedPerson {
  constructor(
      Id: number,
      Name?: string,
      Description?: string,
      RpData?: RelatedPersonData
        )
  {}
}
