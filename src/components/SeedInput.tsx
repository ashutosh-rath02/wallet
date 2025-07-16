import React from "react";

interface SeedInputProps {
  mnemonic: string;
  setMnemonic: (m: string) => void;
}

const SeedInput: React.FC<SeedInputProps> = ({ mnemonic, setMnemonic }) => (
  <div className="seed-box">
    <label htmlFor="seed-input" className="seed-label">
      Seed Phrase
    </label>
    <textarea
      id="seed-input"
      className="seed-input"
      value={mnemonic}
      onChange={(e) => setMnemonic(e.target.value)}
      rows={3}
      placeholder="Enter your 12/24-word seed phrase..."
    />
  </div>
);

export default SeedInput;
