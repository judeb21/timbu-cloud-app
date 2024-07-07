import LogoWhite from "../../assets/icons/logo-white.svg";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer--container">
            {/* Footer description */}
            <div className="footer--description">
              <div className="footer--description__logo">
                <img
                  className="footer--description__logo-img"
                  src={LogoWhite}
                  alt="Timbu logo white"
                />
                <span>Timbu Cloud Shop</span>
              </div>
              <div className="footer--description__content">
                <p>
                  Timbu cloud shop is a shopping platform that gives you all the
                  good experience of shopping.
                </p>
              </div>
            </div>

            <div className="footer--link">
              <NavLink to="#">
                <span>Company</span>
              </NavLink>
              <NavLink to="#">
                <span>About</span>
              </NavLink>
              <NavLink to="#">
                <span>Become a distributor</span>
              </NavLink>
              <NavLink to="#">
                <span>Career</span>
              </NavLink>
            </div>

            <div className="footer--link">
              <NavLink to="#">
                <span>Help</span>
              </NavLink>
              <NavLink to="#">
                <span>Customer support</span>
              </NavLink>
              <NavLink to="#">
                <span>Terms & Conditions</span>
              </NavLink>
              <NavLink to="#">
                <span>Track delivery</span>
              </NavLink>
              <NavLink to="#">
                <span>Privacy policy</span>
              </NavLink>
            </div>

            {/* Newsletter */}
            <div className="footer--newsletter">
              <form>
                <div className="footer--newsletter__form">
                  <label htmlFor="newsletter">Newsletter</label>
                  <input
                    type="email"
                    required
                    id="newsletter"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <button>Subscribe now</button>
                </div>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer--copyright">
            <p>
              © Copyright {new Date().getFullYear()}, All Rights Reserved by
              shopluex
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
