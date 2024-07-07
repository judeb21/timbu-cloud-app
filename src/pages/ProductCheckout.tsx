import LeftCaretIcon from "../assets/icons/left-caret-icon.svg";

function ProductCheckout() {
  return (
    <>
      <div>
        <div className="container">
          <div className="layout--content">
            <div className="breadcrumbs">
              <div className="breadcrumbs--category">
                <div className="breadcrumbs--category__caret">
                  <img src={LeftCaretIcon} alt="left caret" />
                </div>
                <div className="breadcrumbs--category__name">
                  <span>Product list</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCheckout;