import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import LearningTopics from "./pages/LearningTopics";
import CompletedTopics from "./pages/CompletedTopics";
import api from "./services/api";

function App() {
  const [topics, setTopics] = useState([]);

  // Charger les topics depuis le backend
  useEffect(() => {
    api.get("/topics")
      .then((res) => setTopics(res.data))
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  // Marquer un topic comme complété
  const handleComplete = (id) => {
    const topic = topics.find((t) => t.id === id);
    if (!topic) return;

    const updatedTopic = { ...topic, completed: true };
    api.put(`/topics/${id}`, updatedTopic)
      .then(() => {
        setTopics((prev) =>
          prev.map((t) => (t.id === id ? updatedTopic : t))
        );
      })
      .catch((err) => console.error("Erreur mise à jour :", err));
  };

  // Ajouter un nouveau topic
  const handleAddTopic = (newTopic) => {
    api.post("/topics", newTopic)
      .then((res) => {
        setTopics((prev) => [...prev, res.data]);
      })
      .catch((err) => console.error("Erreur d'ajout :", err));
  };

  // Supprimer un topic
  const handleDeleteTopic = (id) => {
    api.delete(`/topics/${id}`)
      .then(() => {
        setTopics((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((err) => console.error("Erreur suppression :", err));
  };

  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/topics"
              render={() => (
                <LearningTopics
                  topics={topics.filter((t) => !t.completed)}
                  onComplete={handleComplete}
                  onAddTopic={handleAddTopic}
                  onDelete={handleDeleteTopic}
                />
              )}
            />
            <Route
              path="/completed"
              render={() => (
                <CompletedTopics
                  topics={topics.filter((t) => t.completed)}
                  onDelete={handleDeleteTopic}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
