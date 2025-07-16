import React from "react";
import WalletItem from "./WalletItem";

interface WalletListProps {
  wallets: Array<{
    address: string;
    balance: string | number | undefined;
    label?: string;
  }>;
}

const WalletList: React.FC<WalletListProps> = ({ wallets }) => {
  if (wallets.length === 0) {
    return <div className="wallet-list-empty">No wallets added yet.</div>;
  }
  return (
    <div className="wallet-list">
      {wallets.map((w, i) => (
        <WalletItem
          key={w.address + i}
          address={w.address}
          balance={w.balance}
          label={w.label}
        />
      ))}
    </div>
  );
};

export default WalletList;
