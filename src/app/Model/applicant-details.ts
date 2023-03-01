export class ApplicantDetails {

}

export class Applicant {

  ApplicantId!: number;
  FirstName!: string;
  MiddleName!: string;
  LastName!: string;
  Email!: string;
  Phone!: string;
  Address!: string;
  IsActive: boolean=true;
  CurrentCompany! : string;
  CurrentDesignation!: string;
  DateOfBirth!:Date;
  TotalExperience!: string;
  ApplicantDate!:Date;
  DetailedExperience!: string;
  CurrentCTC!: number;
  ExpectedCTC!: number;
  NoticePeriod!: number;
  ReasonForChange!: string;
  CurrentLocation!: string;
  PreferedLocation!: string;
}
export class Scheduling{
  Description!:string;
  DateAndTime!:Date;
  Link!:string;
  InterviewerName!: string;
}
