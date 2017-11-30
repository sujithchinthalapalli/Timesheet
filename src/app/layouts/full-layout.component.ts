import { Component, OnInit } from '@angular/core';
import { Organization, OrganizationResult } from '../Model/organization';
import { Emp, EmpResult } from '../Model/emp';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "angular2-social-login";
import { RedBenchService } from '../Service/RedBenchService';
@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  type: any;
  loading: any;
  firstletter: string;
  currentUser: EmpResult;
  currentOrg: OrganizationResult;
  public status: { isopen: boolean } = { isopen: false };
  public logintype: string;
  public imagesrc: any;
  public imagesrc1: any;
  private id: string;

  constructor(public _auth: AuthService, private RedBenchService: RedBenchService, private oauthService: OAuthService, private route: ActivatedRoute, private router: Router) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentOrg = JSON.parse(localStorage.getItem('currentUser'));
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  get givenName() {

    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims.name;
  }

  ngOnInit(): void {
    this.type = this.currentUser.Type;
    this.type = this.currentOrg.Type;
    if (this.type == "organization") {
      // this.getJobSeekerById();
      //  this. getOrgById();
      this.id = this.currentOrg.Id;
      this.firstletter = this.currentOrg.FirstName.charAt(0);
      if (this.currentOrg.ProfilePic == null || this.currentOrg.ProfilePic == '') {
        this.imagesrc1 = "../../assets/img/avatars/user-icon.jpg"
      }
      else {
        this.imagesrc1 = this.currentUser.ProfilePic;
      }
    }
    this.logintype = localStorage.getItem('logintype');

    if (this.type == "employee") {
      // this.getJobSeekerById();
      //  this.GetempById();
      this.id = this.currentUser.Id;
      this.firstletter = this.currentUser.FirstName.charAt(0);
      if (this.currentUser.ProfilePic == null || this.currentUser.ProfilePic == '') {
        this.imagesrc = "../../assets/img/avatars/user-icon.jpg"
      }
      else {
        this.imagesrc = this.currentUser.ProfilePic;
      }
    }
    this.logintype = localStorage.getItem('logintype');
  }

  GetempById() {
    this.RedBenchService.GetempById(this.id).subscribe(
      results => {

        this.currentUser = results;
        this.firstletter = this.currentUser.FirstName.charAt(0);
      },
      error => {

      });
  }
  getOrgById() {
    this.RedBenchService.getOrgById(this.id).subscribe(
      results => {

        this.currentOrg = results;
        this.firstletter = this.currentOrg.FirstName.charAt(0);
      },
      error => {

      });
  }

  logout() {
    this.oauthService.logOut();
    this.router.navigateByUrl('/pages/login');
  }

}
