import { ReducerAction, ReducerActionType } from "../../context/CartProvider";
import currencyFormatter from "../../helpers/currencyFormatter";
import DeleteIcon from "../../assets/icons/cart-delete-icon.svg";
import RightCaret from "../../assets/icons/right-caret-input-icon.svg";
import BlackColor from "../../assets/icons/black-color-icon.svg";
import { ChangeEvent, Dispatch, ReactElement } from "react";
import { ProductDetailType } from "../../types/productInterface";

type PropsType = {
  item: ProductDetailType;
  dispatch: Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, quantity: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = (item: ProductDetailType) =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

  const highestQty: number =
    5 > Number(item.quantity) ? Number(item.available_quantity) : Number(item.quantity);

  const optionValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  return (
    <>
      <div className="product--carts">
        <div className="product--cart__heading">
          {/* Image */}
          <div className="product--cart__heading-image">
            <img src={`https://api.timbu.cloud/images/${item?.photos[0]?.url}`} alt="image" />
          </div>
          {/* Product description */}
          <div className="product--cart__heading-display">
            <span className="product--cart__itemCat">
              {item?.categories[0].name}
            </span>
            <p className="product--cart__itemName">{item?.name}</p>
            <p className="product--cart__itemPrice">
              {currencyFormatter(item?.current_price)}
            </p>
          </div>
        </div>
        {/* Order options */}
        <div className="product--cart__options">
          <div className="product--cart__variaties">
            {/* quantity select */}
            <div className="product--cart__selects">
              <label htmlFor="itemQty" className="offscreen">
              </label>
              <select
                name="itemQty"
                id="itemQty"
                className="product--cart__select"
                value={item.quantity}
                aria-label="Item Quantity"
                onChange={onChangeQty}
              >
                {options}
              </select>
            </div>
            
            {/* Color Select */}
            <div className="product--cart__color">
              <div className="product--cart__color-preview">
                <img src={BlackColor} alt="color variation" />
                <div className={`color ${item.color}`}></div>
              </div>
              <img src={RightCaret} alt="right caret" />
            </div>
          </div>
          {/* Delete */}
          <div
            className="product--cart__delete"
            onClick={() => onRemoveFromCart(item)}
          >
            <img src={DeleteIcon} alt="Delete order icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
