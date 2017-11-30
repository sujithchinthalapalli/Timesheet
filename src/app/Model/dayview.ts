export class Dayview {
    constructor(
        public Client: string,
        public Project: string,
        public Task: string,
        public StartTime: any,
        public EndTime: any,
        public Hours: any,
        public Notes: string,
        public Remarks: string,
        public CreatedOn: any,
        public Days: any,
        public EmpId: any,
        public EmpName: any





    ) { }
}



export class DayviewResult {
    constructor(
        public Id: string,
        public Client: string,
        public Project: string,
        public Task: string,
        public StartTime: any,
        public EndTime: any,
        public Hours: any,
        public Notes: string,
        public Remarks: string,
       public CreatedOn: any,
        public EmpId: any,
          public EmpName: any


    ) { }
}