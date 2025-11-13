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
import card1 from "./assets/icons/m.png";
import card2 from "./assets/icons/troll.png";
import card3 from "./assets/icons/10.png";
import card4 from "./assets/icons/20.png";
import card5 from "./assets/icons/30.png";
import card6 from "./assets/icons/50.png";
import card7 from "./assets/icons/japan.png";
import card8 from "./assets/icons/qa.png";

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
  const [levelsModal, setLevelsModal] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPanel, setAdminPanel] = useState(false);

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

  const mineCards = [
    { img: card1, cardName: "Тоp 10 cmc pairs", perMinut: 40, price: 3600 },
    { img: card2, cardName: "Mene coins", perMinut: 100, price: 6000 },
    { img: card3, cardName: "Margin trading x10", perMinut: 10, price: 960 },
    { img: card4, cardName: "Margin trading x20", perMinut: 20, price: 1700 },
    { img: card5, cardName: "Margin trading x30", perMinut: 30, price: 2800 },
    { img: card6, cardName: "Margin trading x50", perMinut: 50, price: 3900 },
    { img: card7, cardName: "Licence Japan", perMinut: 300, price: 15000 },
    { img: card8, cardName: "QA team", perMinut: 800, price: 90000 },
  ];

  useEffect(() => {
    if (level >= 1 && level <= levelNames.length) {
      setLevelName(levelNames[level - 1]);
    } else {
      setLevelName("Unknown");
    }
  }, [level]);

  useEffect(() => {
   if(adminMode){
     const limitInterval = setInterval(() => {
      setRemainingLimit((prev) => (prev < generalLimit ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(limitInterval);
   }else{
     const limitInterval = setInterval(() => {
      setRemainingLimit((prev) => (prev < generalLimit ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(limitInterval);
   }
  }, [generalLimit]);

  const clickTextFunc = () => {
    const main = document.querySelector("main");
    const clickText = document.createElement("h3");
    clickText.style.top = `${Math.round(Math.random() * 560)}px`;
    clickText.style.left = `${Math.round(Math.random() * 300)}px`;
    if(adminMode){
      clickText.textContent = `+${tapsEarned * 100}`;
    }else{
      clickText.textContent = `+${tapsEarned}`;
    }
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
      if (level == 10) {
        setNextLevelCoin(1000000000);
      } else {
        setNextLevelCoin((c) => Math.round(c * 4));
      }
      setGeneralLimit((gl) => Math.round(gl + 500));
      setRemainingLimit(generalLimit + 500);
      setTapsEarned(tapsEarned * 2);
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

   if(adminMode){
     setTimeout(() => {
      boostBtn.disabled = false;
    }, 4000);
   }else{
     setTimeout(() => {
      boostBtn.disabled = false;
    }, 360000);
   }
  };


  return (
    <div
      onClick={levelsModal ? () => setLevelsModal(false) : null}
      className="PhoneApp"
    >
      <header
        style={userMenu == "mine" ? { opacity: "0%", height: "1px" } : null}
      >

      <div
      style={adminPanel ? {opacity: "100%", height: "100px"} : {opacity: "0%", height: "1px"}}
      onMouseEnter={() => setAdminPanel(true)} onMouseLeave={() => setAdminPanel(false)}
       className="admin-panel">
        <h2>Admin Mode:</h2>
        <button onClick={() => setAdminMode(!adminMode)}>{adminMode ? "On" : "Off" }</button>
      </div>


        <div className="account-info">
          <div onMouseEnter={() => setAdminPanel(true)} onMouseLeave={() => setAdminPanel(false)} className="user">
            <div className="user-photo">
              <img src={userPhoto} alt="user" />
            </div>
            <p className="user-name">Anonymouse</p>
          </div>

          <a
            target="_blank"
            href="https://youtu.be/xvFZjo5PgG0?si=f2uA7Gp51V4oVTY0"
          >
            <div className="bank">
              <img src={bankIcon} alt="bank" />
              <p className="bank-name">Binance</p>
            </div>
          </a>
        </div>
      </header>

      <main style={userMenu == "mine" ? { height: "640px" } : null}>
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

        <div className="coins-num">
          <img src={coinIcon} alt="coin" />
          <h2>{coins}</h2>
        </div>

        {userMenu === "main" ? (
          <div className="main-center">
            <div className="level-sign">
              <div className="level-info">
                <p onClick={() => setLevelsModal(true)} className="level-name">
                  {levelName + " >"}
                </p>
                <p className="level-num">
                  <span>Level </span>
                  {level}/11
                </p>
              </div>
              <div className="level-line-box">
                <div
                  style={{
                    width: `${Math.min((coins / nextLevelCoin) * 100, 100)}%`,
                  }}
                  className="level-line"
                ></div>
              </div>
            </div>

            {levelsModal && (
              <div className="levels-names">
                <ol>
                  {levelNames.map((name, i) => (
                    <li
                      key={i}
                      style={
                        levelName === name
                          ? { color: "yellow" }
                          : { color: "#fffefd" }
                      }
                    >
                      {name}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <button
              onClick={() => {
                if (remainingLimit > 0) {
                 if(adminMode){
                  setCoins((c) => c + tapsEarned * 100);
                  setGClicks((c) => c + tapsEarned * 100);
                  setRemainingLimit((l) => l - 1);
                  clickTextFunc();
                 }else{
                   setCoins((c) => c + tapsEarned);
                  setGClicks((c) => c + tapsEarned);
                  setRemainingLimit((l) => l - 1);
                  clickTextFunc();
                 }
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

            <div className="boost-timeout">
              <div
                style={
                  boost === false
                    ? { backgroundColor: "transparent", width: "100%" }
                    : { backgroundColor: "red", width: `${boostTime}%` }
                }
                className="boost-timeout-line"
              ></div>
            </div>
          </div>
        ) : userMenu === "mine" ? (
          <div className="mine-menu">
            <div className="combos-box">
              <h2>COMING SOON . . .</h2>
            </div>

            <div className="mine-cards">
              {mineCards.map((cardDesc, id) => (
                <div className="mine-card" key={id}>
                  <div className="card-top">
                    <img src={cardDesc.img} alt={cardDesc.cardName} />
                    <div className="card-right">
                      <h3>{cardDesc.cardName}</h3>
                      <p>Profit per minut</p>
                      <h4>
                        <span>
                          <img src={coinIcon} />
                        </span>{" "}
                        {cardDesc.perMinut}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (coins >= cardDesc.price) {
                        setMinutEarnings(minutEarnings + cardDesc.perMinut);
                        setCoins((c) => c - cardDesc.price);
                      }
                    }}
                    className="card-bottom"
                  ><img src={coinIcon} alt="" />{cardDesc.price}</button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="main-bottom">
          <button
            onClick={() => setUserMenu("main")}
            style={
              userMenu == "main"
                ? { background: "#21242980", opacity: "100%" }
                : { background: "transparent", opacity: "50%" }
            }
            className="bottom-btn"
          >
            <img style={{ opacity: "100%" }} src={bankIcon} alt="bottom-icon" />
            <p style={{ opacity: "100%" }}>Exchange</p>
          </button>

          <button
            onClick={() => setUserMenu("mine")}
            style={
              userMenu == "mine"
                ? { background: "#21242980", opacity: "100%" }
                : { background: "transparent", opacity: "50%" }
            }
            className="bottom-btn"
          >
            <img style={{ opacity: "20%" }} src={mineIcon} alt="bottom-icon" />
            <p>Mine</p>
          </button>

          <button
            style={
              userMenu == "friends"
                ? { background: "#21242980", opacity: "100%" }
                : { background: "transparent", opacity: "50%" }
            }
            className="bottom-btn"
          >
            <img
              style={{ height: "15px", marginBottom: "5px", marginTop: "6px" }}
              src={friendsIcon}
              alt="bottom-icon"
            />
            <p>Friends</p>
          </button>

          <button
            style={
              userMenu == "earn"
                ? { background: "#21242980", opacity: "100%" }
                : { background: "transparent", opacity: "50%" }
            }
            className="bottom-btn"
          >
            <img
              style={{ height: "24px", marginTop: "2px" }}
              src={earnIcon}
              alt="bottom-icon"
            />
            <p>Earn</p>
          </button>

          <button
            style={
              userMenu == "airdrop"
                ? { background: "#21242980", opacity: "100%" }
                : { background: "transparent", opacity: "50%" }
            }
            className="bottom-btn"
          >
            <img src={airdropIcon} alt="bottom-icon" />
            <p>Airdrop</p>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
