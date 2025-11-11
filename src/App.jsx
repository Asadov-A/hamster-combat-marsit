import { useState, useEffect, use } from "react";
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
  const [coins, setCoins] = useState(0);
  const [tapsEarned, setTapsEarned] = useState(1);
  const [minutEarnings, setMinutEarnings] = useState(10);
  const [level, setLevel] = useState(1);
  const [remainingLimit, setRemainingLimit] = useState(100);
  const [generalLimit, setGeneralLimit] = useState(100);
  const [nextLevelCoin, setNextLevelCoin] = useState(1000);
  const [levelName, setLevelName] = useState("Bronze");
  const [gClicks, setGClicks] = useState(0);
  const [boost, setBoost] = useState(false);
  const [boostTime, setBootsTime] = useState(100);
  const [userMenu, setUserMenu] = useState("main");

  const levelNames = [
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Epic",
    "Legendary",
    "Master",
    "Grandmaster",
    "Lord",
    "Creator",
  ];

  useEffect(() => {
    if (level >= 1 && level <= levelNames.length) {
      setLevelName(levelNames[level - 1]);
    } else {
      setLevelName("Unknown");
    }
  }, [level]);

  useEffect(() => {
    const limitInterval = setInterval(() => {
      setRemainingLimit((prev) => (prev < generalLimit ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(limitInterval);
  }, [generalLimit]);

  const clickTextFunc = () => {
    const main = document.querySelector("main");
    const clickText = document.createElement("h3");
    clickText.style.top = `${Math.round(Math.random() * 560)}px`;
    clickText.style.left = `${Math.round(Math.random() * 300)}px`;
    clickText.textContent = `+${tapsEarned}`;
    if (boost) {
      clickText.classList.add("click-text-red");
      main.appendChild(clickText);
    } else {
      clickText.classList.add("click-text");
      main.appendChild(clickText);
    }

    setTimeout(() => {
      clickText.style.opacity = "0";
      setTimeout(() => clickText.remove(), 500);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((c) => c + minutEarnings);
    }, 60000);
    return () => clearInterval(interval);
  }, [minutEarnings]);

  useEffect(() => {
    if (gClicks >= nextLevelCoin && level != 11) {
      setLevel((l) => l + 1);
      setCoins(0);
      setGClicks(0);
      setNextLevelCoin((c) => Math.round(c * 1.5));
      setGeneralLimit((gl) => Math.round(gl + 500));
      setRemainingLimit(generalLimit + 500);
      setTapsEarned(tapsEarned + 2);
    } else if (level == 11) {
      setNextLevelCoin(Infinity);
      setLevel(11);
    }
  }, [gClicks]);

  const boostFc = () => {
    const boostBtn = document.querySelector(".boost-btn");
    boostBtn.disabled = true;
    setBoost(true);

    const oldTaps = tapsEarned;
    setTapsEarned((t) => t * 2);
    setBootsTime(100);

    let timeLeft = 100;
    const boostInterval = setInterval(() => {
      timeLeft -= 1;
      setBootsTime(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(boostInterval);
      }
    }, 150);

    setTimeout(() => {
      setTapsEarned(oldTaps);
      setBoost(false);
    }, 15000);

    setTimeout(() => {
      boostBtn.disabled = false;
    }, 360000);
  };

  return (
    <div className="PhoneApp">
      <header>
        <div className="account-info">
          <div className="user">
            <div className="user-photo">
              <img src={userPhoto} alt="user" />
            </div>
            <p className="user-name">Anonymouse</p>
          </div>

          <div className="bank">
            <img src={bankIcon} alt="bank" />
            <p className="bank-name">Binance</p>
          </div>
        </div>
      </header>

      <main>
        <div className="main-top">
          <div className="stat">
            <p className="earn-coin">Earn per tap</p>
            <h3>
              <img src={coinIcon} alt="coin" /> <span>+{tapsEarned}</span>
            </h3>
          </div>

          <div className="stat">
            <p className="level-coin">Coins to level up</p>
            <h3>
              <span>{nextLevelCoin}</span>
            </h3>
          </div>

          <div className="stat">
            <p className="hour-coin">Profit per minut</p>
            <h3>
              <img src={coinIcon} alt="coin" /> <span>+{minutEarnings}</span>
            </h3>
          </div>
        </div>

        <div className="main-center">
          <div className="coins-num">
            <img src={coinIcon} alt="coin" />
            <h2>{coins}</h2>
          </div>

          <div className="level-sign">
            <div className="level-info">
              <p className="level-name">{levelName + " >"}</p>
              <p className="level-num">
                <span>Level </span>
                {level}/11
              </p>
            </div>
            <div className="level-line-box">
              <div
                style={{
                  width: `${Math.min((gClicks / nextLevelCoin) * 100, 100)}%`,
                }}
                className="level-line"
              ></div>
            </div>
          </div>

          <button
            onClick={() => {
              if (remainingLimit > 0) {
                setCoins((c) => c + tapsEarned);
                setGClicks((c) => c + tapsEarned);
                setRemainingLimit((l) => l - 1);
                clickTextFunc();
                alert(maxLevel);
              }
            }}
            className="click-btn"
            disabled={remainingLimit <= 0}
          >
            <img src={clickIcon} alt="click" />
          </button>

          <div className="clicks-limit">
            <div className="limit-num">
              <img src={limitIcon} alt="limit" />
              <p>
                {remainingLimit} / {generalLimit}
              </p>
            </div>
            <button onClick={boostFc} className="boost-btn">
              Boost
            </button>
          </div>
        </div>

        <div className="boost-timeout">
          <div
            style={
              boost == false
                ? { backgroundColor: "transparent", width: "100%" }
                : { backgroundColor: "red", width: `${boostTime}%` }
            }
            className="boost-timeout-line"
          ></div>
        </div>

        <div className="main-bottom">
          <button
            style={{ background: "#21242980", opacity: "100%" }}
            className="bottom-btn"
          >
            <img style={{ opacity: "100%" }} src={bankIcon} alt="bottom-icon" />
            <p style={{ opacity: "100%" }}>Exchange</p>
          </button>

          <button onClick={() => setUserMenu("mine")} className="bottom-btn">
            <img style={{ opacity: "20%" }} src={mineIcon} alt="bottom-icon" />
            <p>Mine</p>
          </button>

          <button className="bottom-btn">
            <img
              style={{ height: "15px", marginBottom: "5px", marginTop: "6px" }}
              src={friendsIcon}
              alt="bottom-icon"
            />
            <p>Friends</p>
          </button>

          <button className="bottom-btn">
            <img
              style={{ height: "24px", marginTop: "2px" }}
              src={earnIcon}
              alt="bottom-icon"
            />
            <p>Earn</p>
          </button>

          <button className="bottom-btn">
            <img src={airdropIcon} alt="bottom-icon" />
            <p>Airdrop</p>
          </button>
        </div>
      </main>
    </div>
  ) 
}

export default App;
