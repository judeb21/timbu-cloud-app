import { useNavigate } from "react-router-dom";
import CheckedIcon from "../assets/icons/checked-icon.svg";

function OrderComplete() {
  const navigate = useNavigate();

  const continueShopping = () => {
    return navigate('/');
  }

  return (
    <div className="container">
      <div className="timbu--order__complete">
        <div className="timbu--order__confirm">
          <img src={CheckedIcon} alt="order completed" />
          <h4>Thank you for your purchase</h4>
          <p>Thank you for choosing our service! Your purchase means a lot to us.</p>
        </div>

        <div className="timbu--order__details">
          <div className="timbu--order__order">
            <h5>Order Information</h5>
            <p>
              <span>Order ID</span>
              <span className="timbu--order__order-ref">#123456789</span>
            </p>
            <p>
              <span>Date & Time of Purchase</span>
              <span className="timbu--order__order-ref">12/15/2023, 10:30 AM</span>
            </p>
          </div>

          <div className="timbu--order__delivery">
            <h5>Delivery Informaton</h5>
            <p>
              <span>Recipient</span>
              <span>Omowunmi Jomoh <br /> +2348764567</span>
            </p>
            <p>
              <span>Delivery Address</span>
              <span className="timbu--order__delivery-address">17 Adeola Odeku Street, Victoria Island, Lagos, Nigeria</span>
            </p>
            <p>
              <span>Delivery Date</span>
              <span>12/15/2023</span>
            </p>
            <p>
              <span>Delivery Time</span>
              <span>2:00 AM - 12:00 PM</span>
            </p>
          </div>

          <div className="product--summary__button">
            <button onClick={() => continueShopping()}>Continue shopping</button>
            <p className="timbu--order__view">View order</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderComplete;