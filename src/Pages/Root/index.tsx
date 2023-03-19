import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Header } from "../../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

export default function Root() {

  const navigate = useNavigate();
  const searchVal = useSelector((state: any) => state.search);

  const handleKeyDown = useCallback((e: any) => {
    if (e.key === 'Enter') {
      if (searchVal.searchValue !== '' && searchVal.searchType !== '') {
        navigate(`/search/${searchVal.searchType.toLowerCase()}/${searchVal.searchValue}`)
      }
    }
  }, [searchVal]);


  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown]);

  return (
    <div className="min-h-full">
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
}
