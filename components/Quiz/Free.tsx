import clsx from "clsx";
import { HTMLAttributes, useState } from "react";
import styled from "styled-components";
import { Points } from "./Points";
import { ButtonStyles } from "../../styles/buttonStyles";
import { COLORS } from "../../theme";
import { Footer } from "./Footer";

export const RESULTS_KEY = "quiz_results";

interface Props extends HTMLAttributes<HTMLDivElement> {
  score: number;
  onComplete: (points: number) => any;
}

const Free: React.FC<Props> = (props) => {
  const { score, onComplete, ...rest } = props;
  const [answers, setAnswers] = useState<string[]>(Array(4).fill(""));
  const handleChange = (index: number, value: string) => {
    const update = answers.map((old, i) => (i === index ? value : old));
    setAnswers(update);
  };
  const handleSubmit = () => {
    if (!answers.some((answer) => !!answer)) {
      return alert(
        "Nenne mindestens eine Möglichkeit um Mikroplastik zu reduzieren, um das Quiz abzuschließen. Für jede Nennung erhältst du einen weiteren Punkt."
      );
    }
    try {
      const raw = localStorage.getItem(RESULTS_KEY) || "[]";
      const data = JSON.parse(raw) as string[];
      data.push(...answers.filter((a) => a));
      localStorage.setItem(RESULTS_KEY, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
    onComplete(answers.filter((a) => a).length);
  };

  return (
    <Wrapper {...rest}>
      <h2>Was hilft am besten gegen Mikroplastik?</h2>
      <p>
        Überlegt euch bis zu 5 Möglichkeiten die dabei helfen, dass nicht so
        viel Plastik in der Natur landet:
      </p>
      <Form>
        {answers.map((answer, index) => (
          <Input
            key={index}
            value={answer || ""}
            placeholder={`${index + 1}.`}
            onChange={(e) => handleChange(index, e.currentTarget.value)}
          />
        ))}
        <Footer>
          <div id="score">{`Gesamt: ${score}`}</div>
          <Points id="points">+{answers.filter((a) => a).length} </Points>
          <Submit
            onClick={handleSubmit}
            className={clsx({ hidden: answers.filter((a) => a).length < 1 })}
          >
            Quiz beenden
          </Submit>
        </Footer>
      </Form>
    </Wrapper>
  );
};

export default Free;

const Wrapper = styled.div``;
const Input = styled.input`
  display: block;
  background-color: ${COLORS.background};
  border: none;
  border-bottom: 2px solid ${COLORS.font};
  margin-bottom: 24px;
  width: 100%;
  height: 24px;
  color: ${COLORS.font};
  transition: all 0.3s ease-out;
  &:focus {
    border-color: white;
    color: white;
  }
  outline: none;
`;

const Submit = styled.div`
  ${ButtonStyles};
  margin-top: 12px;
  float: right;
  opacity: 1;
  &.hidden {
    opacity: 0;
  }
`;
const Form = styled.form``;
