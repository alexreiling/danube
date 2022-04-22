import { useEffect, useState } from "react";
import styled from "styled-components";
import { RESULTS_KEY } from "../components/Quiz/Free";
import { COLORS } from "../theme";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  color: ${COLORS.font};
  background-color: ${COLORS.background};
  padding: 4vw;
  overflow: auto;
  > * {
    max-width: 700px;
  }
  > div {
    margin-bottom: 8px;
  }
`;

export default function ResultsPage() {
  const [data, setData] = useState<string[]>();
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RESULTS_KEY) || "[]";
      const results = JSON.parse(raw) as string[];
      setData(results.reverse());
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <Wrapper>
      <h1>Ergebnisse der freien Quizaufgabe</h1>
      {data?.map((word, index) => (
        <div key={index}>{word}</div>
      ))}
    </Wrapper>
  );
}
