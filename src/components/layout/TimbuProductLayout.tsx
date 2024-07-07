import { Outlet } from "react-router-dom";
import Navigation from "../ui/Navigation";
import "./TimbuLayout.scss";
import Footer from "../ui/Footer";

function TimbuProductLayout() {
  // const navigate = useNavigate();

  return (
    <>
      <div>
        {/* Top Navigation */}
        <div className="container--nav">
          <div className="container">
            <Navigation />
          </div>
        </div>

        {/* Layout Content */}
        <div className="">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default TimbuProductLayout;
