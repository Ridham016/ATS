export class ApplicantDetails {
}
export class Applicant {
  ApplicantId!: number;
  Name!: string;
  Email!: string;
  Phone!: string;
  Address!: string;
  IsActive!: boolean;
  CurrentCompany! : string;
  CurrentDesignation!: string;
  dob!:Date;
  TotalExperience!: string;
  ApplicantDate!:Date;
  DetailedExperience!: string;
  CurrentCTC!: number;
  ExpectedCTC!: number;
  NoticePeriod!: number;
  ReasonsForChange!: string;
  CurrentLocation!: string;
  PreferedLocation!: string;
}
