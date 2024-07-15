import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";
import "./pages.scss";
import { useNavigate } from "react-router-dom";
import NotFound from "../components/ui/NotFound";
import useWishlist from "../hooks/useWishlist";
import SearchIcon from "../assets/icons/search-icon.svg";
import ProductItem from "../components/ui/ProductItem";

function ProductWishlist() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const goToHomePage = () => {
    return navigate(`/`);
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="mobile--navigation">
            <div className="mobile--navigation__search">
              <img src={SearchIcon} alt="search icon" />
              <input type="text" placeholder="Search product and Brands" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="layout--content">
            <div className="breadcrumbs" onClick={goToHomePage}>
              <div className="breadcrumbs--category">
                <div className="breadcrumbs--category__caret">
                  <img src={LeftCaretIcon} alt="left caret" />
                </div>
                <div className="breadcrumbs--category__name">
                  <span>Product list</span>
                </div>
              </div>
            </div>

            {/* Product wishlist listing */}
            {wishlist.length > 0 ? (
              <div className="product--listing">
                {wishlist.map((product, index) => {
                  return (
                    <>
                      <ProductItem product={product} key={index} />
                    </>
                  );
                })}
              </div>
            ) : (
              <NotFound
                msg={"Oops you have not added any item to your wishlist"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductWishlist;
