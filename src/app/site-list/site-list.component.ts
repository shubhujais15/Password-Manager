import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {

  

  constructor(private passwordManager: PasswordManagerService){
    this.loadSites();
  }

  onSubmit(values: object){
    // console.log(values);
    this.passwordManager.addSite(values)
    .then(()=>{
      console.log("Data Save Successfully");
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  loadSites(){
    this.passwordManager.loadSites().subscribe((val:any)=>{
      console.log(val);
    })
  }

}
