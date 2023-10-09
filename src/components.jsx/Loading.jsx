import {FallingLines } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="spinner">
      <FallingLines
        color="#f68b1e"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};
export default Loading;
