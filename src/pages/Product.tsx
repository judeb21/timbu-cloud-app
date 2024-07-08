import { NavLink, useNavigate } from "react-router-dom";
import FilterIcon from "../assets/icons/filter-icon.svg";
import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";
import "./pages.scss";
import { allProducts } from "../products";

function Product() {
  const navigate = useNavigate();

  const goToProduct = (id: number) => {
    return navigate(`/product-details/${id}`);
  };

  const goToHomePage = () => {
    return navigate(`/`);
  }

  const addToWishList = (id: number) => {
    alert(`Added product with id ${id} to wishlist`);
    return;
  };

  return (
    <>
      <div>
        {/* Sub Navigation */}
        <div className="subnav">
          <div className="container">
            <div className="subnav--container">
              <div className="subnav--filters">
                <div className="subnav--filter">
                  <img src={FilterIcon} alt="filter icon" />
                  <span>Filter</span>
                </div>
                <div className="subnav--categories">
                  <span>All Category</span>
                  <span>Fashion</span>
                  <span>Books</span>
                  <span>Electronic</span>
                  <span>Bags</span>
                  <span>Phone</span>
                </div>
              </div>
              <div className="subnav--buttons">
                <div className="subnav--main">
                  <NavLink to="#">
                    <span>Become a seller</span>
                  </NavLink>
                </div>
                <div className="subnav--secondary">
                  <NavLink to="#">
                    <span>All order</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="layout--content">
            <div className="breadcrumbs" onClick={() => goToHomePage()}>
              <div className="breadcrumbs--category">
                <div className="breadcrumbs--category__caret">
                  <img src={LeftCaretIcon} alt="left caret" />
                </div>
                <div className="breadcrumbs--category__name">
                  <span>Home</span>
                  <div className="divider"></div>
                  <span>Product list</span>
                </div>
              </div>
            </div>

            {/* Product listing */}
            <div className="product--listing">
              {allProducts.map((product, index) => {
                return (
                  <>
                    <article className="product--card">
                      <div className="product--card__article" key={index}>
                        <NavLink
                          to={`/product-details/${product?.id}`}
                          className="product--card__image"
                        >
                          <img
                            src={product?.productImage}
                            alt="Product image"
                            onClick={() => goToProduct(product.id)}
                          />
                        </NavLink>
                        <div className="product--card__content">
                          <h5>{product.productName}</h5>
                          <p>
                            <span>{product.productTag}</span>
                            <span>{product.productCategory}</span>
                          </p>
                          <h4>{product.productPrice}</h4>
                        </div>
                      </div>
                      <button
                        className="product--card__wishlist"
                        onClick={() => addToWishList(product?.id)}
                      >
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
                      </button>
                    </article>
                  </>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <div className="pagination--previous">
                <span>Previous</span>
              </div>
              <div className="pagination--count">
                <span className="active">1</span>
              </div>
              <div className="pagination--next">
                <span>Next</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
