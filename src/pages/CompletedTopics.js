import React, { useEffect, useState } from "react";
import axios from "../services/api";

function CompletedTopics() {
  const [completedTopics, setCompletedTopics] = useState([]);

  useEffect(() => {
    fetchCompleted();
  }, []);

  const fetchCompleted = async () => {
    const response = await axios.get("/topics");
    const completed = response.data.filter((t) => t.completed);
    setCompletedTopics(completed);
  };

  return (
    <div className="completed-topics">
      <h2>Sujets Appris</h2>
      <ul>
        {completedTopics.length > 0 ? (
          completedTopics.map((topic) => (
            <li key={topic.id}>{topic.title}</li>
          ))
        ) : (
          <p>Aucun sujet complété pour le moment.</p>
        )}
      </ul>
    </div>
  );
}

export default CompletedTopics;
