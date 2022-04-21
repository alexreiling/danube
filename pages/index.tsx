import type { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import Counter from "../components/Counter";

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Counter id="counter" />
      {/* <Link href={"/quiz"}>Zum Quiz</Link> */}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #02d1ff;
  background-color: #0f192d;
`;
