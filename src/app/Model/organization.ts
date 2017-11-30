export class Organization {
    constructor(

        public FirstName: string,
        public LastName: string,
        public Email: string,
        public Gender: string,
        public Address: string,
        public City: any,
        public State: string,
        public ProfilePic: any,
        public Zipcode: any,
        public Type: string,
        public Password: string,
        public Mode: string,
        public LoginType: string,
        public ContactNumber:string,
        // public Active: string,
    ) { }
}

export class OrganizationResult {
    constructor(
        public Id: string,
        public FirstName: string,
        public LastName: string,
        public Email: string,
        public Gender: string,
        public Address: string,
        public City: any,
        public State: string,
        public ProfilePic: any,
        public Zipcode: any,
        public Type: string,
        public Password: string,
        public Mode: string,
        public LoginType: string,
        public Active: string,
        public ContactNumber:string,


    ) { }
}

export class CustomMessage{
    constructor(
        public Message:string
    ){}
}

