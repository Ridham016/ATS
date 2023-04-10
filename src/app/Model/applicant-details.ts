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
  CurrentCTC!: string;
  ExpectedCTC!: string;
  NoticePeriod!: number;
  ReasonForChange!: string;
  CurrentLocation!: string;
  PreferedLocation!: string;
  PortfolioLink!:string;
  LinkInLink!:string;
  OtherLink!:string;
  SkillDescription!:string;
  DOJ!:string;
}
export class Scheduling{
  Description!:string;
  ScheduleDateTime!:Date;
  ScheduleLink!:string;
  InterviewerId!: number;
  ModeofInterView!:number;
}

