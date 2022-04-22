import { HTMLAttributes, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { POINTS_PER_QUESTION, QUIZ } from "./data";

import clsx from "clsx";
import { COLORS } from "../../theme";
import { ButtonStyles } from "../../styles/buttonStyles";
import { Footer } from "./Footer";
import { Points } from "./Points";

interface Props extends HTMLAttributes<HTMLDivElement> {
  onComplete: (score: number) => any;
}

const Quiz: React.FC<Props> = (props) => {
  const { onComplete, ...rest } = props;
  const [phase, setPhase] = useState<"prompting" | "validation">("prompting");
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState<number | undefined>(undefined);
  const [selected, setSelected] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number[]>([]);
  const [missing, setMissing] = useState<number[]>([]);

  const { options, question, valid } = QUIZ[step];

  const validate = () => {
    if (selected.length < 1) {
      alert("Du musst mindestens 1 Antwort auswählen um fortfahren zu können.");
      return;
    }
    const wrongAnswers: number[] = [];
    selected.forEach((index) => {
      if (!valid.includes(index)) wrongAnswers.push(index);
    });
    const missingAnswers: number[] = [];
    valid.forEach((index) => {
      if (!selected.includes(index)) missingAnswers.push(index);
    });
    setWrong(wrongAnswers);
    setMissing(missingAnswers);

    const points =
      POINTS_PER_QUESTION - wrongAnswers.length - missingAnswers.length;
    setPoints(points);
    setPhase("validation");
  };
  const finished = step + 1 >= QUIZ.length;
  const nextStep = () => {
    if (finished) return;
    setPhase("prompting");
    setWrong([]);
    setMissing([]);
    setSelected([]);
    setStep(step + 1);
    setScore(score + (points || 0));
    setPoints(undefined);
  };
  const toggleOption = (index: number) => {
    if (phase === "validation") return;
    const merged = new Set(selected);
    if (merged.has(index)) merged.delete(index);
    else merged.add(index);
    setSelected(Array.from(merged.values()));
  };
  return (
    <Wrapper {...rest}>
      <h2 id="question">{`${question} (${step + 1}/${QUIZ.length})`}</h2>
      <OptionsGrid>
        {options.map((option, index) => (
          <Option
            key={index}
            onClick={() => toggleOption(index)}
            className={clsx({
              option,
              validated: phase === "validation",
              selected: selected.includes(index),
              correct: valid.includes(index),
              missing: missing.includes(index),
              wrong: wrong.includes(index),
            })}
          >{`${option}`}</Option>
        ))}
      </OptionsGrid>

      <Footer>
        <div id="score">{`Gesamt: ${score}`}</div>
        {points && <Points id="points">+{points} </Points>}
        <Submit
          id="submit"
          className={clsx({ hidden: selected.length < 1 })}
          onClick={
            phase === "prompting"
              ? validate
              : finished
              ? () => onComplete(score + (points || 0))
              : nextStep
          }
        >
          {phase === "prompting" ? "Auflösen" : "Nächste Frage"}
        </Submit>
      </Footer>
    </Wrapper>
  );
};

export default Quiz;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr;

  @media (min-width: 550px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Option = styled.div`
  ${ButtonStyles}
  &.selected {
    background-color: ${COLORS.font};
    color: ${COLORS.background};
  }
  &.validated {
    cursor: default;
    &.selected.correct {
      background-color: green;
      border-color: green;
    }
    &.selected.wrong {
      background-color: red;
      border-color: red;
    }
    &.missing {
      background-color: lightgreen;
      border-color: red;
      color: ${COLORS.background};
    }
  }
`;

const Submit = styled.div`
  ${ButtonStyles}
  opacity:1;

  &.hidden {
    opacity: 0;
  }
`;
