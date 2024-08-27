import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable } from 'rxjs';
import {AES, enc} from "crypto-js"

@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {

  siteId: string="";
  siteName: string = "";
  siteURL: string = "";
  siteImgURL: string = "";

  formState: string ="Add New";

  passwordList!: Array<any>;

  isSuccess: boolean = false;

  successMessage: string="";

  email: string="";
  username: string='';
  password: string='';
  passwordId: string='';

  constructor(private route: ActivatedRoute, private passwordManager: PasswordManagerService){
    
    this.route.queryParams.subscribe((val:any)=>{
      // console.log(val)
      this.siteId = val.siteId;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImgURL;
    })

    this.loadPasswords();
  }


  showAlert(message: string){
    this.isSuccess = true;
    this.successMessage = message;
  }


  resetForm(){
    this.email='';
    this.username='';
    this.password='';
    this.passwordId='';
  }

  onSubmit(value: any){
    // console.log(value)
    const encryptedPassword = this.encryptPassword(value.password);
    value.password = encryptedPassword;
    // console.log(value)
    
    if(this.formState=="Add New"){
      this.passwordManager.addPassword(value,this.siteId)
      .then(()=>{
        this.showAlert('Password Saved Successfully')
        this.resetForm();
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    else if(this.formState=='Edit'){
      this.passwordManager.updatePassword(this.siteId, this.password, value)
      .then(()=>{
        this.showAlert('Password Updated Successfully')
        this.resetForm();
      })
      .catch((error)=>{
        console.log(error);
      })

    }
   
  }

  loadPasswords(){
    this.passwordManager.loadPasswords(this.siteId).subscribe((val:any)=>{
      this.passwordList = val;
    })
  }

  editPassword(email: string, username: string, password: string, passwordId: string){
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;

    this.formState = 'Edit';
  }

  deletePassword(passwordId: string){
    this.passwordManager.deletePassword(this.siteId, passwordId)
    .then(()=>{
      this.showAlert('Data Deleted Successfully');
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  encryptPassword(password:string){
    const secretKey = 'pCotgf3mI9vo8yBcUBuxK9571P20QaHEJWn99qzGqzn/DmLmAnw7TdD+T1O4LINM'
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }

  decryptPassword(password:string){
    const secretKey = 'pCotgf3mI9vo8yBcUBuxK9571P20QaHEJWn99qzGqzn/DmLmAnw7TdD+T1O4LINM'
    const decryptedPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return decryptedPassword;
  }


  onDecrypt(password: string, index: number){
    const decryptedPassword = this.decryptPassword(password);
    this.passwordList[index].password = decryptedPassword;
  }
}
