import { Command } from './command.model';
import { Property } from './property.model';
/* eslint-disable @typescript-eslint/naming-convention */
export class DeviceTemplate {
  id: number;
  name?: string;
  isEdge?: boolean;
  type?: number;
  properties?: Property[];
  commands?: Command[];
}
