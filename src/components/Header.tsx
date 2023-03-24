import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";
import { updateSearchValue, updateSearchType } from "../action/search";
import { useDispatch } from 'react-redux'
import logo from '../assets/header-logo2.png';
import { useLocation, useNavigate } from "react-router-dom";


export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locaction = useLocation();

  return (
    <div className="navbar bg-base-100 shadow rounded-box">
      <div className="flex">
      <a className="btn btn-ghost normal-case text-xl" onClick={() => (locaction.pathname != '/') && navigate('/')}>
        <img src={logo} alt="Image" className="object-contain w-full h-full" />
      </a>
      </div>

      <div className="flex-1 gap-2">
        <div className="relative w-full mt-2 rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <label htmlFor="searchBy" className="sr-only">
              Search By
            </label>
            <select
              id="by"
              name="by"
              onChange={(e) => dispatch(updateSearchType({
                searchType: e.target.value,
              }))}
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-0 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option>About</option>
              <option>Key</option>
            </select>
          </div>
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => dispatch(updateSearchValue({
              searchValue: e.target.value,
            }))}
            className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="   Search ..."
          />
        </div>
      </div>
      <div className="btn-group p-4">
        <button onClick={() => (locaction.pathname != '/make/attestation') && navigate('/make/attestation')} className="btn btn-active">Make Attest</button>
        <button onClick={() => locaction.pathname != '/graphsearch' && navigate('graphsearch')} className="btn btn-active">Graph Search</button>
      </div>
      <ConnectButton showBalance={false} />
    </div>
  );
};