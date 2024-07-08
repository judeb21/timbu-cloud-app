import NotFoundIcon from "../../assets/illustation/notFound.svg";

type PropType = {
  msg: string;
};

const NotFound = ({ msg }: PropType) => {
  return (
    <>
      <div className="container">
        <div className="product--page__error">
          <img src={NotFoundIcon} alt="Item not found" />
          <h4>{msg}</h4>
          <p>
            Please visit our product page to select and pick item for purchase{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
