import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";
import DeleteIcon from "../assets/icons/cart-delete-icon.svg";
import { useNavigate } from "react-router-dom";
import "../styles/component/input-field.scss";
import { Input } from "../components/ui/Input/Input";
import PrimaryButton from "../components/ui/Button/PrimaryButton";
import useCart from "../hooks/useCart";
import currencyFormatter from "../helpers/currencyFormatter";
import { ChangeEvent, FormEvent, useState } from "react";
import { CountryCode, E164Number } from "libphonenumber-js/core";
import PhoneInput, {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import CountryFlag from "react-country-flag";
import { ProductDetailType } from "../types/productInterface";

function ProductCheckout() {
  const { dispatch, REDUCER_ACTIONS, cart, totalPrice } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("delivery");
  const [value, setValue] = useState<E164Number>();
  const [country, setCountry] = useState<CountryCode | string>("NG");

  const estShppingFee = 4510;

  const goToCompleteORder = () => {
    dispatch({
      type: REDUCER_ACTIONS.SUBMIT,
    });
    return navigate("/order-complete");
  };

  const goToHomePage = () => {
    return navigate(`/`);
  };

  const onRemoveFromCart = (item: ProductDetailType) =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

  const totalProductPrice = () => {
    const total = totalPrice + estShppingFee;
    return total;
  };

  const setCountryValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event?.target?.value);
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

                    <div className="form-number">
                      <p className="form-number-label">Phone number</p>
                      <div className="form-number-input">
                        <div className="form-number-flagSelect">
                          <div>
                            <CountryFlag
                              countryCode={country}
                              style={{ fontSize: "1.5em" }}
                            />
                          </div>
                          <select
                            value={country}
                            onChange={setCountryValue}
                            className="form-select"
                          >
                            <option value="">{""}</option>
                            {getCountries().map((country) => (
                              <option key={country} value={country}>
                                +{getCountryCallingCode(country)}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-number__input">
                          <PhoneInput
                            international
                            country={country as CountryCode}
                            value={value}
                            onChange={setValue}
                            placeholder="Enter phone number"
                          />
                        </div>
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
                    <div
                      className={`product--payment__options ${
                        payment === "delivery" ? "active" : ""
                      }`}
                    >
                      <label>
                        <div>
                          <input
                            type="radio"
                            id="paymentDelivery"
                            className="payment--input"
                            name="payment"
                            value="delivery"
                            onChange={(e: FormEvent<HTMLInputElement>) => {
                              setPayment(e.currentTarget?.value);
                            }}
                          />
                        </div>
                        <div>
                          <p>Payment on delivery</p>
                          <span>Make available the amount</span>
                        </div>
                      </label>
                    </div>

                    <div
                      className={`product--payment__options ${
                        payment === "online" ? "active" : ""
                      }`}
                    >
                      <label>
                        <div>
                          <input
                            type="radio"
                            name="payment"
                            className="payment--input"
                            value="online"
                            onChange={(e: FormEvent<HTMLInputElement>) => {
                              setPayment(e.currentTarget?.value);
                            }}
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
                  {cart.map((item, index) => {
                    return (
                      <>
                        <div className="product--cart__heading" key={index}>
                          <div className="product--cart__heading-image">
                            <img
                              src={`https://api.timbu.cloud/images/${item?.photos[0]?.url}`}
                              alt="cart product item"
                            />
                          </div>
                          <div className="product--cart__heading-display">
                            <span className="product--cart__itemCat">
                              {item.categories[0]?.name}
                            </span>
                            <p className="product--cart__itemName">
                              {item.name}
                            </p>
                            <p className="product--cart__itemPrice">
                              {currencyFormatter(item.current_price)}
                            </p>
                          </div>
                          <div
                            className="product--cart__delete"
                            onClick={() => onRemoveFromCart(item)}
                          >
                            <img src={DeleteIcon} alt="Delete order icon" />
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>

                <div className="product--checkout__order-summary">
                  <h5>Summary</h5>
                  <div className="product--summary__fee">
                    <p>
                      <span className="product--summary__text">Sub-Total</span>
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

                  <div className="product--summary__total">
                    <p>
                      <span className="product--summary__text">Total</span>
                      <span className="product--summary__amount">
                        {currencyFormatter(totalProductPrice())}
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
