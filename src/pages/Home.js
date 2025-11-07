// src/pages/Home.js
import React from "react";
import homeIcon from "../assets/homeicon.png"; 

function Home() {
  return (
    <div className="home">
      <h1>Bienvenue sur la plateforme d'apprentissage !</h1>
      <img src={homeIcon} alt="Accueil" style={{ width: "150px", marginTop: "20px" }} />
      <p>Commencez à explorer les sujets ou consultez ceux que vous avez déjà complétés.</p>
    </div>
  );
}

export default Home;
