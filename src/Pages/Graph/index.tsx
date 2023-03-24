import { useQuery } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { querys } from "../../constants";
import G6 from '@antv/g6';
import { createKey } from "@eth-optimism/atst";
import { tryConvertBytes32ToString, tryConvertBytesToString } from "../../utils";
import { useParams } from "react-router-dom";

export default function Graph() {

  const {searchKey} = useParams();
  const [hoveredNode, setHoveredNode] = React.useState(null);
  const [toDisplay, setToDisplay] = React.useState([]);
  if (!searchKey) return <div>Invalid key</div>

  useEffect(() => {
    if (hoveredNode && data) {
      const temp = data.attestationCreateds.filter((item: any) => {
        return item.creator === hoveredNode || item.about === hoveredNode;
      });
      setToDisplay(temp);
    }
  }, [hoveredNode])

  const {data, error, loading} = useQuery(querys.QUERY_BY_KEY, {
    variables: {
      by: createKey(searchKey),
      first: 100,
      skip: 0,
    }
  });

  const g6Ref = useRef(null);

  useEffect(() => {
    if (!data || !g6Ref.current) return ;

    // get all abouts
    const nodes_about = data.attestationCreateds.map((item: any) => {
      return item.about;
    });
    // get all creators
    const nodes_creator = data.attestationCreateds.map((item: any) => {
      return item.creator;
    });

    // get all nodes
    const nodes = Array.from(new Set([...nodes_about, ...nodes_creator])).map((it) => {
      return {
        id: it,
        type: 'circle',
        label: it.slice(0, 4),
        draggable: true,
      }
    });


    // get all edges
    const edges = data.attestationCreateds.map((item: any) => {
      return {
        source: item.creator,
        target: item.about,
        type: item.creator === item.about ? 'loop' : 'line',
        style: {
          endArrow: true,
        }
      }
    });

    const data_ = {
      nodes,
      edges,
    };

    const g = new G6.Graph({
      container: g6Ref.current,
      layout: {
        type: 'force',
        preventOverlap: true,
        linkDistance: 200,
      },
      modes: {
        default: ['drag-node'],

      },
      width: 800,
      height: 500,
      directed: true,
    });

    g.data(data_);

    g.on('node:mouseover', (evt) => {
      setHoveredNode(evt.item?.get('id') || null);
    });

    g.render();


  }, [data, g6Ref]);

  return (
    <div className="container p-2 m-auto flex justify-center">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center justify-center">Graph</h2>
          <div ref={g6Ref}></div>
        </div>
      </div>

      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body  overflow-y-auto max-h-96">
          <h2 className="card-title text-center justify-center">Content</h2>
          <div className="max-h-full">
            {toDisplay.map((item: any) => {
              return (
                <div className="card max-h-full">
                  <div className="card-body max-h-full scroll-m-0">
                    <p>{item.about}</p>
                    <p>{item.creator}</p>
                    <p>{tryConvertBytes32ToString(item.key)}</p>
                    <p>{tryConvertBytesToString(item.val)}</p>
                  </div>
                </div>
              )
            })}
            </div>
        </div>
      </div>
    </div>
  );
}
