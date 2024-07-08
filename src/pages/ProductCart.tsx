import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";
import "./pages.scss";
import DeleteIcon from "../assets/icons/cart-delete-icon.svg";
import PromoIcon from "../assets/icons/promo-icon.svg";
import RightCaret from "../assets/icons/right-caret-input-icon.svg";
import BlackColor from "../assets/icons/black-color-icon.svg";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/ui/Button/PrimaryButton";
import useCart from "../hooks/useCart";
import { RecentProducts } from "../products";
import NotFound from "../components/ui/NotFound";

function ProductCart() {
  const navigate = useNavigate();
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();

  const goToCheckout = () => {
    return navigate("/checkout");
  };

  const goToHomePage = () => {
    return navigate(`/`);
  };

  const onRemoveFromCart = (item: RecentProducts) =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
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

            {/* Product listing */}
            {cart.length > 0 ? (
              <>
                <div className="product--list">
                  <h4 className="product--list__header">Cart({cart.length})</h4>

                  <div className="product--cart__container">
                    <div className="product--cart">
                      {cart.map((item, index) => {
                        return (
                          <>
                            <div className="product--carts" key={index}>
                              <div className="product--cart__heading">
                                {/* Image */}
                                <div className="product--cart__heading-image">
                                  <img src={item?.productImage} alt="image" />
                                </div>
                                {/* Product description */}
                                <div className="product--cart__heading-display">
                                  <span className="product--cart__itemCat">
                                    {item?.productCategory}
                                  </span>
                                  <p className="product--cart__itemName">
                                    {item?.productName}
                                  </p>
                                  <p className="product--cart__itemPrice">
                                    ₦234,980.00
                                  </p>
                                </div>
                              </div>
                              {/* Order options */}
                              <div className="product--cart__options">
                                <div className="product--cart__variaties">
                                  {/* quantity select */}
                                  <div className="product--cart__quantity">
                                    <span>1</span>
                                    <img src={RightCaret} alt="right caret" />
                                  </div>
                                  {/* Color Select */}
                                  <div className="product--cart__color">
                                    <div className="product--cart__color-preview">
                                      <img
                                        src={BlackColor}
                                        alt="color variation"
                                      />
                                    </div>
                                    <img src={RightCaret} alt="right caret" />
                                  </div>
                                </div>
                                {/* Delete */}
                                <div
                                  className="product--cart__delete"
                                  onClick={() => onRemoveFromCart(item)}
                                >
                                  <img
                                    src={DeleteIcon}
                                    alt="Delete order icon"
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>

                    <div className="product--cart__summary">
                      <div className="product--summary">
                        <h4>Summary</h4>

                        <div className="product--summary__fee">
                          <p>
                            <span className="product--summary__text">
                              Sub-Total
                            </span>
                            <span className="product--summary__amount">
                              ₦234,980.00
                            </span>
                          </p>
                          <p>
                            <span className="product--summary__text">
                              Estimated Shipping fee
                            </span>
                            <span className="product--summary__amount">
                              ₦4,510.00
                            </span>
                          </p>
                        </div>

                        <div>
                          <div className="product--summary__promo">
                            <label htmlFor="promoCode">Promo code</label>
                            <div className="product--summary__promo-input">
                              <input
                                type="text"
                                id="promoCode"
                                placeholder="Enter your promo code"
                              />
                              <div>
                                <div className="promo--icon">
                                  <img src={PromoIcon} alt="promo icon" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="product--summary__total">
                          <p>
                            <span className="product--summary__text">
                              Total
                            </span>
                            <span className="product--summary__amount">
                              ₦239,490.00
                            </span>
                          </p>
                        </div>

                        <div className="product--summary__button">
                          <PrimaryButton
                            className="product--color__button"
                            title="Checkout"
                            onClick={() => goToCheckout()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NotFound msg={"Oops you have not added any item to cart"} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCart;
