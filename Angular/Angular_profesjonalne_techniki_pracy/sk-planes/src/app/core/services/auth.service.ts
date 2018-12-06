import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Credentials } from '../interfaces/credentials';
import { MatSnackBar } from '@angular/material';
import { UserInfo } from 'firebase';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  readonly authState$ = this.angularFireAuth.authState;
  private userData: UserInfo;

  constructor(private angularFireAuth: AngularFireAuth, private matSnackBar: MatSnackBar) { }

  public login(credentials: Credentials): Promise<void> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(userData => {
      this.userData = userData.user;
    }).catch(error => {
      this.matSnackBar.open(error, '', { panelClass: 'toast-error' });
    });
  }

  public register(credentials: Credentials): Promise<UserCredential> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }
  
  public get user(): UserInfo {
    return this.userData;
  }

  public logout(): Promise<void> {
    return this.angularFireAuth.auth.signOut();
  }
}
