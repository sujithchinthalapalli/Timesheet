import { Component, OnInit } from '@angular/core';
import { Routes, Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './simple-layout.component.html',
})
export class SimpleLayoutComponent implements OnInit {

    public locationurl = '';
    private signUp: boolean = false;
    private signIn: boolean = false;
    public isCollapsed = true;
    constructor(private router: Router, private route: ActivatedRoute) {
        this.locationurl = router.url;
    }

    ngOnInit(): void {

        this.locationurl;
        // this.SignIn();
        if (this.locationurl.indexOf('/pages/register') >= 0) {
            this.signIn = true;
        } else {
            this.signUp = true;
        }
        // this.SignUp();
    }

    SignUp() {
        if (this.signIn) {
            this.router.navigateByUrl('/pages/login');

            setTimeout(() => {
                this.signUp = true;
                this.signIn = false;
                this.isCollapsed = !(this.isCollapsed);
            }, 100)
        }
        else if (this.signUp) {
            this.router.navigateByUrl('/pages/register');
            setTimeout(() => {
                this.signIn = true;
                this.signUp = false;
                this.isCollapsed = !(this.isCollapsed);
            }, 100)
        }
    }

    // SignIn(){
    //     if(this.locationurl=='/pages/register'){
    //         this.signUp = false;
    //      }
    //      else if(this.locationurl=='/pages/login'){
    //         this.signIn = true;             
    //      }
    // }
}
