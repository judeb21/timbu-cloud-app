import LoaderIcon from "../../assets/illustation/loader.gif";

const Loader = () => {
  return (
    <>
      <div className="container">
        <div className="product--page__loading">
          <img src={LoaderIcon} alt="loading" />
        </div>
      </div>
    </>
  );
};

export default Loader;
