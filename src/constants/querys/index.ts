import { gql } from "@apollo/client";

const QUERY_BY_ASSET_ID = gql`
  query QueryByAssetId($assetId: String!) {
    attestationCreated(id: $assetId) {
      id
      about
      key
      val
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

const LATEST_ATTESTATION = gql`
  query LatestAttestation {
    attestationCreateds(orderBy: blockNumber, orderDirection: desc, first: 10) {
      id
      about
      key
      val
      blockNumber
      blockTimestamp
    }
  }
`;

export { LATEST_ATTESTATION, QUERY_BY_ASSET_ID };
