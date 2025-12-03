export interface ProtestData {
  name: string;
  neighborhood: string;
  concerns: string[];
}

export interface GeneratedEmail {
  subject: string;
  body: string;
}

export enum ConcernType {
  NOISE = "Noise Pollution",
  WATER = "Water Usage & Conservation",
  PROPERTY_VALUE = "Property Value Impact",
  POWER_GRID = "Strain on Power Grid",
  TRAFFIC = "Construction Traffic",
  ZONING = "Incompatible Zoning"
}

export const EMAIL_RECIPIENT = "citycouncil@roundrocktexas.gov";