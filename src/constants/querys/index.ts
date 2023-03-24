import { gql } from "@apollo/client";

const QUERY_BY_ASSET_HASH = gql`
  query QueryByAssetHash($assetHash: String!) {
    attestationCreateds(where: { transactionHash: $assetHash }) {
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

const QUERY_BY_ABOUT = gql`
  query QueryByAbout($by: String!, $first: Int!, $skip: Int!) {
    attestationCreateds(where: { about: $by }, first: $first, skip: $skip) {
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

const QUERY_BY_KEY = gql`
  query QueryByKey($by: String!, $first: Int!, $skip: Int!) {
    attestationCreateds(where: { key: $by }, first: $first, skip: $skip) {
      id
      about
      key
      val
      blockNumber
      blockTimestamp
      transactionHash
      creator
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
      transactionHash
    }
  }
`;

export {
  LATEST_ATTESTATION,
  QUERY_BY_ASSET_HASH,
  QUERY_BY_ABOUT,
  QUERY_BY_KEY,
};
