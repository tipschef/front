import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ConstantsService} from '../constants/constants.service';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {Payslip} from '../../models/payslip';

@Injectable({
  providedIn: 'root'
})
export class PayslipService {

  constructor(private http: HttpClient,
              private constantsService: ConstantsService,
              private authService: AuthService) { }

  getPayslipsHistory(): Observable<HttpResponse<Array<Payslip>>> {
    const url = this.constantsService.getConstant('PAYMENT_PAYSLIP');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.get<Array<Payslip>>(url, {headers, observe: 'response'});

  }
}
