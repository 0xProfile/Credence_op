import React, { useEffect } from "react";
import { Table } from "../../components";
import { useQuery } from '@apollo/client';
import { querys } from "../../constants";
import { useNavigate } from "react-router-dom";
import { tryConvertBytes32ToString, tryConvertBytesToString } from "../../utils";

const TABLE_HEADERS = ["about", "key", "value"];

export default function Home() {
  const { loading, error, data } = useQuery(querys.LATEST_ATTESTATION);
  const [ mappedData, setMappedData ] = React.useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      const mappedData = data.attestationCreateds.map((item: any) => {
        return {
          about: item.about,
          // TODO: fix parsing error?
          key: tryConvertBytes32ToString(item.key),
          value: tryConvertBytesToString(item.val),
          hash: item.transactionHash,
        };
      });
      setMappedData(mappedData);
    }
  }, [data]);
  if (error) navigate('/error');
  return (
    <div className="container p-2 flex m-auto justify-center">
      <div className="card w-3/4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center justify-center">Recent attestations</h2>
          <Table loading={loading} headers={TABLE_HEADERS} contents={mappedData} />
        </div>
      </div>
    </div>
  );
}
