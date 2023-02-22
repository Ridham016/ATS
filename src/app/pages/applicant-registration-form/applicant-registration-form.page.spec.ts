import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApplicantRegistrationFormPage } from './applicant-registration-form.page';

describe('ApplicantRegistrationFormPage', () => {
  let component: ApplicantRegistrationFormPage;
  let fixture: ComponentFixture<ApplicantRegistrationFormPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantRegistrationFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicantRegistrationFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
