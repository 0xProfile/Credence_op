# Cross-chain of Credence


Credence has utilized Hyperlane's cross-chain messaging feature and has experience in building infrastructure that navigates between networks for scalability purposes. The cross-chain attest can make Optimism’s AtteststationStation more powerful than ever, and make the Hyperlane become more widely utilized all over the networks.

Usage of Hyperlane package can be found at:

* Sender.sol - [L48 - L67](https://github.com/0xProfile/Credence_op/blob/main/contracts/cross-chain/Sender.sol#L48-L67)

  * Deployed at 0xDc043eFaDc715d40eFcb392d84881FC46aE2e23B - Goerli
- Receiver.sol - [L15-L45](https://github.com/0xProfile/Credence_op/blob/main/contracts/cross-chain/Receiver.sol#L15-L45)

  * Deployed at 0x03c669042158a66183cb222073ACe926700174d3 - Optimism - Goerli


# Detailed workflow:
- The front-end form will collect attestation information, e.g. about, key, value
- We will encode the value to a specific-designed pattern, and send the encoded message to Optimism Network using Hyperlane SDK and Sender.sol deployed on Sender Network. (For now, we will cover all the relayer fees that might involves in cross-chain messaging)
- The Receiver.sol will be triggered by Hyperlane Relayers, and it will decode the message back to its original content and pass it to attest() function of AttestationStation, then the attestation will be posted to the network. Since we already paid the relayer fee in step 2, this process will be triggered automatically.


