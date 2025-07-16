import { useState, useEffect } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { fetchEthBalance } from "../hooks/fetchEthBalance";

export const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [balances, setBalances] = useState<{ [key: string]: bigint }>({});
  useEffect(() => {
    addresses.forEach((p) => {
      fetchEthBalance(p).then((balance: bigint) => {
        setBalances((prev) => ({ ...prev, [p]: balance }));
      });
    });
  }, [addresses]);
  return (
    <div>
      <button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrentIndex(currentIndex + 1);
          setAddresses([...addresses, wallet.address]);
        }}
      >
        Add ETH wallet
      </button>

      {addresses.map((p) => (
        <div key={p}>
          Eth - {p} - {balances[p] !== undefined ? balances[p] : "Loading..."}
        </div>
      ))}
    </div>
  );
};
