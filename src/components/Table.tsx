import React from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";

interface ITableProps {
  headers: string[];
  contents: Record<string, string>[];
  loading?: boolean
}

export const Table = ({headers, contents, loading=false}: ITableProps) => {
  const navigate = useNavigate();

  if (loading) return <Skeleton />

  return (<div className="">
    <table className="table-fixed table table-zebra w-full text-center">
      <thead>
        <tr>
          {
            headers.map((header, index) => (
              <th key={`header-${index}`}>{header}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          contents.map((content, tr_index) => (
            <tr key={`tr-${tr_index}`} className="cursor-pointer" onClick={() => {
              navigate(`/attestation/${content['id']}`);
            }}>
              {
                headers.map((header, td_index) => (
                  <td key={`td-${td_index}`}  className="overflow-hidden text-ellipsis">{content[header]}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>)
}