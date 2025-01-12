import currencyFormatter from "../../helpers/currencyFormatter";
import { ProductDetailType, ProductType } from "../../types/productInterface";
import { NavLink, useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useWishlist from "../../hooks/useWishlist";

type PropsType = {
  product: ProductDetailType;
};

const ProductItem = ({ product }: PropsType) => {
  const { products } = useProducts();
  const { remit, WISHLIST_REDUCER_ACTIONS, wishlist } = useWishlist();

  const navigate = useNavigate();

  const goToProduct = (id: string) => {
    return navigate(`/product-details/${id}`);
  };

  const addToWishList = (id: string) => {
    const product = products.find((item) => item.id === id) as ProductType;

    const productisInWish = wishlist.some((item) => item.id === id);

    const wishlistProduct = wishlist.find((item) => item.id === id);

    if (productisInWish) {
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
      },
    });
    return;
  };

  return (
    <>
      <article className="product--card">
        <div className="product--card__article">
          <NavLink
            to={`/product-details/${product?.id}`}
            className="product--card__image"
          >
            <img
              src={`https://api.timbu.cloud/images/${product?.photos[0]?.url}`}
              alt="Product image"
              onClick={() => goToProduct(product?.id)}
            />
          </NavLink>
          <div className="product--card__content">
            <h5>{product.name}</h5>
            <p>
              <span>Best sellers</span>
              <span>{product.categories[0]?.name}</span>
            </p>
            <h4>{currencyFormatter(product?.description)}</h4>
          </div>
        </div>
        <button
          className="product--card__wishlist animated"
          onClick={() => addToWishList(product?.id)}
        >
          {wishlist.some((item) => item.id === product.id) ? (
            <>
              <span className="wishlist--svg"></span>
              <span className="wishlist--svg"></span>
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
            </>
          ) : (
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="wishlist--icon"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.9219 10.4463C0.848901 7.0963 2.1039 2.9313 5.6209 1.7993C7.4709 1.2023 9.7539 1.7003 11.0509 3.4893C12.2739 1.6343 14.6229 1.2063 16.4709 1.7993C19.9869 2.9313 21.2489 7.0963 20.1769 10.4463C18.5069 15.7563 12.6799 18.5223 11.0509 18.5223C9.4229 18.5223 3.6479 15.8183 1.9219 10.4463Z"
                stroke="#0F1D2D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="heart-around"
              />
              <path
                d="M14.7886 5.564C15.9956 5.688 16.7506 6.645 16.7056 7.986"
                stroke="#0F1D2D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="heart-inside"
              />
            </svg>
          )}
        </button>
      </article>
    </>
  );
};

export default ProductItem;
