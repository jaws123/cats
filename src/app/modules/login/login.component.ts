import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CatHttpService} from '@cat/services/cat-http.service';
import {AuthService} from '@shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private catHttpService: CatHttpService,
              private authService: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      subId: ['', Validators.required],
      xApiKey: ['', Validators.required]
    });
  }

  onSubmit() {
    const {subId, xApiKey} = this.loginForm.value;
    this.authService.setXApiKey(xApiKey);
    this.catHttpService.getVotes(subId).subscribe(() => {
      this.errorMsg = '';
      this.authService.setSubId(subId);
      this.router.navigate(['/cat/vote']);
    }, (error => {
      if (error.status === 401) {
        this.errorMsg = 'Authentication error. Please try again.';
      }
    }));
  }

}
