import styled, { keyframes } from "styled-components";

export const pulsate = keyframes`  
  0% {transform: scale(1);}
  50% {
    transform: scale(1.2);
  }
`;
export const Points = styled.div`
  font-size: 2em;
  animation: ${pulsate} 1s ease-out infinite;
`;
