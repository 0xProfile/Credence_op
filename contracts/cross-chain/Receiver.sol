// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "@hyperlane-xyz/core/interfaces/IMailbox.sol";
import "./AttestationStation.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract HyperlaneReceiver {
  using Strings for uint256;

  AttestationStation attestationStation =
    AttestationStation(0xEE36eaaD94d1Cc1d0eccaDb55C38bFfB6Be06C77);

  address public _inbox = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;
  modifier onlyMailbox() {
    require(msg.sender == _inbox);
    _;
  }
  IMailbox inbox = IMailbox(_inbox);
  bytes32 public lastSender;
  string public lastMessage;

  function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
    return address(uint160(uint256(_buf)));
  }

  event ReceivedMessage(uint32 origin, bytes32 sender, bytes message);

  function handle(
    uint32 _origin,
    bytes32 _sender,
    bytes memory _message
  ) external onlyMailbox {
    lastSender = _sender;
    lastMessage = string(_message);
    (string memory a, string memory b, string memory c) = parseString(
      string(_message)
    );
    address _about = address(bytes20(bytes(a)));
    bytes32 _key = bytes32(bytes(b));
    bytes memory _val = bytes(c);
    attestationStation.attest(_about, _key, _val);

    emit ReceivedMessage(_origin, _sender, _message);
  }

  function parseString(
    string memory input
  ) public pure returns (string memory, string memory, string memory) {
    string[] memory parts = splitString(input, ",");
    require(parts.length == 3, "Invalid input format");
    return (parts[0], parts[1], parts[2]);
  }

  function splitString(
    string memory input,
    string memory separator
  ) private pure returns (string[] memory) {
    bytes memory inputBytes = bytes(input);
    bytes memory separatorBytes = bytes(separator);
    string[] memory parts = new string[](
      countOccurrences(inputBytes, separatorBytes) + 1
    );
    uint256 startIndex = 0;
    uint256 partIndex = 0;
    for (
      uint256 i = 0;
      i < inputBytes.length - separatorBytes.length + 1;
      i++
    ) {
      bool matchBool = true;
      for (uint256 j = 0; j < separatorBytes.length; j++) {
        if (inputBytes[i + j] != separatorBytes[j]) {
          matchBool = false;
          break;
        }
      }
      if (matchBool) {
        parts[partIndex++] = string(
          bytesMemorySubstring(inputBytes, startIndex, i - startIndex)
        );
        startIndex = i + separatorBytes.length;
      }
    }
    parts[partIndex++] = string(
      bytesMemorySubstring(
        inputBytes,
        startIndex,
        inputBytes.length - startIndex
      )
    );
    return parts;
  }

  function countOccurrences(
    bytes memory input,
    bytes memory pattern
  ) private pure returns (uint256) {
    uint256 count = 0;
    for (uint256 i = 0; i < input.length - pattern.length + 1; i++) {
      bool matchBool = true;
      for (uint256 j = 0; j < pattern.length; j++) {
        if (input[i + j] != pattern[j]) {
          matchBool = false;
          break;
        }
      }
      if (matchBool) {
        count++;
      }
    }
    return count;
  }

  function bytesMemorySubstring(
    bytes memory input,
    uint256 start,
    uint256 length
  ) private pure returns (bytes memory) {
    bytes memory result = new bytes(length);
    for (uint256 i = 0; i < length; i++) {
      result[i] = input[start + i];
    }
    return result;
  }
}
