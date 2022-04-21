import { HTMLAttributes, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Quiz, QUIZ_DATA } from "./data";

import clsx from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Quiz: React.FC<Props> = (props) => {
  const { ...rest } = props;
  const [validated, setValidated] = useState(false);
  const [quiz, setQuiz] = useState<Quiz>(QUIZ_DATA);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number[]>();
  const [missing, setMissing] = useState<number[]>();

  const { options, question, valid } = quiz.questions[step];

  const validate = () => {
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

    const addScore = 5 - wrongAnswers.length - missingAnswers.length;

    setScore(score + addScore);
    setValidated(true);
  };
  const nextStep = () => {
    if (step + 1 >= quiz.questions.length) return;
    setValidated(false);
    setWrong([]);
    setMissing([]);
    setSelected([]);
    setStep(step + 1);
  };
  return (
    <Wrapper {...rest} className={clsx({ validated })}>
      <div id="question">{question}</div>
      <div id="options">
        {options.map((option, index) => (
          <div
            onClick={() => {
              const merged = new Set(selected);
              if (merged.has(index)) merged.delete(index);
              else merged.add(index);
              setSelected(Array.from(merged.values()));
            }}
            className={clsx({
              option,
              selected: selected.includes(index),
              correct: valid.includes(index),

              missing: missing?.includes(index),
              wrong: wrong?.includes(index),
            })}
          >{`[${index + 1}]: ${option}`}</div>
        ))}
      </div>
      <div id="submit" onClick={validated ? nextStep : validate}>
        {validated ? "Nächste Runde" : "Auflösen"}
      </div>
      <div id="score">{score}</div>
    </Wrapper>
  );
};

export default Quiz;

const Wrapper = styled.div`
  .option {
    &.selected {
      background-color: blue;
    }
  }
  &.validated {
    .option {
      &.correct.selected {
        background-color: green;
      }
      &.selected.wrong {
        background-color: red;
      }
      &.missing {
        background-color: yellow;
      }
    }
  }
`;
