import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [FormsModule, CommonModule, AsyncPipe],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {

  allSites: Observable<Array<any>> = new Observable<Array<any>>();  

  siteName: string = "";
  siteURL: string = "";
  siteImgURL: string = "";
  siteId!: string;

  formState: string = "Add New";

  isSuccess: boolean = false;

  successMessage: string="";

  constructor(private passwordManager: PasswordManagerService){
    this.loadSites();
  }

  showAlert(message: string){
    this.isSuccess = true;
    this.successMessage = message;
  }

  onSubmit(values: object){
    // console.log(values);
    if(this.formState == "Add New"){
    this.passwordManager.addSite(values)
    .then(()=>{
      this.showAlert('Data Saved Successfully');
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  else if(this.formState == "Edit"){
    this.passwordManager.updateSite(this.siteId,values)
    .then(()=>{
      this.showAlert('Data Edited Successfully');
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  }
 

  loadSites(){
    this.allSites = this.passwordManager.loadSites();
  }

  editSite(siteName: string, siteURL: string, siteImgURL: string, id:string){
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.siteImgURL = siteImgURL;
    this.siteId = id;
    
    this.formState = "Edit";
  }

  deleteSite(id: string){
    this.passwordManager.deleteSite(id)
    .then(()=>{
      this.showAlert('Data Deleted Successfully');
    })
    .catch((error)=>{
      console.log(error);
    })
  }

}
