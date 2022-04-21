import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import useInterval from "./useInterval";
import CountUp from "react-countup";
import { start } from "repl";
const prompt = (since: string, value: number) =>
  `Seit ${since} wurden schon ${value}kg Plastik in unsere Meere gespült`;

interface Props extends HTMLAttributes<HTMLDivElement> {}
interface State {
  startTime: number;
  currentTime: number;
  ratePerMinute: number;
  value: number;
}
const Counter: React.FC<Props> = (props) => {
  const { ...rest } = props;
  const afRef = useRef<number | undefined>();
  const [value, setValue] = useState(1000);
  const [startTime, setStartTime] = useState(new Date());
  const [ratePerMinute, setRatePerMinute] = useState(15000);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const update = useCallback(() => {
    const value = calculate(Date.now(), startTime.valueOf(), ratePerMinute);
    setValue(value);
    afRef.current = requestAnimationFrame(update);
  }, [startTime, ratePerMinute]);

  useEffect(() => {
    const newTime = new Date();
    newTime.setHours(8);
    newTime.setMinutes(0);
    setStartTime(newTime);
  }, []);
  useEffect(() => {
    afRef.current = requestAnimationFrame(update);
    return () => {
      if (afRef.current) cancelAnimationFrame(afRef.current);
    };
  }, [update]);
  return (
    <Wrapper {...rest}>
      <div id="value-wrapper">
        {value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}kg
      </div>
      <div id="subline">
        {`wurden bereits seit heute ${startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} Uhr in unsere Meere gespült.`}
      </div>
      <div id="options-wrapper">
        <div id="options-toggle" onClick={() => setOptionsOpen(!optionsOpen)}>
          Optionen
        </div>
        {optionsOpen && (
          <div id="options">
            <div>Startzeit:</div>
            <input
              type="time"
              value={startTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(":");
                const newTime = new Date();
                newTime.setHours(parseInt(hours));
                newTime.setMinutes(parseInt(minutes));
                setStartTime(newTime);
              }}
            />
            <div>Rate pro Minute:</div>
            <input
              type="number"
              value={ratePerMinute}
              onChange={(e) =>
                setRatePerMinute(parseInt(e.currentTarget.value))
              }
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Counter;
const step = () => {
  requestAnimationFrame(step);
};
const calculate = (
  currentTime: number,
  startTime: number,
  ratePerMinute: number
) => {
  const passedMs = currentTime - startTime;
  const passedMinutes = passedMs / (1000 * 60);
  return passedMinutes * ratePerMinute;
};
const Wrapper = styled.div`
  width: 100%;
  padding: 5vw;
  #value-wrapper {
    display: inline-block;
    font-size: 10vmin;
    font-family: monospace;
  }
  #subline {
    font-size: 3vmin;
  }
  #options-wrapper {
    color: white;
  }
  #options {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  #options-toggle {
    opacity: 0;
    margin: 12px 0;
    transition: opacity 0.3s ease-out;
    cursor: pointer;
    color: darkblue;
    text-transform: "uppercase";
    font-weight: bold;
    font-size: 0.75em;
  }
  :hover {
    #options-toggle {
      opacity: 1;
      color: white;
    }
  }
`;