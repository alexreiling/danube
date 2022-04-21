import { useState } from "react";
import styled from "styled-components";
import Quiz from "../components/Quiz";
import Intro from "../components/Quiz/intro";
import { COLORS } from "../theme";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  color: ${COLORS.font};
  background-color: ${COLORS.background};
  padding: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    max-width: 700px;
  }
`;

export default function QuizPage() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "outro">("intro");
  return (
    <Wrapper>
      {phase === "intro" ? (
        <Intro onCompleted={() => setPhase("quiz")} />
      ) : phase === "quiz" ? (
        <Quiz />
      ) : (
        <Quiz />
      )}
    </Wrapper>
  );
}
