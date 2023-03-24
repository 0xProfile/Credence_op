import React from "react";
import { useNavigate } from "react-router-dom";

const GraphSearch = () => {
  const [key, setKey] = React.useState("");
  const navigate = useNavigate();

  return <div className="container p-2 m-auto flex justify-center">
    <div className="card w-3/4 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-center justify-center">Graph Search</h2>
          <div className="form-control justify-center m-auto w-full max-w-xs">
          <label className="label">
            <span className="label-text">Key</span>
          </label>
          <input onChange={(e) => [
            setKey(e.target.value)
          ]}  type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <button onClick={() => navigate(`/graph/${key}`)} className="btn btn-primary m-auto w-full max-w-xs">Search</button>
      </div>
    </div>
  </div>;
};

export default GraphSearch;