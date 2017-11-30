export class Weekdata {
    constructor(
    //    public Id: any,
       public From: any,
       public To: any,



    ) { }
}

export class Wkdata {
    constructor(
       public EmpId: any,
       public Type: any,
       public FromDate: any,
       public ToDate: any,



    ) { }
}


export class WeekdataResult {
    constructor(
         public Client: string,
        public Project: string,
        public Task: string,
        public Start: any,
        public End: any,
        public Hours: any,
        public Notes: string,
        public Remarks: string,
       public CreatedOn: any,
        public EmpId: any,
          public EmpName: any,
          public TotalHours:any,
          
    public resdata:any,

       


    ) { }
}