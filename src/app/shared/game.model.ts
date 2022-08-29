export class Game {
  id: number;
  name: string;
  price: number;
  description: string;
  minReq: string;
  recReq: string;
  imgLink: string;
  banLink: string;
  views: number;
  sale: number;
  copiesSold: number;
  platform: string;
  developerId: number;
  developerName: string;
  categoryId: number[];
  categoryName: string[];

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
