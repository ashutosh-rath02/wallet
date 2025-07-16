import { Connection, PublicKey } from "@solana/web3.js";

export const fetchSolanaBalance = async (publicKey: PublicKey) => {
  const connection = new Connection(
    "https://solana-mainnet.g.alchemy.com/v2/THaYluCN7qhW1hFtqIlL5rXPpiCz2BJl"
  );
  const balance = await connection.getBalance(publicKey);
  return balance;
};
