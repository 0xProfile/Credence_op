import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";
import { useWaitForTransaction } from "wagmi";

interface ITableProps {
  headers: string[];
  contents: (Record<string, string | JSX.Element > & { hash: `0x${string}` } & { crossChainIndicator?: JSX.Element } & {isCrossChain? : boolean})[];
  loading?: boolean;
  crossChainIndicator?: JSX.Element; // optional parameter for displaying isCrossChain column
}

interface IRowProps {
  // a record of string and function that returns JSX.Element
  content: Record<string, string | JSX.Element> & { hash: `0x${string}` };

  headers: string[];
}

const Row = ({ content, headers }: IRowProps) => {
  const { isLoading } = useWaitForTransaction({
    chainId: content["isCrossChain"] ? 1 : 420, // to ensure it always fetch from the right chain and TODO: make it dynamic
    confirmations: 8,
    hash: content.hash,
  });

  const navigate = useNavigate();

  console.log(content);
  return <tr
    key={`tr-${content.hash}`}
    className="cursor-pointer"
    onClick={() => {
      if (!isLoading && !content["isCrossChain"]) {
        navigate(`/attestation/${content["hash"]}`);
      }
    }}
  >
    {headers.map((header, td_index) => {
        return (
          <td
            key={`td-${td_index}`}
            className="overflow-hidden text-ellipsis"
          >
            {content[header]}
          </td>
        );
    })}
    <td className="overflow-hidden text-ellipsis">
      {isLoading ? "Pending..." : (content["isCrossChain"] ? "Cross Chain Message" : "Finished")}
    </td>
  </tr>

}

export const Table = ({ headers, contents, loading = false, isCrossChain, crossChainIndicator}: ITableProps) => {
  if (loading) return <Skeleton />;

  if (isCrossChain) {
    headers.push("isCrossChain"); // add header for isCrossChain column
  }

  if (crossChainIndicator) {
    headers.push("crossChainIndicator"); // add header for isCrossChain column
  }

  return (
    <div className="">
      <table className="table-fixed table table-zebra w-full text-center">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={`header-${index}`}>{header}</th>
            ))}
            <th >Status</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((content, index) => {
            return <Row content={content} headers={headers} key={`row-${index}`} />
          })}
        </tbody>
      </table>
    </div>
  );
};