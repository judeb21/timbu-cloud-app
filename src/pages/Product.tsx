import { NavLink } from "react-router-dom";
import FilterIcon from "../assets/icons/filter-icon.svg";
import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";
import './pages.scss';

function Product() {
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
            <div className="breadcrumbs">
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
              <div className="product--card">1</div>
              <div className="product--card">1</div>
              <div className="product--card">1</div>
              <div className="product--card">1</div>
              <div className="product--card">1</div>
              <div className="product--card">1</div>
              <div className="product--card">1</div>
              <div className="product--card">1</div>
              <div className="product--card">1</div>
              <div className="product--card">1</div>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <div className="pagination--previous">
                <span>Previous</span>
              </div>
              <div className="pagination--count">
                <span className="active">1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
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
