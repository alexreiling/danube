import { HTMLAttributes } from "react";
import styled from "styled-components";
import { COLORS } from "../../theme";
import { POINTS_PER_QUESTION } from "./data";

interface Props extends HTMLAttributes<HTMLDivElement> {
  onCompleted: () => any;
}

const Intro: React.FC<Props> = (props) => {
  const { onCompleted, ...rest } = props;
  return (
    <Wrapper {...rest}>
      <h1>Quiz</h1>
      <div>
        Mit diesem Quiz kannst du dein Wissen über Plastikverschmutzung in
        unseren Gewässern testen. <br /> Es gelten die folgenden Regeln:
      </div>
      <ul>
        <li>
          {"Für jede Frage kannst du maximal "}
          <b>{POINTS_PER_QUESTION} Punkte</b>
          {" erhalten."}
        </li>
        <li>Mehrere richtige Antworten sind möglich (Multiple-Choice)</li>
        <li>Für jede fehlende richtige Antwort gibt es einen Punkt Abzug</li>
        <li>Für jede falsche Antwort gibt es ebenfalls einen Punkt Abzug</li>
      </ul>
      <h2>Viel Erfolg! :)</h2>
      <StartButton onClick={onCompleted}>{"Los geht's!"}</StartButton>
    </Wrapper>
  );
};

export default Intro;

const Wrapper = styled.div`
  width: 100%;
`;

const StartButton = styled.div`
  padding: 8px 16px;
  border-radius: 20px;
  border: 2px solid ${COLORS.font};
  transition: all 0.3s ease-out;
  float: right;
  margin-top: 12px;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${COLORS.font};
    color: ${COLORS.background};
  }
`;
