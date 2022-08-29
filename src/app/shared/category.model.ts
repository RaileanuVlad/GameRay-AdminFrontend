export class Category {
  id: number;
  name: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
