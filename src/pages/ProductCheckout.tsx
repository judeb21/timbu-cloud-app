import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";
import CartImage1 from "../assets/products/CartProduct1.png";
import CartImage2 from "../assets/products/CartProduct2.png";
import DeleteIcon from "../assets/icons/cart-delete-icon.svg";
import { useNavigate } from "react-router-dom";

function ProductCheckout() {
  const navigate = useNavigate();

  const goToCompleteORder = () => {
    return navigate("/order-complete");
  }
  
  return (
    <>
      <div>
        <div className="container">
          <div className="layout--content">
            <div className="breadcrumbs">
              <div className="breadcrumbs--category">
                <div className="breadcrumbs--category__caret">
                  <img src={LeftCaretIcon} alt="left caret" />
                </div>
                <div className="breadcrumbs--category__name">
                  <span>Product list</span>
                </div>
              </div>
            </div>

            <div className="product--checkout">
              {/* contact */}
              <div className="product--checkout__contact"></div>

              {/* Order details */}
              <div className="product--checkout__order">
                <h4>Order details</h4>
                <div className="product--checkout__order-details">
                  <div className="product--cart__heading">
                    <div className="product--cart__heading-image">
                      <img src={CartImage1} alt="Gucci show" />
                    </div>
                    <div className="product--cart__heading-display">
                      <span className="product--cart__itemCat">Shoe</span>
                      <p className="product--cart__itemName">
                        Gucci Women's flower Leather heels in black- Blue
                      </p>
                      <p className="product--cart__itemPrice">₦234,980.00</p>
                    </div>
                    <div className="product--cart__delete">
                      <img src={DeleteIcon} alt="Delete order icon" />
                    </div>
                  </div>

                  <div className="product--cart__heading">
                    <div className="product--cart__heading-image">
                      <img src={CartImage2} alt="Gucci show" />
                    </div>
                    <div className="product--cart__heading-display">
                      <span className="product--cart__itemCat">Shoe</span>
                      <p className="product--cart__itemName">
                        Gucci Women's Leather luxurious bag - pink
                      </p>
                      <p className="product--cart__itemPrice">₦234,980.00</p>
                    </div>
                    <div className="product--cart__delete">
                      <img src={DeleteIcon} alt="Delete order icon" />
                    </div>
                  </div>
                </div>

                <div className="product--checkout__order-summary">
                  <h5>Summary</h5>
                  <div className="product--summary__fee">
                    <p>
                      <span className="product--summary__text">Sub-Total</span>
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

                  <div className="product--summary__total">
                    <p>
                      <span className="product--summary__text">Total</span>
                      <span className="product--summary__amount">
                        ₦239,490.00
                      </span>
                    </p>
                  </div>
                </div>

                <div className="product--summary__button">
                  <button onClick={() => goToCompleteORder()}>Confirm Payment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCheckout;
