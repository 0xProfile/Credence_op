import { gql } from "@apollo/client";

const LATEST_ATTESTATION = gql`
  query LatestAttestation {
    attestationCreateds(orderBy: blockNumber, orderDirection: desc, first: 10) {
      about
      key
      val
      blockNumber
      blockTimestamp
    }
  }
`;

export { LATEST_ATTESTATION };
