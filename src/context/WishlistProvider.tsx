import { ReactElement, createContext, useMemo, useReducer } from "react";
import { ProductType } from "../types/productInterface";

type WishlistStateType = { wishlist: Array<ProductType> };

const initWishlistState: WishlistStateType = { wishlist: [] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  REFRESH: "REFRESH",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: ProductType;
};

const reducer = (
  state: WishlistStateType,
  action: ReducerAction
): WishlistStateType => {
  if (action.type === REDUCER_ACTION_TYPE.REFRESH) {
    const localWishlistStr = localStorage.getItem("timbu-wishlist");
    const localWishlist: ProductType[] = JSON.parse(localWishlistStr as string);

    if (localWishlist !== null) {
      const list: ProductType[] = localWishlist;

      return {
        ...state,
        wishlist: [...list],
      };
    }

    return {
      ...state,
      wishlist: [],
    };
  }

  if (action.type === REDUCER_ACTION_TYPE.ADD) {
    if (!action.payload) throw new Error("payload is mission in ADD action");

    const list: ProductType[] = state.wishlist;
    list.push(action.payload);
    localStorage.setItem('timbu-wishlist', JSON.stringify(list));

    return {
      ...state,
      wishlist: [...list],
    };
  }

  if (action.type === REDUCER_ACTION_TYPE.REMOVE) {
    if (!action.payload) throw new Error("payload is mission in REMOVE action");

    const { id } = action.payload;

    const filteredList: ProductType[] = state.wishlist.filter(
      (item) => item.id !== id
    );

    localStorage.setItem('timbu-wishlist', JSON.stringify(filteredList));

    return { ...state, wishlist: [...filteredList] };
  }

  throw new Error("Unknown reducer action type");
};

const useWishlistContext = (initWishlistState: WishlistStateType) => {
  const [state, remit] = useReducer(reducer, initWishlistState);

  const WISHLIST_REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalWishlistItems: number = state.wishlist.length;

  const wishlist = state.wishlist.sort((a, b) => {
    const itemA = a.id;
    const itemB = b.id;
    return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
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
