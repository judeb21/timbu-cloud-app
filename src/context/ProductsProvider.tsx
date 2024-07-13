import {
  createContext,
  ReactElement,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ProductListArray, ProductType } from "../types/productInterface";
import { timbuGetData } from "../helpers/request";

type ProductStateType = {
  products: Array<ProductType>;
  productList: ProductListArray;
  totalPages: number;
};

export type productPayload = {
  searchValue?: string;
  category_id?: string;
  page?: number;
};

const organization_id = import.meta.env.VITE_TIMBU_ORG_ID;

const app_key = import.meta.env.VITE_TIMBU_APP_KEY;

const app_id = import.meta.env.VITE_TIMBU_APP_ID;

const initProductState: ProductStateType = {
  products: [],
  productList: {} as ProductListArray,
  totalPages: 1,
};

const useProductContext = (initProductState: ProductStateType) => {
  const [products, setProducts] = useState<ProductType[]>(
    initProductState.products
  );
  const [productResponse, setProductResponse] = useState<ProductListArray>(
    initProductState.productList
  );
  const [pageLoading, setPageLoading] = useState(false);
  const [totalPages, setTotalPagination] = useState(
    initProductState.totalPages
  );

  const getProducts = useCallback(async (): Promise<ProductListArray> => {
    setPageLoading(true);
    const data: Promise<ProductListArray> = await timbuGetData(
      `/products?organization_id=${organization_id}&reverse_sort=false&page=1&size=10&Appid=${app_id}&Apikey=${app_key}`
    ).catch((err) => {
      if (err) {
        setPageLoading(false);
        console.log(err?.response?.statusText);
      }
    });

    return data;
  }, []);

  useEffect(() => {
    getProducts().then((products) => {
      setProductResponse(products);
      setProducts(products?.items.map((product) => {
        return { ...product }
      }));
      setPageLoading(false);
      setTotalPagination(Math.ceil(products.total / products.size));
    });
  }, []);

  const fetchProducts = useCallback(
    async (payload: productPayload): Promise<ProductListArray> => {
      setPageLoading(true);
      const data: Promise<ProductListArray> = await timbuGetData(
        `/products?category_id=${payload?.category_id}&organization_id=${organization_id}&reverse_sort=false&page=${payload?.page}&size=10&Appid=${app_id}&Apikey=${app_key}`
      ).catch((err) => {
        if (err) {
          setPageLoading(false);
          console.log(err?.response?.statusText);
        }
      });

      return data;
    },
    []
  );

  const getPaginatedProducts = (payload: productPayload) => {
    fetchProducts(payload).then((products) => {
      setProductResponse(products);
      setProducts(products?.items.map((product) => {
        return { ...product, unitPrice: product?.current_price }
      }));
      setPageLoading(false);
      setTotalPagination(Math.ceil(products.total / products.size));
    });
  };

  const hasNexPage = productResponse.next_page !== null;
  const hasPreviousPage = productResponse.previous_page !== null;

  return {
    products,
    productResponse,
    totalPages,
    hasNexPage,
    hasPreviousPage,
    pageLoading,
    getPaginatedProducts,
  };
};

export type UseProductsContextType = ReturnType<typeof useProductContext>;

const initProductContextState: UseProductsContextType = {
  products: [],
  productResponse: {} as ProductListArray,
  totalPages: 1,
  hasNexPage: false,
  hasPreviousPage: false,
  pageLoading: false,
  getPaginatedProducts: () => {},
};

export const ProductsContext = createContext<UseProductsContextType>(
  initProductContextState
);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <ProductsContext.Provider value={useProductContext(initProductState)}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
