import { NavLink, useNavigate } from "react-router-dom";
import FilterIcon from "../assets/icons/filter-icon.svg";
import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";
import "./pages.scss";
import useWishlist from "../hooks/useWishlist";
import SearchIcon from "../assets/icons/search-icon.svg";
import useProducts from "../hooks/useProducts";
import currencyFormatter from "../helpers/currencyFormatter";
import { ProductCategoryTyoe, ProductType } from "../types/productInterface";
import { useEffect, useState } from "react";
import { productPayload } from "../context/ProductsProvider";
import Loader from "../components/ui/Loader";
import { timbuGetData } from "../helpers/request";

const organization_id = import.meta.env.VITE_TIMBU_ORG_ID;
const app_key = import.meta.env.VITE_TIMBU_APP_KEY;
const app_id = import.meta.env.VITE_TIMBU_APP_ID;

function Product() {
  const navigate = useNavigate();
  const { remit, WISHLIST_REDUCER_ACTIONS, wishlist } = useWishlist();
  const {
    productResponse,
    products,
    pageLoading,
    totalPages,
    getPaginatedProducts,
  } = useProducts();
  const [payload, setPayload] = useState<productPayload>({
    category_id: "",
    searchValue: "",
    page: 1,
  });
  const [categories, setCategories] = useState<Array<ProductCategoryTyoe>>([]);
  const [catIsLoading, setCatIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCatName, setSelectedCatName] = useState("All category");
  const [toggleDrop, setToggleDrop] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setCatIsLoading(true);
      const data = await timbuGetData(
        `/categories?organization_id=${organization_id}&Appid=${app_id}&Apikey=${app_key}`
      ).catch((err) => {
        if (err) {
          console.log(err?.response?.statusText);
          setCatIsLoading(false);
        }
      });

      return data;
    };

    fetchCategories().then((category) => {
      setCategories(category.items);
      setCatIsLoading(false);
    });
  }, []);

  const goToProduct = (id: string) => {
    return navigate(`/product-details/${id}`);
  };

  const goToHomePage = () => {
    return navigate(`/`);
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

  const pageNumbers: Array<number> = [];

  for (let index = 1; index <= totalPages; index++) {
    pageNumbers.push(index);
  }

  const changePagination = (pageIndex: string | number) => {
    let nextPage = 1;
    if (pageIndex === "next") {
      nextPage = Number(payload.page) + 1;
      setPayload({ ...payload, page: nextPage });
      getPaginatedProducts({ ...payload, page: nextPage });
      return;
    }
    if (pageIndex === "prev") {
      nextPage = Number(payload.page) - 1;
      setPayload({ ...payload, page: nextPage });
      getPaginatedProducts({ ...payload, page: nextPage });
      return;
    }
    setPayload({ ...payload, page: (nextPage = Number(pageIndex)) });
    nextPage = Number(pageIndex);
    getPaginatedProducts({ ...payload, page: pageIndex as number });
    return;
  };

  const handleCategory = (id: string, name: string = '') => {
    setToggleDrop(false);
    if (id === "all") {
      setSelectedCategory("");
      setSelectedCatName("All category");
      setPayload({ ...payload, category_id: '' });
      getPaginatedProducts({ ...payload, category_id: '' });
      return;
    }
    setSelectedCatName(name);
    setPayload({ ...payload, category_id: id });
    getPaginatedProducts({ ...payload, category_id: id });
    return setSelectedCategory(id);
  };

  const toggleDropDown = () => {
    if (toggleDrop) return setToggleDrop(false);
    return setToggleDrop(true);
  }

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
                {catIsLoading ? (
                  <></>
                ) : (
                  <div className="subnav--categories">
                    <p onClick={() => handleCategory("all")}>All Category</p>
                    {categories.map((cat, index) => {
                      return (
                        <>
                          <p
                            onClick={() => handleCategory(cat.id, cat.name)}
                            className={
                              selectedCategory === cat.id ? "active" : ""
                            }
                            key={index}
                          >
                            {cat?.name}
                          </p>
                        </>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="subnav--buttons">
                <div className="subnav--main">
                  <NavLink to="#">
                    <span>Become a seller</span>
                  </NavLink>
                </div>
                <div className="subnav--secondary">
                  <NavLink to="/cart">
                    <span>All order</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="container">
          <div className="mobile--navigation">
            <div className="mobile--navigation__search">
              <img src={SearchIcon} alt="search icon" />
              <input type="text" placeholder="Search product and Brands" />
            </div>

            <div>
              <div className="mobile--buttons">
                <div className="mobile--main">
                  <NavLink to="#">
                    <span>Become a seller</span>
                  </NavLink>
                </div>
                <div className="mobile--secondary">
                  <NavLink to="#">
                    <span>All order</span>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="mobile--filters">
              <div className="mobile--filter">
                <img src={FilterIcon} alt="filter icon" />
                <span>Filter</span>
              </div>

              <div style={{ position: "relative" }}>
                <div tabIndex={0} onClick={toggleDropDown} onBlur={toggleDropDown} className="mobile--categories">
                  <span>{selectedCatName}</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 8.5C19 8.5 14.856 15.5 12 15.5C9.145 15.5 5 8.5 5 8.5"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <div className={`mobile--categories__drop ${toggleDrop && 'active'}`}>
                    <p onClick={() => handleCategory("all")}>All Category</p>
                    {categories.map((cat, index) => {
                      return (
                        <>
                          <p
                            onClick={() => handleCategory(cat.id, cat.name)}
                            className={
                              selectedCategory === cat.id ? "active" : ""
                            }
                            key={index}
                          >
                            {cat?.name}
                          </p>
                        </>
                      );
                    })}
                  </div>
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
            {pageLoading ? (
              <Loader />
            ) : (
              <div>
                <div className="product--listing">
                  {products.map((product, index) => {
                    return (
                      <>
                        <article className="product--card" key={index}>
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
                  })}
                </div>

                {/* Pagination */}
                <div className="pagination">
                  <div className="pagination--previous">
                    <button
                      className={
                        productResponse.previous_page !== null
                          ? "pointer"
                          : "no-pointer"
                      }
                      disabled={productResponse.previous_page === null}
                      onClick={() => changePagination("prev")}
                    >
                      Previous
                    </button>
                  </div>
                  <div className="pagination--count">
                    {pageNumbers.map((page: number, index: number) => {
                      return (
                        <span
                          className={
                            page === productResponse.page ? "active" : ""
                          }
                          key={index}
                          onClick={() => changePagination(page)}
                        >
                          {page}
                        </span>
                      );
                    })}
                  </div>
                  <div className="pagination--next">
                    <button
                      className={
                        productResponse.next_page !== null
                          ? "pointer"
                          : "no-pointer"
                      }
                      disabled={productResponse.next_page === null}
                      onClick={() => changePagination("next")}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
