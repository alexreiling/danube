import { useState } from "react";
import styled from "styled-components";
import Quiz from "../components/Quiz";
import Free from "../components/Quiz/Free";
import Intro from "../components/Quiz/intro";
import Outro from "../components/Quiz/outro";
import { COLORS } from "../theme";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  color: ${COLORS.font};
  background-color: ${COLORS.background};
  padding: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    max-width: 700px;
  }
`;

export default function QuizPage() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "free" | "outro">(
    "intro"
  );
  const [score, setScore] = useState(0);
  return (
    <Wrapper>
      {phase === "intro" ? (
        <Intro onCompleted={() => setPhase("quiz")} />
      ) : phase === "quiz" ? (
        <Quiz
          onComplete={(points) => {
            setPhase("free");
            setScore(score + points);
          }}
        />
      ) : phase === "free" ? (
        <Free
          score={score}
          onComplete={(points) => {
            setScore(score + points);
            setPhase("outro");
          }}
        ></Free>
      ) : (
        <Outro score={score} />
      )}
    </Wrapper>
  );
}
