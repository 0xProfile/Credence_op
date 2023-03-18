import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Header } from "../../components/Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

export default function Root() {

  const searchVal = useSelector((state: any) => state.search.value);

  useEffect(() => {
    console.log(searchVal);
  }, [searchVal]);

  return (
    <div className="min-h-full">
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
}
