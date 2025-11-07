import React, { useEffect, useState } from "react";
import axios from "../services/api";

function LearningTopics() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const response = await axios.get("/topics");
    setTopics(response.data);
  };

  const handleAdd = async () => {
    if (!newTopic.trim()) return;
    const response = await axios.post("/topics", {
      title: newTopic,
      completed: false,
    });
    setTopics([...topics, response.data]);
    setNewTopic("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`/topics/${id}`);
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  const handleComplete = async (id) => {
    const topic = topics.find((t) => t.id === id);
    if (!topic) return;

    const updatedTopic = { ...topic, completed: true };
    await axios.put(`/topics/${id}`, updatedTopic);
    setTopics((prevTopics) =>
      prevTopics.map((t) => (t.id === id ? updatedTopic : t))
    );
  };

  return (
    <div className="learning-topics">
      <h2>Mes Sujets à Apprendre</h2>
      <div className="topic-form">
        <input
          type="text"
          placeholder="Ajouter un sujet (ex: React)"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
        />
        <button onClick={handleAdd}>Ajouter</button>
      </div>

      <ul>
        {topics
          .filter((t) => !t.completed)
          .map((topic) => (
            <li key={topic.id}>
              {topic.title}
              <button onClick={() => handleComplete(topic.id)}>✅</button>
              <button onClick={() => handleDelete(topic.id)}>🗑️</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default LearningTopics;
