import React from "react";

interface AddWalletButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const AddWalletButton: React.FC<AddWalletButtonProps> = ({
  onClick,
  disabled,
}) => (
  <button
    className="add-wallet-btn"
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    Add Wallet
  </button>
);
