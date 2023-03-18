// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@hyperlane-xyz/core/interfaces/IMailbox.sol";
import "@hyperlane-xyz/core/interfaces/IInterchainGasPaymaster.sol";

contract HyperlaneMessageSender {
  address owner = 0x1e225BBf3347497B4898e6DAB028A8800bDcd447;

  IMailbox outbox = IMailbox(0xCC737a94FecaeC165AbCf12dED095BB13F037685);
  IInterchainGasPaymaster igp =
    IInterchainGasPaymaster(0xF90cB82a76492614D07B82a7658917f3aC811Ac1);

  event SentMessage(
    uint32 destinationDomain,
    address recipient,
    string message
  );

  // alignment preserving cast
  function addressToBytes32(address _addr) internal pure returns (bytes32) {
    return bytes32(uint256(uint160(_addr)));
  }

  function withdraw(address payable recipient) external {
    require(msg.sender == owner, "Only the contract owner can withdraw funds");
    recipient.transfer(address(this).balance);
  }

  function checkQuotedPayment(
    uint32 _destinationDomain,
    uint256 gasAmount
  ) public view returns (uint256) {
    uint256 quotedPayment = igp.quoteGasPayment(_destinationDomain, gasAmount);
    return quotedPayment;
  }

  function sendString(
    uint32 _destinationDomain,
    address _recipient,
    string calldata _message
  ) external payable {
    bytes32 messageId = outbox.dispatch(
      _destinationDomain,
      addressToBytes32(_recipient),
      bytes(_message)
    );
    uint256 gasAmount = 50000;
    uint256 quotedPayment = igp.quoteGasPayment(_destinationDomain, gasAmount);

    igp.payForGas{value: quotedPayment}(
      messageId, // The ID of the message that was just dispatched
      _destinationDomain, // The destination domain of the message
      gasAmount,
      address(this)
    );
    emit SentMessage(_destinationDomain, _recipient, _message);
  }

  receive() external payable {}
}
