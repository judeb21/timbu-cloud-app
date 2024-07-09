import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";
import "./pages.scss";
import { NavLink, useNavigate } from "react-router-dom";
import NotFound from "../components/ui/NotFound";
import useWishlist from "../hooks/useWishlist";
import { RecentProducts } from "../products";

function ProductWishlist() {
  const { remit, WISHLIST_REDUCER_ACTIONS, wishlist } = useWishlist();
  const navigate = useNavigate();

  const goToHomePage = () => {
    return navigate(`/`);
  };

  const goToProduct = (id: number) => {
    return navigate(`/product-details/${id}`);
  };

  const removeWishListItem = (item: RecentProducts) =>
    remit({
      type: WISHLIST_REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

  return (
    <>
      <div>
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
                      <article className="product--card" key={index}>
                        <div className="product--card__article">
                          <NavLink
                            to={`/product-details/${product?.id}`}
                            className="product--card__image"
                          >
                            <img
                              src={product?.productImage}
                              alt="Product image"
                              onClick={() => goToProduct(product.id)}
                            />
                          </NavLink>
                          <div className="product--card__content">
                            <h5>{product.productName}</h5>
                            <p>
                              <span>{product.productTag}</span>
                              <span>{product.productCategory}</span>
                            </p>
                            <h4>{product.productPrice}</h4>
                          </div>
                        </div>
                        <button
                          className="product--card__wishlist animated"
                          onClick={() => removeWishListItem(product)}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17.6568 10.698H17.6318C17.2178 10.683 16.8928 10.337 16.9068 9.92298C16.9388 8.97198 16.4738 8.35498 15.6628 8.27198C15.2508 8.22998 14.9508 7.86198 14.9928 7.44998C15.0358 7.03898 15.4058 6.73598 15.8158 6.77998C17.4238 6.94398 18.4648 8.22698 18.4058 9.97298C18.3918 10.379 18.0588 10.698 17.6568 10.698ZM17.5748 3.28398C15.8548 2.73398 13.4738 2.96198 11.9878 4.64798C10.4268 2.97398 8.12679 2.73098 6.41879 3.28498C2.50379 4.54498 1.28279 9.08098 2.39679 12.56V12.561C4.15479 18.032 9.99979 20.983 12.0018 20.983C13.7888 20.983 19.8658 18.087 21.6038 12.56C22.7178 9.08198 21.4938 4.54598 17.5748 3.28398Z"
                              fill="#4A90E2"
                            />
                          </svg>
                        </button>
                      </article>
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
