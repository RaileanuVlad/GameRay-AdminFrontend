export class Developer {
  id: number;
  name: string;
  website: string;
  country: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
