import styled from "styled-components";
import Quiz from "../components/Quiz";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default function QuizPage() {
  return (
    <Wrapper>
      <Quiz />
    </Wrapper>
  );
}
