import React from "react";

interface WalletItemProps {
  address: string;
  balance: string | number | undefined;
  label?: string;
}

const WalletItem: React.FC<WalletItemProps> = ({ address, balance, label }) => (
  <div className="wallet-item">
    {label && <div className="wallet-label">{label}</div>}
    <div className="wallet-key">{address}</div>
    <div className="wallet-balance">
      {balance !== undefined ? balance : "Loading..."}
    </div>
  </div>
);

export default WalletItem;
