import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";
import CartImage1 from "../assets/products/CartProduct1.png";
import CartImage2 from "../assets/products/CartProduct2.png";
import DeleteIcon from "../assets/icons/cart-delete-icon.svg";
import { useNavigate } from "react-router-dom";
import "../styles/component/input-field.scss";
import { Input } from "../components/ui/Input/Input";
import PrimaryButton from "../components/ui/Button/PrimaryButton";

function ProductCheckout() {
  const navigate = useNavigate();

  const goToCompleteORder = () => {
    return navigate("/order-complete");
  };

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
              <div className="product--checkout__contact">
                <h5>Contact Information</h5>

                <div className="form-control">
                  <Input
                    label="Email address"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    required={false}
                    value=""
                  />
                </div>

                {/* Shipment */}
                <div className="product--checkout__shipment">
                  <h5>Shipment Information</h5>

                  <div>
                    <div className="form-control-group">
                      <div className="form-control">
                        <Input
                          label="First Name"
                          type="text"
                          name="fName"
                          id="fName"
                          placeholder="Enter your First Name"
                          required={false}
                          value=""
                        />
                      </div>

                      <div className="form-control">
                        <Input
                          label="Last Name"
                          type="text"
                          name="lName"
                          id="lName"
                          placeholder="Enter your Last Name"
                          required={false}
                          value=""
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <Input
                        label="Address"
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Enter your Address"
                        required={false}
                        value=""
                      />
                    </div>

                    <div className="form-control-group">
                      <div className="form-control">
                        <div className="form-field">
                          <label htmlFor="state" className="form-label">
                            State
                          </label>
                          <select name="" id="" className="form-select">
                            <option value="__Select state">Select State</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-control">
                        <Input
                          label="City"
                          type="text"
                          name="city"
                          id="city"
                          placeholder="Enter your city"
                          required={false}
                          value=""
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="product--checkout__shipment">
                  <h5>Payment Method</h5>

                  <div className="product--payment">
                    <div className="product--payment__options active">
                      <label>
                        <div>
                          <input
                            type="radio"
                            id="paymentDelivery"
                            className="payment--input"
                            name="payment"
                            checked
                          />
                        </div>
                        <div>
                          <p>Payment on delivery</p>
                          <span>Make available the amount</span>
                        </div>
                      </label>
                    </div>

                    <div className="product--payment__options">
                      <label>
                        <div>
                          <input
                            type="radio"
                            name="payment"
                            className="payment--input"
                            disabled
                          />
                        </div>
                        <div>
                          <p>Pay online</p>
                          <span>One click pay stack payment</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

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
                  <PrimaryButton
                    className="product--color__button"
                    title="Confirm Payment"
                    onClick={() => goToCompleteORder()}
                  />
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
