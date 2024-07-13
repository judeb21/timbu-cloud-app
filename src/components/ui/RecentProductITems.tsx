import { NavLink } from "react-router-dom";
import currencyFormatter from "../../helpers/currencyFormatter";
import { recentlyViewedProduct } from "../../pages/ProductDetail";

interface ProductProp {
  recentProduct: recentlyViewedProduct;
}

const RecentProductItem = ({ recentProduct }: ProductProp) => {
  const {
    id,
    productName,
    productImage,
    productCategory,
    productPrice,
    totalReview,
  } = recentProduct;

  return (
    <>
      <div className="product--recentViews__card">
        <NavLink to={`/product-details/${id}`} className="product--recentViews__card--image">
          <img src={`https://api.timbu.cloud/images/${productImage}`} alt="Recent viewed product image" />
        </NavLink>
        <div className="product--recentViews__card-body">
          <h5>{productName}</h5>
          <p>
            <span>Best sellers</span>
            <span>{productCategory}</span>
          </p>
          <h4>{currencyFormatter(productPrice)}</h4>
          <div className="product--recentViews__card-rate">
            <svg
              width="72"
              height="16"
              viewBox="0 0 72 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2L9.77994 6.05749L14 6.58359L10.88 9.61736L11.7082 14L8 11.8175L4.2918 14L5.12 9.61736L2 6.58359L6.22006 6.05749L8 2Z"
                fill="#FFA301"
              />
              <path
                d="M22 2L23.7799 6.05749L28 6.58359L24.88 9.61736L25.7082 14L22 11.8175L18.2918 14L19.12 9.61736L16 6.58359L20.2201 6.05749L22 2Z"
                fill="#FFA301"
              />
              <path
                d="M36 2L37.7799 6.05749L42 6.58359L38.88 9.61736L39.7082 14L36 11.8175L32.2918 14L33.12 9.61736L30 6.58359L34.2201 6.05749L36 2Z"
                fill="#FFA301"
              />
              <path
                d="M50 2L48.2201 6.05749L44 6.58359L47.12 9.61736L46.2918 14L50 11.8175V2Z"
                fill="#FFA301"
              />
              <path
                d="M50 11.8175L53.7082 14L52.88 9.61736L56 6.58359L51.7799 6.05749L50 2V11.8175Z"
                fill="#DDE2E4"
              />
              <path
                d="M64 2L65.7799 6.05749L70 6.58359L66.88 9.61736L67.7082 14L64 11.8175L60.2918 14L61.12 9.61736L58 6.58359L62.2201 6.05749L64 2Z"
                fill="#D5DADD"
              />
            </svg>
            <span>{totalReview}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentProductItem;
