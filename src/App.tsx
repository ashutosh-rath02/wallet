import { useState } from "react";
import { generateMnemonic } from "bip39";
import "./App.css";
import { SolanaWallet } from "./components/SolanaWallet";
import { EthWallet } from "./components/EthWallet";
import { ChevronDown, ChevronRight } from "lucide-react";

function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="collapsible-section">
      <div className="collapsible-header" onClick={() => setOpen((v) => !v)}>
        <span className="collapsible-arrow">
          {open ? <ChevronDown size={22} /> : <ChevronRight size={22} />}
        </span>
        {icon && <span className="collapsible-icon">{icon}</span>}
        <span className="collapsible-title">{title}</span>
      </div>
      {open && <div className="collapsible-content">{children}</div>}
    </div>
  );
}

function SeedPhraseBox({ mnemonic }: { mnemonic: string }) {
  const words = mnemonic.trim().split(/\s+/);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!mnemonic) return;
    navigator.clipboard.writeText(mnemonic);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  if (!mnemonic) {
    return (
      <div className="seed-phrase-empty-prompt">
        Generate or enter a seed phrase to get started.
      </div>
    );
  }

  return (
    <div className="seed-phrase-section">
      <div
        className="seed-phrase-grid"
        onClick={handleCopy}
        title="Click to copy"
      >
        {words.map((word, idx) => (
          <div className="seed-word-box" key={idx}>
            {word}
          </div>
        ))}
      </div>
      <div className="seed-phrase-copy-hint">
        {copied ? "Copied!" : "\uD83D\uDCCB Click Anywhere To Copy"}
      </div>
    </div>
  );
}

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div className="app-root-dark">
      <header className="app-header">
        <div className="logo-row">
          <span className="logo-icon">🎨</span>
          <span className="logo-title">Palette Wallet</span>
        </div>
      </header>
      <main className="main-content main-content-wide">
        <div className="main-sections-container">
          <CollapsibleSection
            title="Your Secret Phrase"
            icon={
              <span role="img" aria-label="lock">
                🔒
              </span>
            }
            defaultOpen={true}
          >
            <button
              className="generate-seed-btn"
              onClick={async function () {
                const mn = await generateMnemonic();
                setMnemonic(mn);
              }}
            >
              Create Seed Phrase
            </button>
            <SeedPhraseBox mnemonic={mnemonic} />
          </CollapsibleSection>
          <CollapsibleSection
            title="Ethereum Wallet"
            icon={
              <span role="img" aria-label="ethereum">
                🦄
              </span>
            }
            defaultOpen={true}
          >
            <EthWallet mnemonic={mnemonic} />
          </CollapsibleSection>
          <CollapsibleSection
            title="Solana Wallet"
            icon={
              <span role="img" aria-label="solana">
                💎
              </span>
            }
            defaultOpen={true}
          >
            <SolanaWallet mnemonic={mnemonic} />
          </CollapsibleSection>
        </div>
      </main>
    </div>
  );
}

export default App;
