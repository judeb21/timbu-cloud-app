import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import ProductPage from "../pages/Product";
import TimbuProductLayout from "../components/layout/TimbuProductLayout";
import ProductCart from "../pages/ProductCart";
import ProductCheckout from "../pages/ProductCheckout";
import OrderComplete from "../pages/OrderComplete";
import ProductDetail from "../pages/ProductDetail";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<TimbuProductLayout />}>
      <Route path="/">
        <Route index element={<ProductPage />} />
      </Route>
      <Route path="/cart" element={<ProductCart />} />
      <Route path="/checkout" element={<ProductCheckout />} />
      <Route path="/order-complete" element={<OrderComplete />} />
      <Route path="/product-details" element={<ProductDetail />} />
    </Route>
  )
);
