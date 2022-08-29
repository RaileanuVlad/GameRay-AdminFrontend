export class UserGame {
   id: number;
   email: string;
   name: string;
   price: number;
   gameKey: string;
   date: string;
   userId: number;
   gameId: number;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
