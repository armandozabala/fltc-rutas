import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/users';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Users;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private authService: AuthService, private router: Router) {
      this.user = new Users();
  }

  ngOnInit(): void {
      if(this.authService.isAuthenticated()){
          swal.fire('Login','Hola '+this.authService.usuario.nombre+" ya esta authenticado",'info');
          this.router.navigate(['/dashboard/customers']);
      }

  }


  login(){
      //console.log(this.user);
      if(this.user.email == ""){
         swal.fire('Error Login','Email','error');
         return;
      }

      this.blockUI.start('Loading...'); // Start blocking

      this.authService.login(this.user).subscribe((res:any) => {


          this.authService.guardarUsuarios(res.token);
          this.authService.guardarToken(res.token);

          let usuario = this.authService.usuario;

          this.router.navigate(['/dashboard']);

          this.blockUI.stop();
          //swal.fire('Login','Hola '+usuario.nombre,'success');

      }, err =>{

          if(err.status == 401){
            this.blockUI.stop();
            swal.fire('Error','Error usuario o clave incorrectas!','error');
          }

      });

  }

}
