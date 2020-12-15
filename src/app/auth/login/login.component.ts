import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/users';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Users;

  constructor(private authService: AuthService, private router: Router) {
      this.user = new Users();
  }

  ngOnInit(): void {
      console.log(this.authService.usuario);
      if(this.authService.isAuthenticated()){
          swal.fire('Login','Hola '+this.authService.usuario.nombre+" ya esta authenticado",'info');
          this.router.navigate(['/dashboard']);
      }

  }


  login(){
      //console.log(this.user);
      if(this.user.email == ""){
         swal.fire('Error Login','Email','error');
         return;
      }

      this.authService.login(this.user).subscribe((res:any) => {


          this.authService.guardarUsuarios(res.token);
          this.authService.guardarToken(res.token);

          let usuario = this.authService.usuario;

          this.router.navigate(['/dashboard']);

          //swal.fire('Login','Hola '+usuario.nombre,'success');

      }, err =>{

          if(err.status == 401){
            swal.fire('Error','Error usuario o clave incorrectas!','error');
          }

      });

  }

}
