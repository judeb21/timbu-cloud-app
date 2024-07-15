import { NavLink, useNavigate } from "react-router-dom";
import FilterIcon from "../assets/icons/filter-icon.svg";
import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";
import "./pages.scss";
import SearchIcon from "../assets/icons/search-icon.svg";
import useProducts from "../hooks/useProducts";
import { ProductCategoryTyoe } from "../types/productInterface";
import { useEffect, useState } from "react";
import { productPayload } from "../context/ProductsProvider";
import Loader from "../components/ui/Loader";
import { timbuGetData } from "../helpers/request";
import ProductItem from "../components/ui/ProductItem";

const organization_id = import.meta.env.VITE_TIMBU_ORG_ID;
const app_key = import.meta.env.VITE_TIMBU_APP_KEY;
const app_id = import.meta.env.VITE_TIMBU_APP_ID;

function Product() {
  const navigate = useNavigate();
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

  const goToHomePage = () => {
    return navigate(`/`);
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

  const handleCategory = (id: string, name: string = "") => {
    setToggleDrop(false);
    if (id === "all") {
      setSelectedCategory("");
      setSelectedCatName("All category");
      setPayload({ ...payload, category_id: "" });
      getPaginatedProducts({ ...payload, category_id: "" });
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
                {catIsLoading ? (
                  <></>
                ) : (
                  <div className="subnav--categories">
                    <p onClick={() => handleCategory("all")}>All Category</p>
                    {categories.map((cat, index) => {
                      return (
                        <p
                          key={index}
                          onClick={() => handleCategory(cat.id, cat.name)}
                          className={
                            selectedCategory === cat.id ? "active" : ""
                          }
                        >
                          {cat?.name}
                        </p>
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
                <div
                  tabIndex={0}
                  onClick={toggleDropDown}
                  onBlur={toggleDropDown}
                  className="mobile--categories"
                >
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
                  <div
                    className={`mobile--categories__drop ${
                      toggleDrop && "active"
                    }`}
                  >
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
                        <ProductItem product={product} key={index} />
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
