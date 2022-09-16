import { RelatedPerson } from './relatedPerson.model';
import { Practitioner } from './practitioner.model';
import { Patient } from './patient.model';
/* eslint-disable @typescript-eslint/naming-convention */
export class UserData {
  Id?:            number;
  BirthDate?:     null;
  Surnames?:      string;
  Address?:       null;
  Phone?:         null;
  Photo?:         null;
  IsActive?:      boolean;
  Type?:          number;
  IsDiseased?:    boolean;
  Name?:          string;
  Description?:   string;
  RelatedPerson?: RelatedPerson;
  Patient?:       Patient;
  Practitioner?:  Practitioner;

}
