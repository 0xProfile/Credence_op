import React, { useEffect, useState } from "react";

import { prepareWriteAttestation, writeAttestation } from "@eth-optimism/atst";
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  UserRejectedRequestError,
} from "wagmi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components";
import { useChainModal } from "@rainbow-me/rainbowkit";
import {
  GOERIL_SENDER_CONTRACT,
  OP_GOERIL_RECEIVER_CONTRACT,
} from "../../constants";
import contractABI from "../../../contracts/cross-chain/SenderABI.json";
import './index.css';
import { Optimism, Ethereum } from "@thirdweb-dev/chain-icons";

interface IAttestDetails {
  about: string;
  key: string;
  value: string;
}

const CrossChainIndicator = ({ isCrossChain }: { isCrossChain: boolean}) => {
  if (isCrossChain) {
    return (
      <div className="flex items-center justify-center">
        <Ethereum className="w-6 h-6" />
        <span className="px-4">&#8594;</span>
        <Optimism className="w-6 h-6" />
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center">
        <Optimism className="w-6 h-6" />
      </div>
    );
  }
}

export default function MakeAttestation() {
  const { isConnected } = useAccount();
  const { openChainModal } = useChainModal();
  const { chain, chains } = useNetwork();

  const [attestHistory, setAttestHistory] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [attestDetails, setAttestDetails] = useState<IAttestDetails>();

  const { config: crossChainConfig } = usePrepareContractWrite({
    address: GOERIL_SENDER_CONTRACT,
    abi: contractABI,
    functionName: "sendString",
    args: [
      420,
      OP_GOERIL_RECEIVER_CONTRACT,
      `${attestDetails?.about}, ${attestDetails?.key}, ${attestDetails?.value}`,
    ],
  });

  const { write: sendString, data : txData } = useContractWrite({...crossChainConfig, onError(error) {
    if (error instanceof UserRejectedRequestError) {
      toast.error("User rejected transaction")
      setAttestHistory(attestHistory.slice(0, -1));
      console.error("User rejected transaction")
    } else {
      toast.error("Transaction failed")
      console.error("Transaction failed --", error)
    }
  }});

  useEffect(() => {
    if (attestDetails && chain?.name === "Goerli") {
      sendString?.();
    }
  }, [attestDetails]);

  useEffect(() => {
    if (!txData) return;
    if (chain?.name !== "Goerli") return;
    if (!attestDetails) return;
    setAttestHistory([...attestHistory, {about: attestDetails?.about, key: attestDetails?.key, value: attestDetails?.value, hash: txData?.hash, isCrossChain: chain?.name === "Goerli", crossChainIndicator: CrossChainIndicator({isCrossChain : chain?.name === "Goerli"}) }]);
  }, [txData, attestDetails])

  const navigate = useNavigate();
  if (!isConnected) {
    toast.error("Please connect wallet");
    navigate("/");
  }

  const restoreClass = (e: any) => {
    e.target.className = e.target.className.replace(
      " input-error animate-wiggle",
      "",
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let anyError = false;
    const about = e.target[0].value;
    // check about should start with 0x
    if (!about.startsWith("0x")) {
      toast.error("About should start with 0x");
      e.target[0].className += " input-error animate-wiggle";
      anyError = true;
    }

    const key = e.target[1].value;
    if (key.length == 0) {
      toast.error("Key should not be empty");
      e.target[1].className += " input-error animate-wiggle";
      anyError = true;
    }

    const value = e.target[2].value;
    if (value.length == 0) {
      toast.error("Value should not be empty");
      e.target[2].className += " input-error animate-wiggle";
      anyError = true;
    }
    if (anyError) return;

    setAttestDetails({ about, key, value });

    if (chain?.name === "Goerli") {
      return;
    } else {
      const prepAttest = await prepareWriteAttestation(about, key, value);
      try {
        const tx = await writeAttestation(prepAttest);
        console.log(about, key, value, tx)
        setAttestHistory([...attestHistory, { about, key, value, hash: tx.hash, isCrossChain: false, crossChainIndicator: CrossChainIndicator({isCrossChain : false})}]);
      } catch (error) {
        toast.error("User rejected transaction")
        setAttestHistory(attestHistory.slice(0, -1));
      }

    }
  };

  const handleOptionChange = async (event: any) => {
    const selectedNetwork = event.target.value;
    setSelectedOption(selectedNetwork);
  };

  return (
    <div className="container m-auto p-2 flex-col justify-center items-center">
      <div className="card w-3/4 m-auto bg-base-100 shadow-xl">
        <div className="card-body items-center">
          <h2 className="card-title text-center justify-center">
            Make Attestation
          </h2>
          <div className="flex justify-center items-center px-2 py-4">
            <div> From : </div>
            {isConnected ? (openChainModal && (
              <button onClick={openChainModal} className="btn btn-primary mx-2">
                {chain?.name || "Select a network"}
              </button>
            )) : <button className="btn btn-primary mx-2" disabled>
              No Wallet Connection
            </button>
            }
            <div> To :</div>
            <div className="relative inline-flex">
              <select
                className="form-select input input-bordered w-full max-w-xs"
                onChange={handleOptionChange}
                onFocus={restoreClass}
                disabled
              >
                <option value="option1">Optimism Goerli</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <i className="fa fa-chevron-down"></i>
              </span>
            </div>
          </div>
          <div className="form-control w-full max-w-xs justify-center">
            <form onSubmit={handleSubmit}>
              <label className="label">
                <span className="label-text">About</span>
                <span className="label-text-alt opacity-20">
                  The address about to attest
                </span>
              </label>
              <input
                onFocus={restoreClass}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />

              <label className="label">
                <span className="label-text">Key</span>
                <span className="label-text-alt opacity-20">
                  The key to attest
                </span>
              </label>
              <input
                onFocus={restoreClass}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />

              <label className="label">
                <span className="label-text">Value</span>
                <span className="label-text-alt opacity-20">
                  The value to attest
                </span>
              </label>
              <input
                onFocus={restoreClass}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />

              <div className="py-4">
                <button
                  type="submit"
                  className="btn btn-primary w-full max-w-xs py-4"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="py-4"></div>
      <div className="card w-3/4 m-auto bg-base-100 shadow-xl">
        <div className="card-body items-center">
          <h2 className="card-title text-center justify-center">
            Attestations (Current Session Only)
            <div className="tooltip-trigger">
              <i className="fas fa-question-circle black">?</i>
            </div>
            <div className="tooltip opacity-0 pointer-events-none">
              Current Session only. Refreshing or closing the page will clear the history.
            </div>
          </h2>
          <Table
            loading={false}
            headers={["about", "key", "value", "crossChainIndicator"]}
            contents={attestHistory}
          />
        </div>
      </div>
    </div>
  );
}
