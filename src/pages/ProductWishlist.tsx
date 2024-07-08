import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";
import "./pages.scss";
import { useNavigate } from "react-router-dom";
import NotFound from "../components/ui/NotFound";

function ProductWishlist() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    return navigate(`/`);
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

            {/* Product wishlist listing */}
            <NotFound msg={"Oops you have not added any item to your wishlist"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductWishlist;
