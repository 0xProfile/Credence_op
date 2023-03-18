// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@hyperlane-xyz/core/interfaces/IMailbox.sol";

contract HyperlaneMessageReceiver {
  address hyperMailbox = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;

  IMailbox inbox = IMailbox(hyperMailbox);
  bytes32 public lastSender;
  string public lastMessage;

  event ReceivedMessage(uint32 origin, bytes32 sender, bytes message);

  modifier onlyMailbox() {
    require(msg.sender == hyperMailbox);
    _;
  }

  function handle(
    uint32 _origin,
    bytes32 _sender,
    bytes calldata _message
  ) external onlyMailbox {
    lastSender = _sender;
    lastMessage = string(_message);
    emit ReceivedMessage(_origin, _sender, _message);
  }
}

// import {Semver} from "@eth-optimism/contracts-bedrock/contracts/universal/Semver.sol";
// import "@hyperlane-xyz/core/interfaces/IMailbox.sol";

// contract AttestationStation is Semver{

//     address public _inbox = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;
//     modifier onlyMailbox() {
//         require(msg.sender == _inbox);
//         _;
//     }
//     IMailbox inbox = IMailbox(_inbox);
//     bytes32 public lastSender;
//     string public lastMessage;

//     function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
//         return address(uint160(uint256(_buf)));
//     }

//     event ReceivedMessage(uint32 origin, bytes32 sender, bytes message);
//     function handle(
//         uint32 _origin,
//         bytes32 _sender,
//         bytes memory _message
//     ) external onlyMailbox() {
//       lastSender = _sender;
//       lastMessage = string(_message);
//     //   bytes32 key = "someKey";
//     //   bytes memory val = abi.encodePacked(lastMessage);
//     //   emit AttestationCreated(bytes32ToAddress(_sender), bytes32ToAddress(_sender), key, val);
//     //   attest(bytes32ToAddress(_sender), key, val);
//       emit ReceivedMessage(_origin, _sender, _message);
//     }

//     /**
//      * @custom:semver 1.1.0
//      */
//     constructor() Semver(1, 1, 0) {}

//     /**
//      * @notice Struct representing data that is being attested.
//      *
//      * @custom:field about Address for which the attestation is about.
//      * @custom:field key   A bytes32 key for the attestation.
//      * @custom:field val   The attestation as arbitrary bytes.
//      */
//     struct AttestationData {
//         address about;
//         bytes32 key;
//         bytes val;
//     }

//     /**
//      * @notice Maps addresses to attestations. Creator => About => Key => Value.
//      */
//     mapping(address => mapping(address => mapping(bytes32 => bytes)))
//         public attestations;

//     /**
//      * @notice Emitted when Attestation is created.
//      *
//      * @param creator Address that made the attestation.
//      * @param about   Address attestation is about.
//      * @param key     Key of the attestation.
//      * @param val     Value of the attestation.
//      */
//     event AttestationCreated(
//         address indexed creator,
//         address indexed about,
//         bytes32 indexed key,
//         bytes val
//     );

//     /**
//      * @notice Allows anyone to create an attestation.
//      *
//      * @param _about Address that the attestation is about.
//      * @param _key   A key used to namespace the attestation.
//      * @param _val   An arbitrary value stored as part of the attestation.
//      */
//     function attest(
//         address _about,
//         bytes32 _key,
//         bytes memory _val
//     ) public {
//         attestations[_about][_about][_key] = _val;

//         emit AttestationCreated(_about, _about, _key, _val);
//     }
//     /**
//      * @notice Allows anyone to create attestations.
//      *
//      * @param _attestations An array of attestation data.
//      */
//     function attest(AttestationData[] calldata _attestations) external {
//         uint256 length = _attestations.length;
//         for (uint256 i = 0; i < length; ) {
//             AttestationData memory attestation = _attestations[i];

//             attest(attestation.about, attestation.key, attestation.val);

//             unchecked {
//                 ++i;
//             }
//         }
//     }
// }
