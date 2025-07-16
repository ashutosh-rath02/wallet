import { useState } from "react";
import { generateMnemonic } from "bip39";
import "./App.css";
import { SolanaWallet } from "./components/SolanaWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  return (
    <>
      <button
        onClick={async function () {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Create Seed Phrase
      </button>
      <div>{mnemonic}</div>
      <SolanaWallet mnemonic={mnemonic} />
    </>
  );
}

export default App;
