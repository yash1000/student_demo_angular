import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../services/api-service.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  data;

  constructor(public api: ApiServiceService, private toaster: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.getList();
  }

  // tslint:disable-next-line:typedef
  getList() {
    this.api.addEditStudent().subscribe((res: any) => {
      if (res.meta.code === 1) {
        this.data = res.data;
        this.toaster.success(res.meta.message);
      } else {
        this.toaster.error(res.meta.message);
      }
    });
  }

  // tslint:disable-next-line:typedef
  downloadCsv() {
    this.api.getStudentCsv().subscribe((res: any) => {
      const blob = new Blob([res], {type: 'text/csv'});
      FileSaver.saveAs(blob, 'Student.csv');
    });
  }

  // tslint:disable-next-line:typedef
  addStudent() {
    this.router.navigate(['/add-edit-student']);
  }

  // tslint:disable-next-line:typedef
  edit(id) {
    this.router.navigate([`/add-edit-student/${id}`]);
  }

  // tslint:disable-next-line:typedef
  validateFileForSheet(name) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() === 'xls' || ext.toLowerCase() === 'xlsx' || ext.toLowerCase() === 'csv') {
      return true;
    } else {
      this.toaster.error('Invalid File Format');
      return false;
    }
  }

  // tslint:disable-next-line:typedef
  uploadFile(e) {
    if (!this.validateFileForSheet(e.target.files[0].name)) {
      return false;
    }
    const formdata = new FormData();
    if (e.target.files && e.target.files[0]) {
      formdata.append('file', e.target.files[0]);
      this.api.exportStudentFile(formdata).subscribe((res: any) => {
        if (res.meta.code === 1) {
          this.toaster.success(res.meta.message);
        } else {
          this.toaster.error(res.meta.message);
        }
      }, err => {
      });
    }
  }
}
