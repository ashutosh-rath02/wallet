import { useState, useEffect } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { fetchSolanaBalance } from "../hooks/fetchSolanaBalance";
import WalletList from "./WalletList";
import { AddWalletButton } from "./AddWalletButton";

export function SolanaWallet({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);
  const [balances, setBalances] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    publicKeys.forEach((p) => {
      const key = p.toBase58();
      if (balances[key] === undefined) {
        fetchSolanaBalance(p).then((balance: number) => {
          setBalances((prev) => ({ ...prev, [key]: balance }));
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKeys]);

  const handleAddWallet = async () => {
    if (!mnemonic.trim()) return;
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey]);
  };

  const wallets = publicKeys.map((p) => ({
    address: p.toBase58(),
    balance:
      balances[p.toBase58()] !== undefined
        ? `${balances[p.toBase58()]} lamports`
        : undefined,
  }));

  return (
    <div className="solana-wallet-root">
      <AddWalletButton onClick={handleAddWallet} disabled={!mnemonic.trim()} />
      <WalletList wallets={wallets} />
    </div>
  );
}
