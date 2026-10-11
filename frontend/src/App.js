import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setTotal(data.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load questions:", err);
        setError("Failed to load quiz. Make sure the backend is running on http://localhost:5000");
        setLoading(false);
      });
  }, []);

  const handleAnswerSelect = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ answers })
    });

    const result = await response.json();
    setScore(result.score);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">📚 Quiz App</h1>

        {!submitted ? (
          <div className="quiz-section">
            {questions.map((q, index) => (
              <div key={q.id} className="question-card">
                <h3 className="question-number">Question {index + 1} of {total}</h3>
                <h2 className="question-text">{q.question}</h2>

                <div className="options">
                  {q.options.map((option) => (
                    <label key={option} className="option">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === option}
                        onChange={() => handleAnswerSelect(q.id, option)}
                      />
                      <span className="option-label">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button className="submit-btn" onClick={handleSubmit}>
              Submit Quiz
            </button>
          </div>
        ) : (
          <div className="results-section">
            <div className="result-card">
              <h2 className="result-title">Quiz Completed! 🎉</h2>
              <div className="score-display">
                <div className="score-value">{score}/{total}</div>
                <div className="score-label">Correct Answers</div>
              </div>

              <div className="score-percentage">
                {Math.round((score / total) * 100)}% Score
              </div>

              <button className="reset-btn" onClick={handleReset}>
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
