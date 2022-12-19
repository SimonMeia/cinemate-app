import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "src/app/auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { ViewWillEnter } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, ViewWillEnter {
  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    // Inject the HTTP client
    public http: HttpClient
  ) { }

  ionViewWillEnter(): void {
    // Make an HTTP request to retrieve the trips.
    const url = "http://localhost:3000/reviews/mygroups";
    this.http.get(url).subscribe((reviews) => {
      console.log(`Review loaded`, reviews);
    });
  }

  ngOnInit() { }

  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }
}