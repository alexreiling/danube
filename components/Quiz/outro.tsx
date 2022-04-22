import Link from "next/link";
import { useRouter } from "next/router";
import { HTMLAttributes } from "react";
import styled, { keyframes } from "styled-components";
import { ButtonStyles } from "../../styles/buttonStyles";
import { POINTS_PER_QUESTION, QUIZ } from "./data";

interface Props extends HTMLAttributes<HTMLDivElement> {
  score: number;
}

const Outro: React.FC<Props> = (props) => {
  const { score, ...rest } = props;
  const router = useRouter();
  return (
    <Wrapper {...rest}>
      <h1>Herzlichen Glückwunsch!</h1>
      <div>
        {"Du hast "}
        <b>
          {score} von {POINTS_PER_QUESTION * QUIZ.length + 4}
        </b>
        {" Punkten beim Quiz erzielt."}
      </div>
      <div>
        Du kennst dich wirklich gut mit der Plastikverschmutzung in unseren
        Gewässern aus!
      </div>
      <div id="reset" onClick={() => router.reload()}>
        Quiz neustarten
      </div>
    </Wrapper>
  );
};

export default Outro;

const fadeIn = keyframes`
  from {
    opacity:0
  }
  to {
    opacity:1
  }
`;

const Wrapper = styled.div`
  opacity: 0;
  > * {
    margin-top: 24px;
  }
  animation: ${fadeIn} 1s 1s linear forwards;

  #reset {
    opacity: 0;
    ${ButtonStyles}
    animation: ${fadeIn} 1s 2s linear forwards;
    float: right;
  }
`;
