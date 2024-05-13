import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from '../service/form-service.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  dynamicForm: FormGroup = this.formBuilder.group({});
  formStructure: any[] = [];
  submitFormButton: string = '';
  submitButtonaShow: boolean = false;

  constructor(private formBuilder: FormBuilder,  public formService: FormServiceService) { }

  ngOnInit() {
  }

  getUserFormStructure(){
    this.formService.getUserFormStructure().subscribe((formStructure) => {
      this.formStructure = formStructure;
      this.submitFormButton = 'user';
      this.loadForm();
    })
  }

  getCarDriverFormStructure(){
    this.formService.getCarDriverFormStructure().subscribe((formStructure) => {
      this.formStructure = formStructure;
      this.submitFormButton = 'carDriver';
      this.loadForm();
    })
  }

  loadForm(){

    let formGroup: Record<string, any> = {};
    this.formStructure.forEach(control => {
      let controlValidators: Validators[] = [];

      if (control.validations) {
        control.validations.forEach((validation: { validator: any; }) => {
          if (validation.validator === 'required') controlValidators.push(Validators.required);
          if (validation.validator === 'email') controlValidators.push(Validators.email);
        });
      }

      formGroup[control.name] = [control.value , controlValidators];
    });
    this.dynamicForm = this.formBuilder.group(formGroup);
    this.submitButtonaShow = true;
  }

  onSubmit() {
    if(this.submitFormButton == 'user'){
      this.formService.postUserFormStructure(this.dynamicForm.value).subscribe((data) => {});
    }
    if(this.submitFormButton == 'carDriver'){
      this.formService.postCarDriverFormStructure(this.dynamicForm.value).subscribe((data) => {});
    }
    this.dynamicForm.reset();
  }

  getErrorMessage(control: any) {
    const formControl = this.dynamicForm.get(control.name);

    if (!formControl) {
      return '';
    }
    for (let validation of control.validations) {
      if (formControl.hasError(validation.validator)) {
        return validation.message;
      }
    }
    return '';
  }
}
