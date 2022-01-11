import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = '';
  constructor(public snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (this.user == '' || this.user == null) {
      this.openSnackBar('No ha ingresado un usuario', 'Aceptar');
      return
    }
    localStorage.setItem('user',this.user)
    this.router.navigate(["home"]);
    console.log(this.user);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
