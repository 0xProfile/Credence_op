import React from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";
import { Optimism, Ethereum } from "@thirdweb-dev/chain-icons";

interface ITableProps {
  headers: string[];
  contents: (Record<string, string | boolean> & { id: string })[]; // add boolean type to contents and specify 'id' field
  loading?: boolean;
  isCrossChain?: boolean; // optional parameter for displaying isCrossChain column
}

export const Table = ({ headers, contents, loading = false, isCrossChain = false }: ITableProps) => {
  const navigate = useNavigate();

  if (loading) return <Skeleton />;

  if (isCrossChain) {
    headers.push("isCrossChain"); // add header for isCrossChain column
  }

  return (
    <div className="">
      <table className="table-fixed table table-zebra w-full text-center">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={`header-${index}`}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contents.map((content, tr_index) => (
            <tr
              key={`tr-${tr_index}`}
              className="cursor-pointer"
              onClick={() => {
                navigate(`/attestation/${content["id"]}`);
              }}
            >
              {headers.map((header, td_index) => {
                if (header === "isCrossChain") {
                  return (
                    <td key={`td-${td_index}`} className="overflow-hidden text-ellipsis">
                      {content[header] ?
                        <div className="flex items-center justify-center">
                          <Ethereum className="w-6 h-6" />
                          <span className="px-4">&#8594;</span>
                          <Optimism className="w-6 h-6" />
                        </div> :
                        <div className="flex items-center justify-center"> <Optimism className="w-6 h-6" /> </div>}
                    </td>
                  );
                } else {
                  return (
                    <td key={`td-${td_index}`} className="overflow-hidden text-ellipsis">
                      {content[header]}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};