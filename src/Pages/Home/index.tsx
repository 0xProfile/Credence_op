import React, { useEffect } from "react";
import { Table } from "../../components";
import { useQuery } from '@apollo/client';
import { querys } from "../../constants";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const TABLE_HEADERS = ["about", "key", "value"];

export default function Home() {
  const { loading, error, data } = useQuery(querys.LATEST_ATTESTATION);
  const [ mappedData, setMappedData ] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      console.log(data)
      const mappedData = data.attestationCreateds.map((item: any) => {
        return {
          about: item.about,
          key: ethers.utils.parseBytes32String(item.key),
          value: item.val,
        };
      });
      setMappedData(mappedData);
    }
  }, [data]);
  if (error) navigate('/error');
  return (
    <div className="container p-2 flex justify-center">
      <div className="card w-3/4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center justify-center">Recent Asserts</h2>
          <Table loading={loading} headers={TABLE_HEADERS} contents={mappedData} />
        </div>
      </div>
    </div>
  );
}
