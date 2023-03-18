import React, { useEffect, useState } from "react";

import { prepareWriteAttestation, writeAttestation } from '@eth-optimism/atst'
import { useAccount, useSigner } from "wagmi";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Table } from "../../components";

export default function MakeAttestation() {
  const {isConnected} = useAccount();

  const [ attestHistory, setAttestHistory ] = useState<any>([])

  const navigate = useNavigate();
  if (!isConnected) {
    toast.error('Please connect wallet');
    navigate('/');
  }

  const restoreClass = (e: any) => {
    e.target.className = e.target.className.replace(' input-error animate-wiggle', '');
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let anyError = false;
    const about = e.target[0].value;
    // check about should start with 0x
    if (!about.startsWith('0x')) {
      toast.error('About should start with 0x');
      e.target[0].className += ' input-error animate-wiggle';
      anyError = true;
    }

    const key = e.target[1].value;
    if (key.length == 0) {
      toast.error('Key should not be empty');
      e.target[1].className += ' input-error animate-wiggle';
      anyError = true;
    }

    const value = e.target[2].value;
    if (value.length == 0) {
      toast.error('Value should not be empty');
      e.target[2].className += ' input-error animate-wiggle';
      anyError = true;
    }
    if (anyError) return;


    const prepAttest = await prepareWriteAttestation(about, key, value);
    setAttestHistory([...attestHistory, {about, key, value}])
    const tx = await writeAttestation(prepAttest);
    const receipt = await tx.wait();

  }

  return (
    <div className="container m-auto p-2 flex-col justify-center items-center">
      <div className="card w-3/4 m-auto bg-base-100 shadow-xl">
        <div className="card-body items-center">
          <h2 className="card-title text-center justify-center">Make Attestation</h2>
          <div className="form-control w-full max-w-xs justify-center">
            <form onSubmit={handleSubmit}>
              <label className="label">
                <span className="label-text">About</span>
                <span className="label-text-alt opacity-20">The address about to attest</span>
              </label>
              <input onFocus={restoreClass} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

              <label className="label">
                <span className="label-text">Key</span>
                <span className="label-text-alt opacity-20">The key to attest</span>
              </label>
              <input onFocus={restoreClass} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

              <label className="label">
                <span className="label-text">Value</span>
                <span className="label-text-alt opacity-20">The value to attest</span>
              </label>
              <input onFocus={restoreClass} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

              <div className="py-4">
                <button type="submit" className="btn btn-primary w-full max-w-xs py-4">Submit</button>
              </div>
            </form>

          </div>
        </div>
      </div>
      <div className="py-4"></div>
      <div className="card w-3/4 m-auto bg-base-100 shadow-xl">
        <div className="card-body items-center">
          <h2 className="card-title text-center justify-center">Attestation History</h2>
          <Table loading={false} headers={['about', 'key', 'value']} contents={attestHistory} />
        </div>
      </div>
    </div>
  );
}