import RecentProduct1 from './assets/products/recentProduct1.png';
import RecentProduct2 from './assets/products/recentProduct2.png';
import Product1 from './assets/products/Product1.png';
import Product2 from './assets/products/Product2.png';
import Product3 from './assets/products/Product3.png';
import Product4 from './assets/products/Product4.png';
import Product5 from './assets/products/Product5.png';
import Product6 from './assets/products/Product6.png';
import Product7 from './assets/products/Product7.png';
import Product8 from './assets/products/Product8.png';
import Product9 from './assets/products/Product9.png';
import Product10 from './assets/products/Product10.png';

export interface RecentProducts {
  id: number;
  productName: string;
  productPrice?: string;
  productCategory: string;
  productTag?: string;
  productTotalReview: number;
  productRating?: number;
  productImage: string;
  price: number;
  quantity?: number;
}

export const allProducts: Array<RecentProducts> = [
  {
    id: 1,
    productName: "Women's Double G Leather heels in black",
    productPrice: "₦65,700.00",
    productCategory: "Shoes",
    productTag: "Best Seller",
    productTotalReview: 243,
    productImage: Product1,
    price: 65700,
  },
  {
    id: 2,
    productName: "New balance Women's Double G Leather heels in nude",
    productPrice: "₦65,700.00",
    productCategory: "Shoes",
    productTag: "Best Seller",
    productTotalReview: 243,
    productImage: Product2,
    price: 65700,
  },
  {
    id: 3,
    productName: "Gucci Women's Double G Leather heels in flower",
    productPrice: "₦65,700.00",
    productCategory: "Shoes",
    productTag: "Best Seller",
    productTotalReview: 243,
    productImage: Product3,
    price: 65700,
  },
  {
    id: 4,
    productName: "Gucci Women's Double G Leather boot in mix color",
    productPrice: "₦65,700.00",
    productCategory: "Shoes",
    productTag: "Best Seller",
    productTotalReview: 243,
    productImage: Product4,
    price: 65700,
  },
  {
    id: 5,
    productName: "New balance Women's Double G Leather flat in marron",
    productPrice: "₦65,700.00",
    productCategory: "Shoes",
    productTag: "Best Seller",
    productTotalReview: 243,
    productImage: Product5,
    price: 65700,
  },
  {
    id: 6,
    productName: "Gucci Women's Double G Leather heels in glitter gold",
    productPrice: "₦65,700.00",
    productCategory: "Shoes",
    productTag: "Best Seller",
    productTotalReview: 243,
    productImage: Product6,
    price: 65700,
  },
  {
    id: 7,
    productName: "New balance Women's Double G Leather heels in black",
    productPrice: "₦65,700.00",
    productCategory: "Shoes",
    productTag: "Best Seller",
    productTotalReview: 243,
    productImage: Product7,
    price: 65700,
  },
  {
    id: 8,
    productName: "Gucci Women's Double G Leather sneakers in black",
    productPrice: "₦65,700.00",
    productCategory: "Shoes",
    productTag: "Best Seller",
    productTotalReview: 243,
    productImage: Product8,
    price: 65700,
  },
  {
    id: 9,
    productName: "Gucci Women's Double G Leather flat in black",
    productPrice: "₦65,700.00",
    productCategory: "Shoes",
    productTag: "Best Seller",
    productTotalReview: 243,
    productImage: Product9,
    price: 65700,
  },
  {
    id: 10,
    productName: "New balance Women's Double G Leather heels in red",
    productPrice: "₦65,700.00",
    productCategory: "Shoes",
    productTag: "Best Seller",
    productTotalReview: 243,
    productImage: Product10,
    price: 65700,
  },
]

export const recentProducts: Array<RecentProducts> = [
  {
    id: 1,
    productName: "Men culler shirt",
    productPrice: "₦65,700.00",
    productCategory: "Cloth",
    productTag: "Best Sellet",
    productTotalReview: 243,
    productImage: RecentProduct1,
    price: 65700,
  },
  {
    id: 2,
    productName: "Men culler shirt",
    productPrice: "₦65,700.00",
    productCategory: "Cloth",
    productTag: "Best Sellet",
    productTotalReview: 243,
    productImage: RecentProduct1,
    price: 65700,
  },
  {
    id: 3,
    productName: "flower white shoe",
    productPrice: "₦65,700.00",
    productCategory: "Cloth",
    productTag: "Best Sellet",
    productTotalReview: 243,
    productImage: RecentProduct2,
    price: 65700,
  },
]
