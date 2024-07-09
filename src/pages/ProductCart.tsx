import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";
import "./pages.scss";
import PromoIcon from "../assets/icons/promo-icon.svg";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/ui/Button/PrimaryButton";
import useCart from "../hooks/useCart";
import NotFound from "../components/ui/NotFound";
import currencyFormatter from "../helpers/currencyFormatter";
import CartItem from "../components/ui/CartItem";

function ProductCart() {
  const navigate = useNavigate();
  const { dispatch, REDUCER_ACTIONS, cart, totalPrice } = useCart();
  const estShppingFee = 4510;

  const goToCheckout = () => {
    return navigate("/checkout");
  };

  const goToHomePage = () => {
    return navigate(`/`);
  };

  const totalProductPrice = () => {
    const total = totalPrice + estShppingFee;
    return total;
  };

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
                          <CartItem
                            key={index}
                            item={item}
                            dispatch={dispatch}
                            REDUCER_ACTIONS={REDUCER_ACTIONS}
                          />
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
                              {currencyFormatter(totalPrice)}
                            </span>
                          </p>
                          <p>
                            <span className="product--summary__text">
                              Estimated Shipping fee
                            </span>
                            <span className="product--summary__amount">
                              {currencyFormatter(estShppingFee)}
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
                              {currencyFormatter(totalProductPrice())}
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
