import React, { useEffect, useState } from "react";
import { Table } from "../../components";
import { useQuery } from '@apollo/client';
import { querys } from "../../constants";
import { useNavigate } from "react-router-dom";
import { tryConvertBytes32ToString, tryConvertBytesToString } from "../../utils";

const TABLE_HEADERS = ["about", "key", "value"];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const { loading, error, data } = useQuery(querys.LATEST_ATTESTATION, {
    variables: {
      first: 10,
      skip: currentPage * 10,
    }
  });
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
          <div className="btn-group grid grid-cols-2">
            <button className="btn btn-outline" disabled={currentPage <= 0} onClick={() => {
              if (currentPage > 0) setCurrentPage(currentPage - 1);
            }}>Previous page</button>
            <button className="btn btn-outline" disabled={mappedData.length != 10} onClick={() => {
              setCurrentPage(currentPage + 1);
            }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
