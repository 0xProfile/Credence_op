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

export { encodeRawKey, parseHexString };
