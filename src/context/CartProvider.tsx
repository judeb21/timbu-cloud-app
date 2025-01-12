import { ReactElement, createContext, useMemo, useReducer } from "react";
import { ProductDetailType, ProductType } from "../types/productInterface";

type CartStateType = { cart: Array<ProductType> };

const initCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  SUBMIT: "SUBMIT",
  QUANTITY: "QUANTITY",
  REFRESH: "REFRESH",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: ProductDetailType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  if (action.type === REDUCER_ACTION_TYPE.REFRESH) {
    const localWishlistStr = localStorage.getItem("timbu-cart");
    const localWishlist: ProductType[] = JSON.parse(localWishlistStr as string);

    if (localWishlist !== null) {
      const list: ProductType[] = localWishlist;

      return {
        ...state,
        cart: [...list],
      };
    }

    return {
      ...state,
      cart: [],
    };
  }
  
  if (action.type === REDUCER_ACTION_TYPE.ADD) {
    if (!action.payload) throw new Error("payload is mission in ADD action");

    const list: ProductType[] = state.cart;
    list.push(action.payload);
    localStorage.setItem('timbu-cart', JSON.stringify(list));

    return {
      ...state,
      cart: [
        ...list,
      ],
    };
  }

  if (action.type === REDUCER_ACTION_TYPE.REMOVE) {
    if (!action.payload) throw new Error("payload is mission in REMOVE action");

    const { id } = action.payload;

    const filteredCart: ProductType[] = state.cart.filter(
      (item) => item.id !== id
    );

    localStorage.setItem('timbu-cart', JSON.stringify(filteredCart));

    return { ...state, cart: [...filteredCart] };
  }

  if (action.type === REDUCER_ACTION_TYPE.QUANTITY) {
    if (!action.payload) {
      throw new Error("action.payload missing in QUANTITY action");
    }

    const { id, quantity } = action.payload;

    const itemExists: ProductDetailType | ProductType | undefined = state.cart.find(
      (item) => item.id === id
    );

    if (!itemExists) {
      throw new Error("Item must exist in order to update quantity");
    }

    const updatedItem: ProductDetailType = { ...itemExists, quantity, current_price: itemExists?.current_price as number};

    const filteredCart: ProductType[] = state.cart.filter(
      (item) => item.id !== id
    );

    return { ...state, cart: [...filteredCart, updatedItem] };
  }

  if (action.type === REDUCER_ACTION_TYPE.SUBMIT) {
    localStorage.setItem('timbu-cart', JSON.stringify([]));
    return { ...state, cart: [] };
  }

  throw new Error("Unknown reducer action type");
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems: number = state.cart.reduce((prevValue, cartItem) => {
    return prevValue + Number(cartItem.quantity);
  }, 0);

  const totalPrice = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + Number(cartItem.quantity) * Number(cartItem.current_price);
  }, 0);

  const cart = state.cart.sort((a, b) => {
    const itemA = a.id;
    const itemB = b.id;
    return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
  });

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: 0,
  cart: [],
};

export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
