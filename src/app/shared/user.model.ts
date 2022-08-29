export class User {
    id: number;
    email: string;
    password: string;
    state: number;
    token?: string;
 
   constructor(input?: any) {
     Object.assign(this, input);
   }
 }
 