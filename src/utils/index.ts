import { ethers } from "ethers";

const encodeRawKey = (rawKey: string) => {
  if (rawKey.length < 32) return ethers.utils.formatBytes32String(rawKey);

  const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(rawKey));
  return hash.slice(0, 64) + "ff";
};

// parse a 0x string to a Uint8Array
const parseHexString = (str: string): number[] => {
  if (str.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }
  if (str.slice(0, 2) === "0x") {
    str = str.slice(2);
  }
  const result = new Array(str.length / 2);
  for (let i = 0; i < str.length; i += 2) {
    result[i / 2] = parseInt(`0x${str.slice(i, i + 2)}`, 16);
  }
  return result;
};

const tryConvertBytes32ToString = (bytes32Value: string) => {
  try {
    const stringValue = ethers.utils.parseBytes32String(bytes32Value);
    return stringValue;
  } catch (error) {
    console.error("Failed to convert bytes32 to string:", error);
    return bytes32Value;
  }
};

const tryConvertBytesToString = (bytesValue: string) => {
  try {
    const stringValue = Buffer.from(
      bytesValue.replace(/^0x/, ""),
      "hex",
    ).toString("utf-8");

    // Check if resulting string is ASCII or Unicode
    const isASCII = /^[\x00-\x7F]*$/.test(stringValue);

    if (isASCII) {
      return stringValue;
    } else {
      console.warn(
        "Solidity bytes did not decode to ASCII or Unicode:",
        stringValue,
      );
      return bytesValue;
    }
  } catch (error) {
    console.error("Failed to convert Solidity bytes to string:", error);
    return bytesValue;
  }
};

export {
  encodeRawKey,
  parseHexString,
  tryConvertBytes32ToString,
  tryConvertBytesToString,
};
