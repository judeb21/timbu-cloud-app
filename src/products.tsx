import RecentProduct1 from './assets/products/recentProduct1.png';
import RecentProduct2 from './assets/products/recentProduct2.png';

export interface RecentProducts {
  id?: number;
  productName: string;
  productPrice: string;
  productCategory: string;
  productTag: string;
  productTotalReview: number;
  productRating?: number;
  productImage: string;
}

export const recentProducts: Array<RecentProducts> = [
  {
    id: 1,
    productName: "Men culler shirt",
    productPrice: "₦6500,700.00",
    productCategory: "Cloth",
    productTag: "Best Sellet",
    productTotalReview: 243,
    productImage: RecentProduct1,
  },
  {
    id: 2,
    productName: "Men culler shirt",
    productPrice: "₦6500,700.00",
    productCategory: "Cloth",
    productTag: "Best Sellet",
    productTotalReview: 243,
    productImage: RecentProduct1,
  },
  {
    id: 3,
    productName: "flower white shoe",
    productPrice: "₦6500,700.00",
    productCategory: "Cloth",
    productTag: "Best Sellet",
    productTotalReview: 243,
    productImage: RecentProduct2,
  },
]