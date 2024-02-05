interface IRate {
  rate: number;
  count: number;
}

export interface IECommerce {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string; // change it to Enum
  image: string;
  rating: IRate;
}
