import { NavLink, useNavigate, useParams } from "react-router-dom";
import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";
import "./pages.scss";
import TagIcon from "../assets/icons/tag-icon.svg";
import WishListIcon from "../assets/icons/wishlist-add-icon.svg";
import RemoveWishListIcon from "../assets/icons/wishlist-added-icon.svg";
import ShoppingIcon from "../assets/icons/shopping-icon.svg";
import WalletIcon from "../assets/icons/waller-icon.svg";
import ProfileIcon from "../assets/icons/profile-icon.svg";
import PrimaryButton from "../components/ui/Button/PrimaryButton";
import Avatar from "../assets/products/Avatar.png";
import PurchasedProduct from "../assets/products/referenceBuy.png";
import RefreshIcon from "../assets/icons/refresh-icon.svg";
import { RecentProducts, allProducts, recentProducts } from "../products";
import RecentProductItem from "../components/ui/RecentProductITems";
import useCart from "../hooks/useCart";
import { useState } from "react";
import currencyFormatter from "../helpers/currencyFormatter";
import useWishlist from "../hooks/useWishlist";
import SearchIcon from "../assets/icons/search-icon.svg";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { remit, WISHLIST_REDUCER_ACTIONS, wishlist } = useWishlist();
  const [productInCart, setProductInCart] = useState<boolean>(false);
  const defaultAmount = 70700;
  const [buttonText, setButtonText] = useState("Add to Cart");

  const addToCart = () => {
    const product = allProducts.find(
      (item) => item.id === Number(id)
    ) as RecentProducts;

    const productisInCart = cart.findIndex((item) => item.id === Number(id));
    if (productisInCart === 0) {
      setProductInCart(true);
      setButtonText("Product is in cart");
      return;
    }

    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: {
        ...product,
        quantity: 1,
      },
    });
    setProductInCart(true);
    setButtonText("Product is in cart");
  };

  const goToHomePage = () => {
    return navigate(`/`);
  };

  const productDetails = allProducts.find(
    (item) => item.id === Number(id)
  ) as RecentProducts;

  const addToWishList = (id: number) => {
    const product = allProducts.find(
      (item) => item.id === Number(id)
    ) as RecentProducts;

    const productisInWish = wishlist.findIndex(
      (item) => item.id === Number(id)
    );

    const wishlistProduct = wishlist.find((item) => item.id === id);

    if (productisInWish === 0) {
      remit({
        type: WISHLIST_REDUCER_ACTIONS.REMOVE,
        payload: wishlistProduct,
      });

      return;
    }

    remit({
      type: WISHLIST_REDUCER_ACTIONS.ADD,
      payload: {
        ...product,
        quantity: 1,
      },
    });
    return;
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
            <div className="breadcrumbs">
              <div className="breadcrumbs--category" onClick={goToHomePage}>
                <div className="breadcrumbs--category__caret">
                  <img src={LeftCaretIcon} alt="left caret" />
                </div>
                <div className="breadcrumbs--category__name">
                  <span>Product List</span>
                  <div className="divider"></div>
                  <span>Female Shoe</span>
                  <div className="divider"></div>
                  <span>Product Details</span>
                </div>
              </div>
              <div className="subnav--secondary">
                <NavLink to="/cart">
                  <span>All order</span>
                </NavLink>
              </div>
            </div>

            <div className="product--details">
              <div className="product--overview">
                <div className="product--overview__image">
                  <img
                    src={productDetails?.productImage}
                    alt="product overview image"
                  />
                </div>
                <div className="product--overview__content">
                  <div>
                    <h4>{productDetails?.productName}</h4>
                  </div>

                  <div className="product--rating">
                    <div className="rating">
                      <svg
                        width="84"
                        height="16"
                        viewBox="0 0 84 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.23924 3.14164C7.47872 2.40459 8.52145 2.40459 8.76093 3.14164L9.61659 5.77508C9.72368 6.10469 10.0308 6.32786 10.3774 6.32786H13.1464C13.9214 6.32786 14.2436 7.31955 13.6166 7.77508L11.3765 9.40263C11.0961 9.60634 10.9788 9.96744 11.0859 10.2971L11.9415 12.9305C12.181 13.6675 11.3374 14.2804 10.7104 13.8249L8.47031 12.1974C8.18992 11.9937 7.81025 11.9937 7.52986 12.1974L5.28972 13.8249C4.66275 14.2804 3.81917 13.6675 4.05865 12.9305L4.9143 10.2971C5.0214 9.96744 4.90408 9.60634 4.62369 9.40263L2.38355 7.77508C1.75658 7.31955 2.0788 6.32786 2.85378 6.32786H5.62274C5.96932 6.32786 6.27648 6.10469 6.38358 5.77508L7.23924 3.14164Z"
                          fill="#FFA301"
                        />
                        <path
                          d="M24.2392 3.14164C24.4787 2.40459 25.5214 2.40459 25.7609 3.14164L26.6166 5.77508C26.7237 6.10469 27.0308 6.32786 27.3774 6.32786H30.1464C30.9214 6.32786 31.2436 7.31955 30.6166 7.77508L28.3765 9.40263C28.0961 9.60634 27.9788 9.96744 28.0859 10.2971L28.9415 12.9305C29.181 13.6675 28.3374 14.2804 27.7104 13.8249L25.4703 12.1974C25.1899 11.9937 24.8102 11.9937 24.5299 12.1974L22.2897 13.8249C21.6627 14.2804 20.8192 13.6675 21.0586 12.9305L21.9143 10.2971C22.0214 9.96744 21.9041 9.60634 21.6237 9.40263L19.3836 7.77508C18.7566 7.31955 19.0788 6.32786 19.8538 6.32786H22.6227C22.9693 6.32786 23.2765 6.10469 23.3836 5.77508L24.2392 3.14164Z"
                          fill="#FFA301"
                        />
                        <path
                          d="M41.2392 3.14164C41.4787 2.40459 42.5214 2.40459 42.7609 3.14164L43.6166 5.77508C43.7237 6.10469 44.0308 6.32786 44.3774 6.32786H47.1464C47.9214 6.32786 48.2436 7.31955 47.6166 7.77508L45.3765 9.40263C45.0961 9.60634 44.9788 9.96744 45.0859 10.2971L45.9415 12.9305C46.181 13.6675 45.3374 14.2804 44.7104 13.8249L42.4703 12.1974C42.1899 11.9937 41.8102 11.9937 41.5299 12.1974L39.2897 13.8249C38.6627 14.2804 37.8192 13.6675 38.0586 12.9305L38.9143 10.2971C39.0214 9.96744 38.9041 9.60634 38.6237 9.40263L36.3836 7.77508C35.7566 7.31955 36.0788 6.32786 36.8538 6.32786H39.6227C39.9693 6.32786 40.2765 6.10469 40.3836 5.77508L41.2392 3.14164Z"
                          fill="#FFA301"
                        />
                        <path
                          d="M58.2392 3.14164C58.4787 2.40459 59.5214 2.40459 59.7609 3.14164L60.6166 5.77508C60.7237 6.10469 61.0308 6.32786 61.3774 6.32786H64.1464C64.9214 6.32786 65.2436 7.31955 64.6166 7.77508L62.3765 9.40263C62.0961 9.60634 61.9788 9.96744 62.0859 10.2971L62.9415 12.9305C63.181 13.6675 62.3374 14.2804 61.7104 13.8249L59.4703 12.1974C59.1899 11.9937 58.8102 11.9937 58.5299 12.1974L56.2897 13.8249C55.6627 14.2804 54.8192 13.6675 55.0586 12.9305L55.9143 10.2971C56.0214 9.96744 55.9041 9.60634 55.6237 9.40263L53.3836 7.77508C52.7566 7.31955 53.0788 6.32786 53.8538 6.32786H56.6227C56.9693 6.32786 57.2765 6.10469 57.3836 5.77508L58.2392 3.14164Z"
                          fill="#FFA301"
                        />
                        <path
                          d="M75.2392 3.14164C75.4787 2.40459 76.5214 2.40459 76.7609 3.14164L77.6166 5.77508C77.7237 6.10469 78.0308 6.32786 78.3774 6.32786H81.1464C81.9214 6.32786 82.2436 7.31955 81.6166 7.77508L79.3765 9.40263C79.0961 9.60634 78.9788 9.96744 79.0859 10.2971L79.9415 12.9305C80.181 13.6675 79.3374 14.2804 78.7104 13.8249L76.4703 12.1974C76.1899 11.9937 75.8102 11.9937 75.5299 12.1974L73.2897 13.8249C72.6627 14.2804 71.8192 13.6675 72.0586 12.9305L72.9143 10.2971C73.0214 9.96744 72.9041 9.60634 72.6237 9.40263L70.3836 7.77508C69.7566 7.31955 70.0788 6.32786 70.8538 6.32786H73.6227C73.9693 6.32786 74.2765 6.10469 74.3836 5.77508L75.2392 3.14164Z"
                          fill="#FFA301"
                        />
                      </svg>
                    </div>
                    <span>157 Reviews</span>
                  </div>

                  <div className="product--overview__pricing">
                    <div className="product--overview__price">
                      <p>{currencyFormatter(productDetails?.price)}</p>
                      <span>{currencyFormatter(defaultAmount)}</span>
                    </div>
                    <div className="product--overview__discount">
                      <img src={TagIcon} alt="Tag icon" />
                      <p>Save 50% right now</p>
                    </div>
                  </div>

                  <div className="product--color">
                    <h4>Colors</h4>
                    <div className="product--color__content">
                      <div className="product--color__variations">
                        <label>
                          <input
                            type="radio"
                            name="color"
                            className="product--color__radiant primary"
                          />
                        </label>

                        <label>
                          <input
                            type="radio"
                            name="color"
                            className="product--color__radiant orange"
                          />
                        </label>

                        <label>
                          <input
                            type="radio"
                            name="color"
                            className="product--color__radiant indigo"
                          />
                        </label>

                        <label>
                          <input
                            type="radio"
                            name="color"
                            className="product--color__radiant blue-grey"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="product--color__but">
                    <div className="product--color__main--btn">
                      {productInCart ? (
                        <PrimaryButton
                          className="product--color__button"
                          title={buttonText}
                          disabled
                        />
                      ) : (
                        <PrimaryButton
                          className="product--color__button"
                          title={buttonText}
                          onClick={() => addToCart()}
                        />
                      )}
                    </div>
                    <div
                      className="product--color__wish-button"
                      onClick={() => addToWishList(productDetails?.id)}
                    >
                      {wishlist.some(
                        (item) => item.id === productDetails.id
                      ) ? (
                        <img
                          src={RemoveWishListIcon}
                          alt="Remove wishlist icon"
                        />
                      ) : (
                        <img src={WishListIcon} alt="Add to wishlist icon" />
                      )}
                    </div>
                  </div>

                  <div className="product--extras">
                    <div className="product--extras__content">
                      <img src={ShoppingIcon} alt="wallet icon" />
                      <p>Free shipping worldwide</p>
                    </div>
                    <div className="product--extras__content">
                      <img src={WalletIcon} alt="wallet icon" />
                      <p>100% Secured Payment</p>
                    </div>
                    <div className="product--extras__content">
                      <img src={ProfileIcon} alt="profile icon" />
                      <p>Made by the professionals</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="product--review">
                <div className="product--review__container">
                  <div className="product--review__head">
                    <div className="product--review__header">
                      <h5>Description</h5>
                      <h5 className="active">
                        Reviews <span>157</span>
                      </h5>
                      <h5>Support</h5>
                    </div>

                    <div className="product--review__body">
                      <article className="product--review__card">
                        <div className="product--review__card-avatar">
                          <img src={Avatar} alt="User profile icon" />
                        </div>
                        <div className="product--review__content">
                          <div className="product--review__rating">
                            <svg
                              width="84"
                              height="16"
                              viewBox="0 0 84 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.23924 3.14164C7.47872 2.40459 8.52145 2.40459 8.76093 3.14164L9.61659 5.77508C9.72368 6.10469 10.0308 6.32786 10.3774 6.32786H13.1464C13.9214 6.32786 14.2436 7.31955 13.6166 7.77508L11.3765 9.40263C11.0961 9.60634 10.9788 9.96744 11.0859 10.2971L11.9415 12.9305C12.181 13.6675 11.3374 14.2804 10.7104 13.8249L8.47031 12.1974C8.18992 11.9937 7.81025 11.9937 7.52986 12.1974L5.28972 13.8249C4.66275 14.2804 3.81917 13.6675 4.05865 12.9305L4.9143 10.2971C5.0214 9.96744 4.90408 9.60634 4.62369 9.40263L2.38355 7.77508C1.75658 7.31955 2.0788 6.32786 2.85378 6.32786H5.62274C5.96932 6.32786 6.27648 6.10469 6.38358 5.77508L7.23924 3.14164Z"
                                fill="#FFA301"
                              />
                              <path
                                d="M24.2392 3.14164C24.4787 2.40459 25.5214 2.40459 25.7609 3.14164L26.6166 5.77508C26.7237 6.10469 27.0308 6.32786 27.3774 6.32786H30.1464C30.9214 6.32786 31.2436 7.31955 30.6166 7.77508L28.3765 9.40263C28.0961 9.60634 27.9788 9.96744 28.0859 10.2971L28.9415 12.9305C29.181 13.6675 28.3374 14.2804 27.7104 13.8249L25.4703 12.1974C25.1899 11.9937 24.8102 11.9937 24.5299 12.1974L22.2897 13.8249C21.6627 14.2804 20.8192 13.6675 21.0586 12.9305L21.9143 10.2971C22.0214 9.96744 21.9041 9.60634 21.6237 9.40263L19.3836 7.77508C18.7566 7.31955 19.0788 6.32786 19.8538 6.32786H22.6227C22.9693 6.32786 23.2765 6.10469 23.3836 5.77508L24.2392 3.14164Z"
                                fill="#FFA301"
                              />
                              <path
                                d="M41.2392 3.14164C41.4787 2.40459 42.5214 2.40459 42.7609 3.14164L43.6166 5.77508C43.7237 6.10469 44.0308 6.32786 44.3774 6.32786H47.1464C47.9214 6.32786 48.2436 7.31955 47.6166 7.77508L45.3765 9.40263C45.0961 9.60634 44.9788 9.96744 45.0859 10.2971L45.9415 12.9305C46.181 13.6675 45.3374 14.2804 44.7104 13.8249L42.4703 12.1974C42.1899 11.9937 41.8102 11.9937 41.5299 12.1974L39.2897 13.8249C38.6627 14.2804 37.8192 13.6675 38.0586 12.9305L38.9143 10.2971C39.0214 9.96744 38.9041 9.60634 38.6237 9.40263L36.3836 7.77508C35.7566 7.31955 36.0788 6.32786 36.8538 6.32786H39.6227C39.9693 6.32786 40.2765 6.10469 40.3836 5.77508L41.2392 3.14164Z"
                                fill="#FFA301"
                              />
                              <path
                                d="M58.2392 3.14164C58.4787 2.40459 59.5214 2.40459 59.7609 3.14164L60.6166 5.77508C60.7237 6.10469 61.0308 6.32786 61.3774 6.32786H64.1464C64.9214 6.32786 65.2436 7.31955 64.6166 7.77508L62.3765 9.40263C62.0961 9.60634 61.9788 9.96744 62.0859 10.2971L62.9415 12.9305C63.181 13.6675 62.3374 14.2804 61.7104 13.8249L59.4703 12.1974C59.1899 11.9937 58.8102 11.9937 58.5299 12.1974L56.2897 13.8249C55.6627 14.2804 54.8192 13.6675 55.0586 12.9305L55.9143 10.2971C56.0214 9.96744 55.9041 9.60634 55.6237 9.40263L53.3836 7.77508C52.7566 7.31955 53.0788 6.32786 53.8538 6.32786H56.6227C56.9693 6.32786 57.2765 6.10469 57.3836 5.77508L58.2392 3.14164Z"
                                fill="#FFA301"
                              />
                              <path
                                d="M75.2392 3.14164C75.4787 2.40459 76.5214 2.40459 76.7609 3.14164L77.6166 5.77508C77.7237 6.10469 78.0308 6.32786 78.3774 6.32786H81.1464C81.9214 6.32786 82.2436 7.31955 81.6166 7.77508L79.3765 9.40263C79.0961 9.60634 78.9788 9.96744 79.0859 10.2971L79.9415 12.9305C80.181 13.6675 79.3374 14.2804 78.7104 13.8249L76.4703 12.1974C76.1899 11.9937 75.8102 11.9937 75.5299 12.1974L73.2897 13.8249C72.6627 14.2804 71.8192 13.6675 72.0586 12.9305L72.9143 10.2971C73.0214 9.96744 72.9041 9.60634 72.6237 9.40263L70.3836 7.77508C69.7566 7.31955 70.0788 6.32786 70.8538 6.32786H73.6227C73.9693 6.32786 74.2765 6.10469 74.3836 5.77508L75.2392 3.14164Z"
                                fill="#FFA301"
                              />
                            </svg>
                          </div>

                          <div className="product--review__content-body">
                            <p>
                              What i ordered was exactly what i got. and the
                              delivery was so smooth, packing was top-notch, i
                              totally recommend this{" "}
                            </p>
                            <div className="product--review__content-otherProducts">
                              <img
                                src={PurchasedProduct}
                                alt="customer review other products"
                              />
                              <img
                                src={PurchasedProduct}
                                alt="customer review other products"
                              />
                            </div>
                            <div className="product--review__content-identity">
                              <h6>Kristin Watson</h6>
                              <p>March 14, 2024</p>
                            </div>
                          </div>
                        </div>
                      </article>

                      <article className="product--review__card">
                        <div className="product--review__card-avatar">
                          <img src={Avatar} alt="User profile icon" />
                        </div>
                        <div className="product--review__content">
                          <div className="product--review__rating">
                            <svg
                              width="84"
                              height="16"
                              viewBox="0 0 84 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.23924 3.14164C7.47872 2.40459 8.52145 2.40459 8.76093 3.14164L9.61659 5.77508C9.72368 6.10469 10.0308 6.32786 10.3774 6.32786H13.1464C13.9214 6.32786 14.2436 7.31955 13.6166 7.77508L11.3765 9.40263C11.0961 9.60634 10.9788 9.96744 11.0859 10.2971L11.9415 12.9305C12.181 13.6675 11.3374 14.2804 10.7104 13.8249L8.47031 12.1974C8.18992 11.9937 7.81025 11.9937 7.52986 12.1974L5.28972 13.8249C4.66275 14.2804 3.81917 13.6675 4.05865 12.9305L4.9143 10.2971C5.0214 9.96744 4.90408 9.60634 4.62369 9.40263L2.38355 7.77508C1.75658 7.31955 2.0788 6.32786 2.85378 6.32786H5.62274C5.96932 6.32786 6.27648 6.10469 6.38358 5.77508L7.23924 3.14164Z"
                                fill="#FFA301"
                              />
                              <path
                                d="M24.2392 3.14164C24.4787 2.40459 25.5214 2.40459 25.7609 3.14164L26.6166 5.77508C26.7237 6.10469 27.0308 6.32786 27.3774 6.32786H30.1464C30.9214 6.32786 31.2436 7.31955 30.6166 7.77508L28.3765 9.40263C28.0961 9.60634 27.9788 9.96744 28.0859 10.2971L28.9415 12.9305C29.181 13.6675 28.3374 14.2804 27.7104 13.8249L25.4703 12.1974C25.1899 11.9937 24.8102 11.9937 24.5299 12.1974L22.2897 13.8249C21.6627 14.2804 20.8192 13.6675 21.0586 12.9305L21.9143 10.2971C22.0214 9.96744 21.9041 9.60634 21.6237 9.40263L19.3836 7.77508C18.7566 7.31955 19.0788 6.32786 19.8538 6.32786H22.6227C22.9693 6.32786 23.2765 6.10469 23.3836 5.77508L24.2392 3.14164Z"
                                fill="#FFA301"
                              />
                              <path
                                d="M41.2392 3.14164C41.4787 2.40459 42.5214 2.40459 42.7609 3.14164L43.6166 5.77508C43.7237 6.10469 44.0308 6.32786 44.3774 6.32786H47.1464C47.9214 6.32786 48.2436 7.31955 47.6166 7.77508L45.3765 9.40263C45.0961 9.60634 44.9788 9.96744 45.0859 10.2971L45.9415 12.9305C46.181 13.6675 45.3374 14.2804 44.7104 13.8249L42.4703 12.1974C42.1899 11.9937 41.8102 11.9937 41.5299 12.1974L39.2897 13.8249C38.6627 14.2804 37.8192 13.6675 38.0586 12.9305L38.9143 10.2971C39.0214 9.96744 38.9041 9.60634 38.6237 9.40263L36.3836 7.77508C35.7566 7.31955 36.0788 6.32786 36.8538 6.32786H39.6227C39.9693 6.32786 40.2765 6.10469 40.3836 5.77508L41.2392 3.14164Z"
                                fill="#FFA301"
                              />
                              <path
                                d="M58.2392 3.14164C58.4787 2.40459 59.5214 2.40459 59.7609 3.14164L60.6166 5.77508C60.7237 6.10469 61.0308 6.32786 61.3774 6.32786H64.1464C64.9214 6.32786 65.2436 7.31955 64.6166 7.77508L62.3765 9.40263C62.0961 9.60634 61.9788 9.96744 62.0859 10.2971L62.9415 12.9305C63.181 13.6675 62.3374 14.2804 61.7104 13.8249L59.4703 12.1974C59.1899 11.9937 58.8102 11.9937 58.5299 12.1974L56.2897 13.8249C55.6627 14.2804 54.8192 13.6675 55.0586 12.9305L55.9143 10.2971C56.0214 9.96744 55.9041 9.60634 55.6237 9.40263L53.3836 7.77508C52.7566 7.31955 53.0788 6.32786 53.8538 6.32786H56.6227C56.9693 6.32786 57.2765 6.10469 57.3836 5.77508L58.2392 3.14164Z"
                                fill="#FFA301"
                              />
                              <path
                                d="M75.2392 3.14164C75.4787 2.40459 76.5214 2.40459 76.7609 3.14164L77.6166 5.77508C77.7237 6.10469 78.0308 6.32786 78.3774 6.32786H81.1464C81.9214 6.32786 82.2436 7.31955 81.6166 7.77508L79.3765 9.40263C79.0961 9.60634 78.9788 9.96744 79.0859 10.2971L79.9415 12.9305C80.181 13.6675 79.3374 14.2804 78.7104 13.8249L76.4703 12.1974C76.1899 11.9937 75.8102 11.9937 75.5299 12.1974L73.2897 13.8249C72.6627 14.2804 71.8192 13.6675 72.0586 12.9305L72.9143 10.2971C73.0214 9.96744 72.9041 9.60634 72.6237 9.40263L70.3836 7.77508C69.7566 7.31955 70.0788 6.32786 70.8538 6.32786H73.6227C73.9693 6.32786 74.2765 6.10469 74.3836 5.77508L75.2392 3.14164Z"
                                fill="#FFA301"
                              />
                            </svg>
                          </div>

                          <div className="product--review__content-body">
                            <p>
                              What i ordered was exactly what i got. and the
                              delivery was so smooth, packing was top-notch, i
                              totally recommend this{" "}
                            </p>
                            <div className="product--review__content-identity">
                              <h6>Kristin Watson</h6>
                              <p>March 14, 2024</p>
                            </div>
                          </div>
                        </div>
                      </article>

                      <article className="product--review__card">
                        <div className="product--review__card-avatar">
                          <img src={Avatar} alt="User profile icon" />
                        </div>
                        <div className="product--review__content">
                          <div className="product--review__rating">
                            <svg
                              width="84"
                              height="16"
                              viewBox="0 0 84 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.23924 3.14164C7.47872 2.40459 8.52145 2.40459 8.76093 3.14164L9.61659 5.77508C9.72368 6.10469 10.0308 6.32786 10.3774 6.32786H13.1464C13.9214 6.32786 14.2436 7.31955 13.6166 7.77508L11.3765 9.40263C11.0961 9.60634 10.9788 9.96744 11.0859 10.2971L11.9415 12.9305C12.181 13.6675 11.3374 14.2804 10.7104 13.8249L8.47031 12.1974C8.18992 11.9937 7.81025 11.9937 7.52986 12.1974L5.28972 13.8249C4.66275 14.2804 3.81917 13.6675 4.05865 12.9305L4.9143 10.2971C5.0214 9.96744 4.90408 9.60634 4.62369 9.40263L2.38355 7.77508C1.75658 7.31955 2.0788 6.32786 2.85378 6.32786H5.62274C5.96932 6.32786 6.27648 6.10469 6.38358 5.77508L7.23924 3.14164Z"
                                fill="#FFA301"
                              />
                              <path
                                d="M24.2392 3.14164C24.4787 2.40459 25.5214 2.40459 25.7609 3.14164L26.6166 5.77508C26.7237 6.10469 27.0308 6.32786 27.3774 6.32786H30.1464C30.9214 6.32786 31.2436 7.31955 30.6166 7.77508L28.3765 9.40263C28.0961 9.60634 27.9788 9.96744 28.0859 10.2971L28.9415 12.9305C29.181 13.6675 28.3374 14.2804 27.7104 13.8249L25.4703 12.1974C25.1899 11.9937 24.8102 11.9937 24.5299 12.1974L22.2897 13.8249C21.6627 14.2804 20.8192 13.6675 21.0586 12.9305L21.9143 10.2971C22.0214 9.96744 21.9041 9.60634 21.6237 9.40263L19.3836 7.77508C18.7566 7.31955 19.0788 6.32786 19.8538 6.32786H22.6227C22.9693 6.32786 23.2765 6.10469 23.3836 5.77508L24.2392 3.14164Z"
                                fill="#FFA301"
                              />
                              <path
                                d="M41.2392 3.14164C41.4787 2.40459 42.5214 2.40459 42.7609 3.14164L43.6166 5.77508C43.7237 6.10469 44.0308 6.32786 44.3774 6.32786H47.1464C47.9214 6.32786 48.2436 7.31955 47.6166 7.77508L45.3765 9.40263C45.0961 9.60634 44.9788 9.96744 45.0859 10.2971L45.9415 12.9305C46.181 13.6675 45.3374 14.2804 44.7104 13.8249L42.4703 12.1974C42.1899 11.9937 41.8102 11.9937 41.5299 12.1974L39.2897 13.8249C38.6627 14.2804 37.8192 13.6675 38.0586 12.9305L38.9143 10.2971C39.0214 9.96744 38.9041 9.60634 38.6237 9.40263L36.3836 7.77508C35.7566 7.31955 36.0788 6.32786 36.8538 6.32786H39.6227C39.9693 6.32786 40.2765 6.10469 40.3836 5.77508L41.2392 3.14164Z"
                                fill="#FFA301"
                              />
                              <path
                                d="M58.2392 3.14164C58.4787 2.40459 59.5214 2.40459 59.7609 3.14164L60.6166 5.77508C60.7237 6.10469 61.0308 6.32786 61.3774 6.32786H64.1464C64.9214 6.32786 65.2436 7.31955 64.6166 7.77508L62.3765 9.40263C62.0961 9.60634 61.9788 9.96744 62.0859 10.2971L62.9415 12.9305C63.181 13.6675 62.3374 14.2804 61.7104 13.8249L59.4703 12.1974C59.1899 11.9937 58.8102 11.9937 58.5299 12.1974L56.2897 13.8249C55.6627 14.2804 54.8192 13.6675 55.0586 12.9305L55.9143 10.2971C56.0214 9.96744 55.9041 9.60634 55.6237 9.40263L53.3836 7.77508C52.7566 7.31955 53.0788 6.32786 53.8538 6.32786H56.6227C56.9693 6.32786 57.2765 6.10469 57.3836 5.77508L58.2392 3.14164Z"
                                fill="#FFA301"
                              />
                              <path
                                d="M75.2392 3.14164C75.4787 2.40459 76.5214 2.40459 76.7609 3.14164L77.6166 5.77508C77.7237 6.10469 78.0308 6.32786 78.3774 6.32786H81.1464C81.9214 6.32786 82.2436 7.31955 81.6166 7.77508L79.3765 9.40263C79.0961 9.60634 78.9788 9.96744 79.0859 10.2971L79.9415 12.9305C80.181 13.6675 79.3374 14.2804 78.7104 13.8249L76.4703 12.1974C76.1899 11.9937 75.8102 11.9937 75.5299 12.1974L73.2897 13.8249C72.6627 14.2804 71.8192 13.6675 72.0586 12.9305L72.9143 10.2971C73.0214 9.96744 72.9041 9.60634 72.6237 9.40263L70.3836 7.77508C69.7566 7.31955 70.0788 6.32786 70.8538 6.32786H73.6227C73.9693 6.32786 74.2765 6.10469 74.3836 5.77508L75.2392 3.14164Z"
                                fill="#FFA301"
                              />
                            </svg>
                          </div>

                          <div className="product--review__content-body">
                            <p>
                              What i ordered was exactly what i got. and the
                              delivery was so smooth, packing was top-notch, i
                              totally recommend this{" "}
                            </p>
                            <div className="product--review__content-otherProducts">
                              <img
                                src={PurchasedProduct}
                                alt="customer review other products"
                              />
                              <img
                                src={PurchasedProduct}
                                alt="customer review other products"
                              />
                            </div>
                            <div className="product--review__content-identity">
                              <h6>Kristin Watson</h6>
                              <p>March 14, 2024</p>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>

                    <div className="product--review__paginate">
                      <img src={RefreshIcon} alt="refresh reviews" />
                      <span>load more reviews</span>
                    </div>
                  </div>
                </div>

                <div className="product--recentViews">
                  <h5>Recently Viewed Product</h5>

                  <div className="product--recentViews__container">
                    {recentProducts.map((product, index) => {
                      return (
                        <RecentProductItem
                          key={index}
                          recentProduct={product}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
