import { useContext } from "react";
import WishlistContext, {
  UseWishlistContextType,
} from "../context/WishlistProvider";

const useWishlist = (): UseWishlistContextType => {
  return useContext(WishlistContext);
};

export default useWishlist;
