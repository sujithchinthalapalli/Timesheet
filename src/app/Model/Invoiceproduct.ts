export class Invoiceproduct{
    constructor(
       
       public CandidateName:string,
       public Description:string,
       public Account:string,
       public Hours:any,
       public HourlyRate:any,
       public Amount:any,
       public InvoiceId:any,
       public EmpId:any,
    ){}
}

export class InvoiceproductResult{
    constructor(
       public Id:string,
          public CandidateName:string,
       public Description:string,
       public Account:string,
       public Hours:any,
       public HourlyRate:any,
       public Amount:any,
       public InvoiceId:any,
       public EmpId:any,
    ){}
}