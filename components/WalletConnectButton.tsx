import React, { useState, useEffect } from "react";
import Web3 from "web3";
import styles from "../styles/NavBar.module.css";
import { FaBalanceScale } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";

type Web3Instance = Web3 | null;
type Account = string | null;

const WalletConnectButton: React.FC = () => {
  const [web3, setWeb3] = useState<Web3Instance>(null);
  const [account, setAccount] = useState<Account>(null);

  useEffect(() => {
    if (window.ethereum && localStorage.getItem("connected")) {
      connectWallet();
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        localStorage.setItem("connected", "true");
      } catch (error) {
        console.error("Wallet connection failed", error);
      }
    } else {
      alert("MetaMask or another Ethereum wallet is required.");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setWeb3(null);
    localStorage.removeItem("connected");
  };

  return (
    <div>
      {account ? (
        // <div className="flex items-center gap-2">
        //   <span className="text-sm font-semibold">{account.slice(0, 6)}...{account.slice(-4)}</span>
        //   {/* <button onClick={disconnectWallet} variant="destructive">Disconnect</button> */}
        //   <button onClick={disconnectWallet}>Disconnect</button>
        // </div>
       
          <span className={styles.navbar_links}>
            <span className="text-sm font-semibold">{account.slice(0, 6)}...{account.slice(-4)}</span>
            <span onClick={disconnectWallet}><FaWallet /> Disconnect</span>
          </span>
        

      ) : (
       
          <span className={styles.navbar_links} onClick={connectWallet} >
            <FaWallet /> Connect
          </span>
        // <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnectButton;