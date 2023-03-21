import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Header } from "../../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useKeyPress } from "../../utils/hooks";

export default function Root() {

  const navigate = useNavigate();
  const searchVal = useSelector((state: any) => state.search);

  const isEnterPressed = useKeyPress('Enter');

  useEffect(() => {
    if (isEnterPressed) {
      if (searchVal.searchValue !== '' && searchVal.searchType !== '') {
        navigate(`/search/${searchVal.searchType.toLowerCase()}/${searchVal.searchValue}`)
      }
    }
  }, [isEnterPressed])

  return (
    <div className="min-h-full">
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
}
