import { ReactElement, createContext, useMemo, useReducer } from "react";
import { RecentProducts } from "../products";

type WishlistStateType = { wishlist: Array<RecentProducts> };

const initWishlistState: WishlistStateType = { wishlist: [] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: RecentProducts;
};

const reducer = (
  state: WishlistStateType,
  action: ReducerAction
): WishlistStateType => {
  if (action.type === REDUCER_ACTION_TYPE.ADD) {
    if (!action.payload) throw new Error("payload is mission in ADD action");

    const {
      id,
      productName,
      price,
      productCategory,
      productImage,
      productTotalReview,
      productTag,
      productPrice
    } = action.payload;

    const filteredCart: RecentProducts[] = state.wishlist.filter(
      (item) => item.id !== id
    );

    return {
      ...state,
      wishlist: [
        ...filteredCart,
        {
          id,
          productName,
          price,
          productCategory,
          quantity: 1,
          productTotalReview,
          productImage,
          productTag,
          productPrice
        },
      ],
    };
  }

  if (action.type === REDUCER_ACTION_TYPE.REMOVE) {
    if (!action.payload) throw new Error("payload is mission in REMOVE action");

    const { id } = action.payload;

    const filteredCart: RecentProducts[] = state.wishlist.filter(
      (item) => item.id !== id
    );

    return { ...state, wishlist: [...filteredCart] };
  }

  throw new Error("Unknown reducer action type");
};

const useWishlistContext = (initWishlistState: WishlistStateType) => {
  const [state, remit] = useReducer(reducer, initWishlistState);

  const WISHLIST_REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalWishlistItems: number = state.wishlist.reduce((prevValue, cartItem) => {
    return prevValue + Number(cartItem.quantity);
  }, 0);

  const wishlist = state.wishlist.sort((a, b) => {
    const itemA = a.id;
    const itemB = b.id;
    return itemA - itemB;
  });

  return { remit, WISHLIST_REDUCER_ACTIONS, totalWishlistItems, wishlist };
};

export type UseWishlistContextType = ReturnType<typeof useWishlistContext>;

const initWishlistContextState: UseWishlistContextType = {
  remit: () => {},
  WISHLIST_REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalWishlistItems: 0,
  wishlist: [],
};

export const WishlistContext = createContext<UseWishlistContextType>(
  initWishlistContextState
);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const WishlistProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <WishlistContext.Provider value={useWishlistContext(initWishlistState)}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
