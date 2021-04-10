import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  readonly baseurl = 'http://localhost:3000/';
  private httpOptions: any;

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  // tslint:disable-next-line:typedef
  getBasicHeader() {
    this.httpOptions = new HttpHeaders({
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin',
    });
    return {headers: this.httpOptions};
  }

  // tslint:disable-next-line:typedef
  getAuthBlobHeader() {
    this.httpOptions = {
      responseType: 'blob'
    };
    return this.httpOptions;
  }

  // tslint:disable-next-line:typedef
  private handleAuthError(err: HttpErrorResponse) {
    switch (err.status) {
      case 0   :
        break;
      case 400 :
        this.toastr.error(err.error.message);
      case 401 :
        this.toastr.error(err.error.message);
    }
  }

  // tslint:disable-next-line:typedef
  addEditStudent() {
    return this.http.get(this.baseurl + 'get-student').pipe(
      catchError((err => {
          this.handleAuthError(err);
          return throwError(err);
        })
      ));
  }

  // tslint:disable-next-line:typedef
  getStudentCsv() {
    return this.http.get(this.baseurl + 'download-student', this.getAuthBlobHeader()).pipe(
      catchError((err => {
          this.handleAuthError(err);
          return throwError(err);
        })
      ));
  }

  // tslint:disable-next-line:typedef
  addStudents(data) {
    return this.http.post(this.baseurl + 'add-edit-student', data).pipe(
      catchError((err => {
          this.handleAuthError(err);
          return throwError(err);
        })
      ));
  }

  // tslint:disable-next-line:typedef
  getOneStudent(data) {
    return this.http.get(this.baseurl + 'get-student/' + data).pipe(
      catchError((err => {
          this.handleAuthError(err);
          return throwError(err);
        })
      ));
  }

  // tslint:disable-next-line:typedef
  exportStudentFile(data) {
    console.log(data);
    return this.http.get(this.baseurl + 'import-student', data).pipe(
      catchError((err => {
          this.handleAuthError(err);
          return throwError(err);
        })
      ));
  }
}
