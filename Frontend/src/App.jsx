import "./index.css";
import styles from "./style";
import React from "react";
import { NavBar, Hero, Stats, Business, Billing, Card, Yomum } from "./components/tutorial Components";


const App= () => (
  <div className="bg-gray" style={{ backgroundColor: "gray" }}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`} >
          <NavBar />
        </div>
      </div>

      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`} >
          <Hero />
        </div>
      </div>

      <div className={`${style.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`} >
          <Stats />
          <Business />
          <Billing /> 
          <Card /> 
          <Yomum />
        </div>
      </div>

  </div>
)

export default App;