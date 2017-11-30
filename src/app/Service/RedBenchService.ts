import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Register } from '../Model/Register';
import { RegisterResult } from '../Model/RegisterResult';
import { Dayview, DayviewResult } from '../Model/Dayview';
// import { WeekView, WeekViewResult } from '../Model/WeekView';
// import { Timesheetview, TimesheetviewResult } from '../Model/Timesheetview';
// import { Timeoff, TimeoffResult } from '../model/Timeoff';

import { Emp, EmpResult } from '../Model/emp';
import { Organization, OrganizationResult, CustomMessage } from '../Model/organization';
// import { Expensesheet, ExpensesheetResult } from '../Model/Expensesheet';
// import { Addexpensesheet, AddexpensesheetResult } from '../Model/Addexpensesheet';
// import { Myproject, MyprojectResult } from '../Model/Myproject';
// import { Mytask, MytaskResult } from '../Model/Mytask';


import { Daydata, DaydataResult } from '../Model/Daydata';
import { Weekdata, WeekdataResult } from '../Model/weekdata';
import { Invoice, InvoiceResult } from '../Model/Invoice';
import { Invoiceproduct, InvoiceproductResult } from '../Model/Invoiceproduct';
import { environment } from '../../environments/environment';


import { TokenCreate } from '../model/token';
// import{Vendors} from '../Model/vendor';
// import{VendorsResult} from '../Model/vendorresult'
// import {Workforce} from '../Model/Workforce';
// import {WorkforceResults} from '../Model/WorkforceResults';
// import{JobTitle} from '../Model/jobtitle';


@Injectable()
export class RedBenchService {
    constructor(private http: Http) { }
    // private accounturl = 'http://redbenchservice.azurewebsites.net/api/orgs';
    // private invoiceUrl = 'http://redbenchservice.azurewebsites.net/api/invoices';
    // private invoiceproductUrl='http://redbenchservice.azurewebsites.net/api/products';
    // private vendorsurl='http://redbenchservice.azurewebsites.net/api/vendors';
    // private workforceurl='http://redbenchservice.azurewebsites.net/api/Workforces';
    // private jobtitleurl='http://redbenchservice.azurewebsites.net/api/jobtitles';

    // private Resumeurl = environment.API_URL + 'api/resumes';

    // private WeekUrl = 'http://localhost:49596/api/weekviews';
    // private TimesheetUrl = 'http://localhost:49596/api/timesheets';
    // private TimeoffUrl = 'http://localhost:49596/api/timeoffs';
    // private ExpensesheetUrl = 'http://localhost:49596/api/expensesheets';
    // private AddexpensesheetUrl = 'http://localhost:49596/api/addexpensesheets';
    // private MyprojectUrl = 'http://localhost:49596/api/myprojects';
    // private MytaskUrl = 'http://localhost:49596/api/mytasks';
    // private UserUrl = 'http://localhost:49596/api/users';

    // "API_URL": "http://rbtimesheetservice.azurewebsites.net/api/dayviews",


    private DayUrl = environment.API_URL + 'api/dayviews';
    private EmpUrl = environment.API_URL + 'api/emps';
    private OrgUrl = environment.API_URL + 'api/organizationts';
    private invoiceUrl = environment.API_URL + 'api/invoices';
    private invoiceproductUrl = environment.API_URL + 'api/products';

    // private tokenurl = "https://ussouthcentral.services.azureml.net/workspaces/9c779408ee4648c69d1ed63da9815d25/services/da2d8f8091cd4bbba9e0b36a5e44dc80/execute?api-version=2.0&format=swagger";

    // private accesstoken = sessionStorage.getItem('token');
    // private token: string = 'Bearer CZCYnxE4xw/sfiDgZA0QTgTWqH01NfnmwIiPhWxnpkkrj7xBtRobyE91PxDAUTiWHLHoIggLLgcyh9LjjixHOw=='



    //     getToken(formData): Observable<TokenCreate> {

    //         let headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.token }); // ... Set content type to JSON
    //         let options = new RequestOptions({ headers: headers }); // Create a request option
    // let headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.token });
    //         return this.http.post(`${this.tokenurl}`, formData, options) // ...using post request
    //             .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    //             .catch(this.handleError); //...errors if any
    //     }




    getOrganizations(): Observable<OrganizationResult[]> {
        return this.http.get(`${this.OrgUrl}/${'Getorganizationts'}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }




    // posthistory(body: Object): Observable<historyResult> {

    //     let bodyString = JSON.stringify(body); // Stringify payload
    //     let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token }); // ... Set content type to JSON
    //     let options = new RequestOptions({ headers: headers }); // Create a request option

    //     return this.http.post(`${this.historyurl}/${'postcandidatehistory'}`, body, options) // ...using post request
    //         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    //         .catch(this.handleError); //...errors if any
    // }

    updateEmp(Id: string, body: Object): Observable<EmpResult> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.EmpUrl}/${'Putemp'}/${Id}`, body, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }
    updateOrg(Id: string, body: Object): Observable<OrganizationResult> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.OrgUrl}/${'putorganizationt'}/${Id}`, body, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    updateInvoice(Id: string, body: Object): Observable<InvoiceResult> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.invoiceUrl}/${'putinvoice'}/${Id}`, body, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    postemail(body: Object): Observable<InvoiceResult> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.invoiceUrl}/${'invoicemail'}`, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    getInvoice(): Observable<InvoiceResult[]> {

        return this.http.get(`${this.invoiceUrl}/${'getinvoices'}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }

    getInvoiceById(id: string): Observable<InvoiceResult> {

        return this.http.get(`${this.invoiceUrl}/${'getinvoice'}/${id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }
    getInvoiceProductsById(id: string): Observable<InvoiceproductResult[]> {

        return this.http.get(`${this.invoiceproductUrl}/${'getproductbyinvoiceid'}/${id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }
    getProducts(): Observable<InvoiceproductResult[]> {

        return this.http.get(`${this.invoiceproductUrl}/${'getProducts'}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }
    postproduct(body: Object): Observable<InvoiceproductResult> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.invoiceproductUrl}/${'PostProduct'}`, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }
    postInvoice(body: Object): Observable<InvoiceResult> {

        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.invoiceUrl}/${'postinvoice'}`, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    postInvoiceEmail(body: Object): Observable<InvoiceResult> {

        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.invoiceUrl}/${'invoicemail'}`, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    //  let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token }); // ... Set content type to JSON
    postDayview(body: Object): Observable<DayviewResult> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.DayUrl}/${'Postdayview'}`, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    updateDayview(Id: string, body: Object): Observable<DayviewResult> {

        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.DayUrl}/${'Putdayview'}/${Id}`, body, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    getDayviewweekreport(id: string): Observable<DayviewResult[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.get(`${this.DayUrl}/${'dayviewreport'}/${id}`, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }


    getDayviewweekreportbyorgid(): Observable<DayviewResult[]> {
        return this.http.get(`${this.DayUrl}/${'dayviewreport1'}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }


    getdayviewById(id: string): Observable<DayviewResult> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.get(`${this.DayUrl}/${'getdayview'}/${id}`, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }
    Getdayviewbyempid(id: string): Observable<DayviewResult[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.get(`${this.DayUrl}/${'Getdayviewbyempid'}/${id}`, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }

    getdayviewById1(id: string): Observable<DayviewResult[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.get(`${this.DayUrl}/${'getdayview'}/${id}`, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }
    //dayview get
    getDayview(): Observable<DayviewResult[]> {
        return this.http.get(`${this.DayUrl}/${'getdayviews'}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }

    getdayview(): Observable<DayviewResult[]> {
        return this.http.get(`${this.DayUrl}/${'dayview'}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }
    // dayview by date
    getDayview1(): Observable<DayviewResult[]> {
        return this.http.get(`${this.DayUrl}/${'getdayviews1'}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }


    // week data   on search
    postweekdata(body: Object): Observable<DaydataResult> {

        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.DayUrl}/${'ViewDuration'}`, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }



    postdayviewsdata(body: Object): Observable<DaydataResult> {

        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.DayUrl}/${'Postdayviewsdata'}`, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    postweekviewsdata(body: Object): Observable<WeekdataResult> {

        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.DayUrl}/${'postSearchbar'}`, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    // EmpUrl post

    postEmp(body: Object): Observable<EmpResult> {

        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.EmpUrl}/${'Postemp'}`, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    //EmpUrl get
    getEmp(): Observable<EmpResult[]> {
        return this.http.get(`${this.EmpUrl}/${'getemps'}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }

    getActiveemps(): Observable<EmpResult[]> {
        return this.http.get(`${this.EmpUrl}/${'getactiveemps'}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }

    getInActiveemps(): Observable<EmpResult[]> {
        return this.http.get(`${this.EmpUrl}/${'getinactiveemps'}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }
    UploadImage(Id: string, body: any): Observable<EmpResult> {


        //let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.EmpUrl}/${'ImageUpload'}/${Id}`, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));//...errors if any
    }


    GetempsById(id: string): Observable<EmpResult> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.get(`${this.EmpUrl}/${'getemp'}/${id}`, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }
    GetempById(id: string): Observable<EmpResult> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.get(`${this.EmpUrl}/${'getemp'}/${id}`, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }
    getempsByorgId(id: string): Observable<EmpResult[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.get(`${this.EmpUrl}/${'getempsByorgid'}/${id}`, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }



    // OrgUrl post




    postOrg(body: Object): Observable<OrganizationResult> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.OrgUrl}/${'Postorganizationt'}`, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }


    //OrgUrl get
    getOrg(): Observable<OrganizationResult[]> {
        return this.http.get(`${this.OrgUrl}/${'getorganizationt'}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }

    getOrgById(id: string): Observable<OrganizationResult> {

        return this.http.get(`${this.OrgUrl}/${'getorganizationt'}/${id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }

    postProfile(body: Object): Observable<RegisterResult> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(`${this.OrgUrl}/${'Postorganizationt'}`, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }
    updateProfile(Id: string, body: Object): Observable<RegisterResult> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.put(`${this.OrgUrl}/${'Putorganizationt'}/${Id}`, body, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    forgotPassword(body: Object): Observable<CustomMessage> {

        // let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(`${this.EmpUrl}/${'forgotpassword'}`, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    resetPassword(Id: string, body: Object): Observable<CustomMessage> {

        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.EmpUrl}/${'resetpassword'}?endata=${Id}`, body, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    // private handleError(error: Response) {
    //     console.error(error);
    //     return Observable.throw(error.json().error || 'Server error');
    // }
    private handleError(error: Response) {

        console.error(error);
        return Observable.throw(error || 'Server error');
    }

    //dayview post




    //    postDayviewweekreport(body: Object): Observable<DayviewResult> {
    //         let bodyString = JSON.stringify(body); // Stringify payload
    //         let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //         let options = new RequestOptions({ headers: headers }); // Create a request option

    //         return this.http.post(`${this.DayUrl}/${'dayviewreport'}`, body, options) // ...using post request
    //             .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    //             .catch(this.handleError); //...errors if any
    //     }





    // getDayviewweekreportbyorgid(id: string): Observable<DayviewResult[]> {
    //         let headers = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
    //         let options = new RequestOptions({ headers: headers }); // Create a request option
    //         return this.http.get(`${this.DayUrl}/${'dayviewreport1'}`, options)
    //             .map((res: Response) => res.json())
    //             .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    //     }


    //weekview post

    // postWeekview(body: Object): Observable<WeekViewResult> {
    //     let bodyString = JSON.stringify(body); // Stringify payload
    //     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options = new RequestOptions({ headers: headers }); // Create a request option

    //     return this.http.post(`${this.WeekUrl}/${'Postweekview'}`, body, options) // ...using post request
    //         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    //         .catch(this.handleError); //...errors if any
    // }


    //weekview get

    // getWeekview(): Observable<WeekViewResult[]> {
    //     return this.http.get(`${this.WeekUrl}/${'getweekviews'}`)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    // }

    // timesheetview post

    // postTimesheetview(body: Object): Observable<TimesheetviewResult> {
    //     let bodyString = JSON.stringify(body); // Stringify payload
    //     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options = new RequestOptions({ headers: headers }); // Create a request option

    //     return this.http.post(`${this.TimesheetUrl}/${'Posttimesheet'}`, body, options) // ...using post request
    //         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    //         .catch(this.handleError); //...errors if any
    // }


    //timesheetview get
    // getTimesheetview(): Observable<TimesheetviewResult[]> {
    //     return this.http.get(`${this.TimesheetUrl}/${'gettimesheets'}`)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    // }

    //timeoff post

    // postTimeoff(body: Object): Observable<TimeoffResult> {
    //     let bodyString = JSON.stringify(body); // Stringify payload
    //     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options = new RequestOptions({ headers: headers }); // Create a request option

    //     return this.http.post(`${this.TimeoffUrl}/${'Posttimeoff'}`, body, options) // ...using post request
    //         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    //         .catch(this.handleError); //...errors if any
    // }


    //timeoff get

    // getTimeoff(): Observable<TimeoffResult[]> {
    //     return this.http.get(`${this.TimeoffUrl}/${'gettimeoffs'}`)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    // }


    //ExpensesheetUrl post

    // postExpensesheet(body: Object): Observable<ExpensesheetResult> {
    //     let bodyString = JSON.stringify(body); // Stringify payload
    //     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options = new RequestOptions({ headers: headers }); // Create a request option

    //     return this.http.post(`${this.ExpensesheetUrl}/${'Postexpensesheet'}`, body, options) // ...using post request
    //         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    //         .catch(this.handleError); //...errors if any
    // }


    // //ExpensesheetUrl get
    // getExpensesheet(): Observable<ExpensesheetResult[]> {
    //     return this.http.get(`${this.ExpensesheetUrl}/${'getexpensesheets'}`)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    // }
    //AddExpensesheetUrl post

    // postAddexpensesheet(body: Object): Observable<AddexpensesheetResult> {
    //     let bodyString = JSON.stringify(body); // Stringify payload
    //     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options = new RequestOptions({ headers: headers }); // Create a request option

    //     return this.http.post(`${this.AddexpensesheetUrl}/${'Postaddexpensesheet'}`, body, options) // ...using post request
    //         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    //         .catch(this.handleError); //...errors if any
    // }


    // //Add ExpensesheetUrl get
    // getAddexpensesheet(): Observable<AddexpensesheetResult[]> {
    //     return this.http.get(`${this.AddexpensesheetUrl}/${'getaddexpensesheets'}`)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    // }

    // //MyprojectUrl post

    // postMyproject(body: Object): Observable<MyprojectResult> {
    //     let bodyString = JSON.stringify(body); // Stringify payload
    //     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options = new RequestOptions({ headers: headers }); // Create a request option

    //     return this.http.post(`${this.MyprojectUrl}/${'Postmyproject'}`, body, options) // ...using post request
    //         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    //         .catch(this.handleError); //...errors if any
    // }


    // //MyprojectUrl get

    // getMyproject(): Observable<MyprojectResult[]> {
    //     return this.http.get(`${this.MyprojectUrl}/${'getmyprojects'}`)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    // }

    // // MytaskUrl post

    // postMytask(body: Object): Observable<MytaskResult> {
    //     let bodyString = JSON.stringify(body); // Stringify payload
    //     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options = new RequestOptions({ headers: headers }); // Create a request option

    //     return this.http.post(`${this.MytaskUrl}/${'Postmytask'}`, body, options) // ...using post request
    //         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    //         .catch(this.handleError); //...errors if any
    // }


    // //MytaskUrl get
    // getMytask(): Observable<MytaskResult[]> {
    //     return this.http.get(`${this.MytaskUrl}/${'getmytasks'}`)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    // }

    // //users post

    // postWeekview (body: Object): Observable<DayviewResult> {
    //         let bodyString = JSON.stringify(body); // Stringify payload
    //         let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //         let options = new RequestOptions({ headers: headers }); // Create a request option

    //         return this.http.post(`${this.DayUrl}/${'Postdayview'}`, body, options) // ...using post request
    //                          .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    //                          .catch(this.handleError); //...errors if any
    //      }


    // //users get

    //  getWeekview(): Observable<WeekViewResult[]> {
    //         return this.http.get(`${this.WeekUrl}/${'getweekviews'}`)
    //             .map((res: Response) => res.json())
    //             .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    //     }







    // getempsByorgId(id: string): Observable<EmpResult> {
    //         let headers = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
    //         let options = new RequestOptions({ headers: headers }); // Create a request option
    //         return this.http.get(`${this.EmpUrl}/${'getemps'}/${id}`, options)
    //             .map((res: Response) => res.json())
    //             .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    //     }



    // getInvoice(): Observable<InvoiceResult[]> {
    //     return this.http.get(`${this.invoiceUrl}/${'getinvoices'}`)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    // }
    // getRequests(): Observable<RegisterResult[]> {
    //     return this.http.get(`${this.OrgUrl}/${'getorganizationt'}`)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    // }
    // getRequestsById(id: string): Observable<RegisterResult> {
    //     return this.http.get(`${this.OrgUrl}/${'getorganizationt'}/${id}`)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    // }

    // thirdPartyLogin(body: Object): Observable<RegisterResult> {
    //     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options = new RequestOptions({ headers: headers }); // Create a request option
    //     return this.http.post(`${this.accounturl}/${'ThirdPartyLogin'}`, body, options) // ...using post request
    //         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    //         .catch(this.handleError); //...errors if any
    // }


}