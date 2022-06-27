import { Command } from './command.model';
import { Property } from './property.model';
/* eslint-disable @typescript-eslint/naming-convention */
export class DeviceTemplate {
  Id: number;
  Name?: string;
  IsEdge?: boolean;
  Type?: number;
  Properties?: Property[];
  Commands?: Command[];
}
