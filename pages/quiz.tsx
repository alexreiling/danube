import { useState } from "react";
import styled from "styled-components";
import Quiz from "../components/Quiz";
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
  const [phase, setPhase] = useState<"intro" | "quiz" | "outro">("intro");
  const [score, setScore] = useState(0);
  return (
    <Wrapper>
      {phase === "intro" ? (
        <Intro onCompleted={() => setPhase("quiz")} />
      ) : phase === "quiz" ? (
        <Quiz
          onComplete={(score) => {
            setPhase("outro");
            setScore(score);
          }}
        />
      ) : (
        <Outro score={score} />
      )}
    </Wrapper>
  );
}
