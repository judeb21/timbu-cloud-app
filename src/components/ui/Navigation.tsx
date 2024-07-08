import { NavLink } from "react-router-dom";
import Logo from "../../assets/icons/logo.svg";
import ProfileImage from "../../assets/icons/profile.png";
import NoWishListIcon from "../../assets/icons/wishlist-icon-none.svg";
import CartIcon from "../../assets/icons/cart-icon.svg";
import CartIconNone from "../../assets/icons/no-cart-item-icon.svg";
import SearchIcon from "../../assets/icons/search-icon.svg";
import useCart from "../../hooks/useCart";

function Navigation() {
  const { totalItems } = useCart();
  return (
    <>
      <div className="top--navigation">
        <NavLink to="/" className="top--navigation__logo pointer">
          <img className="top--navigation__img" src={Logo} alt="logo" />
          <span className="top--navigation__title">Timbu Cloud shop</span>
        </NavLink>

        <div className="top--navigation__search">
          <img src={SearchIcon} alt="search icon" />
          <input type="text" placeholder="Search product and Brands" />
        </div>

        <div className="top--navigation__shop">
          <NavLink to="/wishlist" className="top--navigation__wishlist pointer">
            <img src={NoWishListIcon} alt="wishlist icon" />
          </NavLink>
          <NavLink to="/cart" className="top--navigation__cart pointer">
            {totalItems > 0 ? (
              <img src={CartIcon} alt="cart icon" />
            ) : (
              <img src={CartIconNone} alt="cart icon" />
            )}
          </NavLink>
          <div className="top--navigation__profile pointer">
            <img
              className="top--navigation__image"
              src={ProfileImage}
              alt="profile image"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
