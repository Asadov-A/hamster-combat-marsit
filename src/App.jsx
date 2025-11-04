import { useState } from "react";
import "./App.css";
import userPhoto from "./assets/icons/union.png";
import bankIcon from "./assets/icons/bank-icon.png";
import clickIcon from "./assets/images/hamster.png";
import coinIcon from "./assets/icons/coin.png";
import limitIcon from "./assets/icons/limit-icon.png";
import mineIcon from "./assets/images/mine.png";
import friendsIcon from "./assets/images/friends.png";
import earnIcon from "./assets/images/earn.png";
import airdropIcon from "./assets/images/airdrop.png";

function App() {
  let [coins, setCoins] = useState(0);
  let [tapsEarned, setTapsEarned] = useState(1);
  let [hourEarnings, setHourEarnings] = useState(0);
  let [level, setLevel] = useState(1);
  let [remainingLimit, setRemainingLimit] = useState(100);
  let [generalLimit, setGeneralLimit] = useState(100);
  let [nextLevelCoin, setNextLevelCoin] = useState(1000);

  if (!window.limitInterval) {
  window.limitInterval = setInterval(() => {
    setRemainingLimit(prev => {
      if (prev < generalLimit) return prev + 1;
      return prev;
    });
  }, 5000);
}


  return (
    <div className="PhoneApp">
      <header>
        <div className="account-info">
          <div className="user">
            <div className="user-photo">
              <img src={userPhoto} alt="user-photo" />
            </div>

            <p className="user-name">Anonymouse</p>
          </div>

          <div className="bank">
            <img src={bankIcon} alt="bank-icon" />
            <p className="bank-name">Binance</p>
          </div>
        </div>
      </header>

      <main>
        <div className="main-top">
          <div className="stat">
            <p className="earn-coin">Earn per tap</p>
            <h3>
              <img src={coinIcon} alt="coin-icon" /> <span>+{tapsEarned}</span>
            </h3>
          </div>

          <div className="stat">
            <p className="level-coin">Coins to level up</p>
            <h3>
              <span>{nextLevelCoin}</span>
            </h3>
          </div>

          <div className="stat">
            <p className="hour-coin">Profit per hour</p>
            <h3>
              <img src={coinIcon} alt="coin-icon" />{" "}
              <span>+{hourEarnings}</span>
            </h3>
          </div>
        </div>

        <div className="main-center">
          <div className="coins-num">
            <img src={coinIcon} alt="coin-icon" />
            <h2>{coins}</h2>
          </div>

          <button
            onClick={() => {
              if (remainingLimit > 0) {
                setCoins(coins + tapsEarned);
                setRemainingLimit(remainingLimit - 1);
              }
            }}
            className="click-btn"
            disabled={remainingLimit <= 0}
          >
            <img src={clickIcon} alt="click-icon" />
          </button>

          <div className="clicks-limit">
            <div className="limit-num">
              <img src={limitIcon} alt="limit-icon" />
              <p>
                {generalLimit} / {remainingLimit}
              </p>
            </div>
            <button className="boost-btn">Boost</button>
          </div>
        </div>

        <div className="main-bottom">
          <button
            style={{ background: "#21242980", opacity: "100%" }}
            className="bottom-btn"
          >
            <img
              style={{ opacity: "100%" }}
              src={bankIcon}
              alt="main-bottom-icon"
            />
            <p style={{ opacity: "100%" }}>Exchange</p>
          </button>

          <button className="bottom-btn">
            <img
              style={{ opacity: "20%" }}
              src={mineIcon}
              alt="main-bottom-icon"
            />
            <p>Mine</p>
          </button>

          <button className="bottom-btn">
            <img
              style={{ height: "15px", marginBottom: "5px", marginTop: "6px" }}
              src={friendsIcon}
              alt="main-bottom-icon"
            />
            <p>Friends</p>
          </button>

          <button className="bottom-btn">
            <img
              style={{ height: "24px", marginTop: "2px" }}
              src={earnIcon}
              alt="main-bottom-icon"
            />
            <p>Earn</p>
          </button>

          <button className="bottom-btn">
            <img src={airdropIcon} alt="main-bottom-icon" />
            <p>Airdrop</p>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
