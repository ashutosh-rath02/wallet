import { ethers } from "ethers";

export const fetchEthBalance = async (address: string) => {
  const provider = new ethers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/THaYluCN7qhW1hFtqIlL5rXPpiCz2BJl"
  );
  const balance = await provider.getBalance(address);
  return balance;
};
