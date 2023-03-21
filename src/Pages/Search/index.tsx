import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../Error";
import { useQuery } from '@apollo/client';
import { querys } from "../../constants";
import { Table } from "../../components";
import Skeleton from "../../components/Skeleton";
import { createKey, readAttestationString } from "@eth-optimism/atst";
import { tryConvertBytes32ToString, tryConvertBytesToString } from "../../utils";


export default function Search() {
  let { searchType, searchValue } = useParams();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [ mappedData, setMappedData ] = React.useState([]);

  const navigate = useNavigate();

  if (searchType === undefined || searchValue === undefined || searchType === '' || searchValue === '') return <Error />;

  let query = undefined;

  document.addEventListener('keydown', (e: any) => {
    if (e.key === 'Enter') {
      if (searchValue !== '' && searchType !== '') {
        setCurrentPage(0);
      }
    }
  });

  switch (searchType) {
    case 'about':
      query = querys.QUERY_BY_ABOUT;
      break;
    case 'key':
      query = querys.QUERY_BY_KEY;
      break;
    default:
      return <Error />;
  }

  if (searchType === 'key') {
    // encode key
    searchValue = createKey(searchValue)
  }

  const { loading, error, data } = useQuery(query, {
    variables: {
      by: searchValue,
      first: 10,
      skip: currentPage * 10,
    }
  });

  useEffect(() => {
    if (data) {
      const mappedData = data.attestationCreateds.map((item: any) => {
        return {
          about: item.about,
          key: tryConvertBytes32ToString(item.key),
          val: tryConvertBytesToString(item.val),
          id: item.id,
        };
      });
      setMappedData(mappedData);
    }
  }, [data]);


  if (loading) return <Skeleton />
  if (error) navigate('/error');

  return (
    <div className="container p-2 flex m-auto justify-center">
      <div className="card w-3/4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center justify-center">Search</h2>
          <Table loading={loading} headers={['about', 'key', 'val']} contents={mappedData} />
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