import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { querys } from "../../constants";
import Skeleton from "../../components/Skeleton";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { parseHexString } from "../../utils";

export default function attestation() {
  const { attestationId } = useParams();
  const { loading, error, data } = useQuery(querys.QUERY_BY_ASSET_ID, {
    variables: { assetId: attestationId },
  });
  const navigate = useNavigate();

  const network = useNetwork();

  if (error) navigate('/error');
  if (loading) return <Skeleton />;

  return (
    <div className="container p-2 m-auto flex justify-center">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center justify-center">Attestation Details</h2>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center">
              <span className="text-xl font-bold">About: </span>
              <span className="text-xl">{data.attestationCreated.about}</span>
            </div>
            <div className="flex flex-row justify-center items-center">
              <span className="text-xl font-bold">Key: </span>
              <span className="text-xl">{ethers.utils.parseBytes32String(data.attestationCreated.key)}</span>
            </div>
            <div className="flex flex-row justify-center items-center">
              <span className="text-xl font-bold">Value: </span>
              <span className="text-xl">{String.fromCharCode(...parseHexString(data.attestationCreated.val as string))}</span>
            </div>
            <div className="flex flex-row justify-center items-center">
              <span className="text-xl font-bold">Transaction: </span>
              <a className="text-xl link" href={`${network.chain?.blockExplorers?.default.url}/tx/${data.attestationCreated.transactionHash}`}>{data.attestationCreated.transactionHash}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};