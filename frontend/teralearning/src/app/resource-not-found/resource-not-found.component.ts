import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

const WAIT_INTERVAL = 10; //in seconda
@Component({
  selector: 'app-resource-not-found',
  templateUrl: './resource-not-found.component.html',
  styleUrls: ['./resource-not-found.component.scss']
})
export class ResourceNotFoundComponent implements OnInit {


  constructor(private _authService: AuthService,
    private _router: Router,) { }

  ngOnInit(): void {
    this.navigateToLoginPage();
  }
  navigateToLoginPage() {
    setTimeout(() => {
      // this._authService.logout();
      this._router.navigate(['']);
    }, WAIT_INTERVAL * 1000);

  }

}
