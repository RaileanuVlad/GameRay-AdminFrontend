export class Admin {
    id: number;
    password: string;
    first: string;
    last: string;
    birth: string;
    email: string;
    phone: string;
    state: number;
    token?: string;
    
 
   constructor(input?: any) {
     Object.assign(this, input);
   }
 }
 