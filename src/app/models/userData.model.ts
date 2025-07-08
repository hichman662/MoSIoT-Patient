import { RelatedPerson } from './relatedPerson.model';
import { Practitioner } from './practitioner.model';
import { PatientProfile } from './patientProfile.model';

/* eslint-disable @typescript-eslint/naming-convention */

export class Patient {
  id: number;
  email?: string;
  userData: UserData;
  patientProfile: PatientProfile;
}

export class UserData {
  id?:            number;
  birthDate?:     null;
  surnames?:      string;
  address?:       null;
  phone?:         null;
  photo?:         null;
  isActive?:      boolean;
  type?:          number;
  isDiseased?:    boolean;
  name?:          string;
  description?:   string;
  relatedPerson?: RelatedPerson;
  practitioner?:  Practitioner;
  scenarioUser: ScenarioUser;
}


export interface ScenarioUser {
  id:          number;
  name:        string;
  description: string;
}
