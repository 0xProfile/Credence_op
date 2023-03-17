import React from "react";
import { useNavigate } from "react-router-dom";

interface ITableProps {
  headers: string[];
  contents: Record<string, string>[];
}

export const Table = ({headers, contents}: ITableProps) => {
  const navigate = useNavigate();

  return (<div className="overflow-x-auto">
    <table className="table table-zebra w-full text-center">
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
              navigate(`/assert/${content[headers[0]]}`);
            }}>
              {
                headers.map((header, td_index) => (
                  <td key={`td-${td_index}`} className="text-ellipsis">{content[header]}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>)
}