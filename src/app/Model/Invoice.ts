export class Invoice{
    constructor(
              public OrgName:string,
       public InvoiceDate:any,
       public InvoiceDueDate:any,
       public InvoiceId:any,
       public OrgId:any,
          public EmpId:any,
          public products:any,
          public Total:any
  
    ){}
}




export class InvoiceResult{
    constructor(
       public Id:any,
        public OrgName:string,
       public InvoiceDate:any,
       public InvoiceDueDate:any,
       public InvoiceId:any,
       public OrgId:any,
          public EmpId:any,
          public products:any,
          public Total:any
         
    //    public VendorId:string
    ){}
}