import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CustomValidatorService} from '../../services/custom-validator.service';
import {ApiServiceService} from '../../services/api-service.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.scss']
})
export class StudentAddEditComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  studentId;
  private data: any;

  constructor(private formBuilder: FormBuilder,
              public api: ApiServiceService,
              private activatedRoute: ActivatedRoute,
              private toaster: ToastrService,
              private router: Router) {

    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.maxLength(50)]],
      mobile: [null, [Validators.required,
        Validators.compose([
          CustomValidatorService.patternValidator(/^[0-9]*$/, {hasNumber: true}),
        ]),
        Validators.minLength(10),
        Validators.maxLength(10)]],
      middle_name: ['', [Validators.required, Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      department: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required,
        Validators.pattern(/^\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\s*$/),
        Validators.maxLength(50)
      ]],
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.studentId = +params.get('id');
    });
  }

  ngOnInit(): void {
    if (this.studentId) {
      this.api.getOneStudent(this.studentId).subscribe((res: any) => {
        if (res.meta.code !== 1) {
          this.toaster.error(res.meta.message);
        } else {
          this.form = this.formBuilder.group({
            first_name: [res.data.first_name],
            last_name: [res.data.last_name],
            mobile: [res.data.mobile],
            middle_name: [res.data.middle_name],
            city: [res.data.city],
            address: [res.data.address],
            department: [res.data.department],
            email: [res.data.email],
          });
        }
      });
    }
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.form.value);
    let temp_obj = this.form.value;
    if (this.studentId) {
      temp_obj.id = this.studentId;
    }
    if (this.form.valid) {
      this.api.addStudents(temp_obj).subscribe((res: any) => {
        if (res.meta.code === 1) {
          this.data = res.data;
          this.router.navigate(['/student']);
        } else {
          this.toaster.error(res.meta.message);
        }
      });
    }
  }
}


// this.form = this.formBuilder.group({
//   first_name: [res.first_name, [Validators.required, Validators.maxLength(50)]],
//   last_name: [res.last_name, [Validators.required, Validators.maxLength(50)]],
//   mobile: [res.mobile, [Validators.required,
//     Validators.compose([
//       CustomValidatorService.patternValidator(/^[0-9]*$/, {hasNumber: true}),
//     ]),
//     Validators.minLength(10),
//     Validators.maxLength(10)]],
//   middle_name: [res.middle_name, [Validators.required, Validators.maxLength(50)]],
//   city: [res.city, [Validators.required, Validators.maxLength(50)]],
//   address: [res.address, [Validators.required, Validators.maxLength(250)]],
//   department: [res.department, [Validators.required, Validators.maxLength(50)]],
//   email: [res.email, [Validators.required,
//     Validators.pattern(/^\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\s*$/),
//     Validators.maxLength(50)
//   ]],
// });
