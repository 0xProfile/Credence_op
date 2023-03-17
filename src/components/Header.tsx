import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { updateSearchValue } from "../action/search";
import { useDispatch } from 'react-redux'


export const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="navbar bg-base-100 shadow rounded-box">
      <div className="flex">
        <a className="btn btn-ghost normal-case text-xl">Some Logo?</a>
      </div>
      <div className="flex-1 gap-2">
        <div className="form-control  w-full px-2">
          <input type="text" placeholder="Search 0x" onChange={(e) => {
            dispatch(updateSearchValue(e.target.value));
          }} className="input input-bordered" />
        </div>
      </div>
      <br/>
      <ConnectButton showBalance={false} />
    </div>
  );
};