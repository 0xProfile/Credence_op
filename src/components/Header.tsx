import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { updateSearchValue } from "../action/search";
import { useDispatch } from 'react-redux'
import logo from '../assets/header-logo2.png';
import { useNavigate } from "react-router-dom";


export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 shadow rounded-box">
      <div className="flex">
      <a className="btn btn-ghost normal-case text-xl" onClick={() => navigate('/')}>
        <img src={logo} alt="Image" className="object-contain w-full h-full" />
      </a>
      </div>

      <div className="flex-1 gap-2">
        <div className="form-control  w-full px-2">
          <input type="text" placeholder="Search 0x" onChange={(e) => {
            dispatch(updateSearchValue(e.target.value));
          }} className="input input-bordered" />
        </div>
      </div>
      <div className="btn-group p-4">
        <button onClick={() => navigate('/make/attestation')} className="btn btn-active">Make Attest</button>
      </div>
      <ConnectButton showBalance={false} />
    </div>
  );
};