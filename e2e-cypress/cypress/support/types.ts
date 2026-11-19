export interface User {
  username: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}
