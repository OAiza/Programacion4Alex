import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "./Quiz.css";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [validated, setValidated] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("KEY:", import.meta.env.VITE_JSONBIN_KEY);

    const apiKey = import.meta.env.VITE_JSONBIN_KEY;

    fetch("https://api.jsonbin.io/v3/b/69e5847eaaba88219718ab9c/latest", {
      headers: {
        "X-Master-Key": apiKey,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar el quiz");
        return res.json();
      })
      .then((data) => {
        console.log("DATA DEL JSONBIN:", data);

        // 🔥 FIX IMPORTANTE: JSONBin v3 devuelve { record: [...] }
        setQuestions(data.record || []);
        setCurrent(0);
      })
      .catch((err) => {
        setError(err.message);
        setQuestions([]);
      });
  }, []);

  const launchConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  const handleAnswer = (index) => {
    if (validated) return;

    setSelected(index);
    setValidated(true);

    if (questions[current] && index === questions[current].correctAnswer) {
      launchConfetti();
    }
  };

  const nextQuestion = () => {
    setCurrent((prev) => prev + 1);
    setSelected(null);
    setValidated(false);
  };

  /* =========================
     🎮 START SCREEN
  ========================= */
  if (!started) {
    return (
      <div className="container">
        <div className="card">
          <h1 className="quiz-page-title">OSCAR QUIZ SYSTEM</h1>
          <h2 className="quiz-titulo">⚡ Inicializando módulo...</h2>
          <p className="quiz-texto">
            Sistema cargado. ¿Listo para demostrar tu conocimiento?
          </p>

          <button className="startButton" onClick={() => setStarted(true)}>
            ▶ START GAME
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     ❌ ERROR
  ========================= */
  if (error) {
    return (
      <div className="container">
        <div className="card">
          <h2 className="loading">ERROR DEL SISTEMA</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  /* =========================
     ⏳ LOADING
  ========================= */
  if (!questions || questions.length === 0) {
    return <h2 className="loading">Cargando sistema...</h2>;
  }

  const q = questions[current];

  // 🔥 FIX CRÍTICO: evita crash si aún no existe pregunta
  if (!q) {
    return <h2 className="loading">Cargando pregunta...</h2>;
  }

  /* =========================
     🎮 QUIZ
  ========================= */
  return (
    <div className="container">
      <div className="card">
        <h2 className="question">{q.question}</h2>

        {q.answers.map((ans, i) => {
          let className = "button";

          if (validated) {
            if (i === q.correctAnswer) {
              className = "button correct";
            } else if (i === selected) {
              className = "button incorrect";
            }
          }

          return (
            <button
              key={i}
              className={className}
              onClick={() => handleAnswer(i)}
            >
              {ans}
            </button>
          );
        })}

        {validated && current < questions.length - 1 && (
          <button className="nextButton" onClick={nextQuestion}>
            NEXT →
          </button>
        )}

        {validated && current === questions.length - 1 && (
          <h3 className="finish">🏆 MISIÓN COMPLETADA</h3>
        )}
      </div>
    </div>
  );
}