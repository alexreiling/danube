import { css } from "styled-components";
import { COLORS } from "../theme";

export const ButtonStyles = css`
  border: 2px solid ${COLORS.font};
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease-out;
`;
