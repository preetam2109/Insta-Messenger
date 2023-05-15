import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Base } from 'src/app/helper/base';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {
  baseUrl: any
  adminAppUrl: any
  private key = CryptoJS.enc.Utf8.parse(environment.EncryptKey);
  private iv = CryptoJS.enc.Utf8.parse(environment.EncryptIV);
  constructor(private router: Router, private http: HttpClient) { this.baseUrl = Base.baseUrl; this.adminAppUrl = Base.adminAppUrl; }
  public get(url: string, options?: any) { return this.http.get(this.baseUrl + url, options); }
  public post(url: string, data: any, options?: any) { return this.http.post(this.baseUrl + url, data, options); }
  public put(url: string, data: any, options?: any) { return this.http.put(this.baseUrl + url, data, options); }
  public delete(url: string, options?: any) { debugger; return this.http.delete(this.baseUrl + url, options); }
 


  public download_PDF(Data: any, fileName: any, pageSize: any = 'a4'): void {
    html2canvas(Data).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', pageSize);
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(fileName);
    });
  }

  getToken(): string | null {
    return JSON.parse(localStorage.getItem('ltn')!);
  }

  isLoggedIn() {
    return this.getToken() != null;
  }

  getRoles() {
    var role = JSON.parse(localStorage.getItem('currentUser') || '{}')
    var res = role == undefined ? null : role.role;
    return res;
  }

  loggedOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('ltn');
    this.router.navigate(['/login']);
  }
  encryptUsingAES256(text: any): any {
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), this.key, {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
  decryptUsingAES256(decString: any) {
    try {
      var decrypted = CryptoJS.AES.decrypt(decString, this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
    }
    return null;
  }
}
