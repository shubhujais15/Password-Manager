import { Component } from '@angular/core';
import { PasswordManagerService } from '../services/password-manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  isError: boolean = false;

  constructor(private passwordManager: PasswordManagerService, private router: Router){
  }

  onSubmit(values:any){
    this.passwordManager.login(values.email, values.password)
    .then(()=>{
      console.log('Login success')
      this.router.navigate(['/site-list'])
    })
    .catch((error)=>{
      console.log('Login failed')
      this.isError = true;
    })
  }

}
