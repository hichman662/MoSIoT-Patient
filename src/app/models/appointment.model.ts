/* eslint-disable @typescript-eslint/naming-convention */
export class Appointment {
      Id: number;
      IsVirtual?: boolean;
      Description?: string;
      Direction?: string;
      ReasonCode?: string;
      // tslint:disable-next-line: variable-name
      CareActivity_oid?: number;
}
