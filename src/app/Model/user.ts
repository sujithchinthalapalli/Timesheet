export class User {
    constructor(
        public client: string,
        public project: string,
        public task: string,
        public start: string,
        public end: string,
        public duration: any,
        public notes: string




    ) { }
}

export class UserResult {
    constructor(
        public Id: string,
        public client: string,
        public project: string,
        public task: string,
        public start: string,
        public end: string,
        public duration: any,
        public notes: string


    ) { }
}