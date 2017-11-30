export class Daydata {
    constructor(
       public Id: any,
       public Date: any



    ) { }
}

export class DaydataResult {
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
          public EmpName: any

       


    ) { }
}