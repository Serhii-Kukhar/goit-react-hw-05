import CircleLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const Loader = () => {
  return <CircleLoader cssOverride={override} />;
};

export default Loader;
