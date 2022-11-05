import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MONTHS } from "../../util/const";
import { FlightColors, summarizeData } from "../../util/flights";
import Schedule from "./Schedule";
import cl from "classnames";
import { getTime } from "../../util/date";

const isEmpty = (monthSum) => {
  return (
    Object.values(monthSum).reduce((prev, current) => prev + current, 0) === 0
  );
};

function Canvas(props) {
  const { containerRef, months, year } = props;

  const [factMonths, setFactMonths] = useState(null);
  const [planMonths, setPlanMonths] = useState(null);
  const [factMonthsSum, setFactMonthsSum] = useState(null);
  const [planMonthsSum, setPlanMonthsSum] = useState(null);

  const [maxTime, setMaxTime] = useState(null);

  const canvasRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    // const canvas = canvasRef.current;
    // const context = canvas.getContext("2d");

    // context.canvas.width = containerRef.current.offsetWidth;
    // context.strokeStyle = "#000000";
    // context.lineWidth = 1;
    // context.strokeRect(0, 0, context.canvas.width, context.canvas.height);

    const factMonths = months.map((month) => {
      return month.flights.fact;
    });

    const planMonths = months.map((month) => {
      return month.flights.plan;
    });

    const sumFact = factMonths.map((months) => {
      return {
        timeFlight: summarizeData(months, "timeFlight"),
        timeNight: summarizeData(months, "timeNight"),
        timeBlock: summarizeData(months, "timeBlock"),
        timeBiologicalNight: summarizeData(months, "timeBiologicalNight"),
        timeWork: summarizeData(months, "timeWork"),
      };
    });

    const sumPlan = planMonths.map((months) => {
      return {
        timeFlight: summarizeData(months, "timeFlight"),
        timeNight: summarizeData(months, "timeNight"),
        timeBlock: summarizeData(months, "timeBlock"),
        timeBiologicalNight: summarizeData(months, "timeBiologicalNight"),
        timeWork: summarizeData(months, "timeWork"),
      };
    });

    console.log(sumFact);
    console.log(10 ** 2);

    setFactMonthsSum(sumFact);
    setPlanMonthsSum(sumPlan);

    const max = Math.max(
      Math.max(...sumFact.map((item) => Math.max(...Object.values(item)))),
      Math.max(...sumPlan.map((item) => Math.max(...Object.values(item))))
    );

    const l = max.toString().length;
    const m = 10 ** (l - 2 > 0 ? l - 2 : 0);

    console.log(max);
    console.log(Math.ceil(max / m) * m);

    setMaxTime(Math.ceil(max / m) * m);
  }, []);

  const onMonthClick = (e) => {
    const month = e.currentTarget.id.split("-")[1];
    navigate(`/period/${year}-${month}`);
  };

  return (
    <div className="canvas">
      <h1>{year}</h1>
      <div className="canvas__presenter">
        <div className="canvas__outer">
          <div className="canvas__inner">
            <svg width="100%" height="100%" viewBox="0 0 1100 550">
              <rect
                width="1100"
                height="530"
                stroke="black"
                strokeWidth="2"
                fill="none"
              />

              {Array.from(Array(10), () => null).map((i, idx) => {
                const time = getTime((maxTime / 10) * (idx + 1));
                console.log(time);

                return (
                  <g key={idx}>
                    <text
                      x={5}
                      y={idx === 9 ? 15 : 533 - 53 * (idx + 1)}
                      className="canvas__hours-item"
                    >
                      {time.hours} {time.minutes}
                    </text>
                    <line
                      x1="60"
                      y1={53 * (idx + 1)}
                      x2="1100"
                      y2={53 * (idx + 1)}
                      stroke="lightgray"
                      strokeWidth="1"
                    />
                  </g>
                );
              })}

              {MONTHS.map((month, idx) => {
                return (
                  <g key={idx}>
                    <line
                      x1={idx * 100}
                      y1="520"
                      x2={idx * 100}
                      y2="530"
                      stroke="black"
                      strokeWidth="1"
                    />
                    <rect
                      id={`month-${idx + 1}`}
                      className={cl("canvas__month-line", {
                        empty:
                          factMonthsSum &&
                          planMonthsSum &&
                          isEmpty(factMonthsSum[idx]) &&
                          isEmpty(planMonthsSum[idx]),
                      })}
                      x={idx * 100 - 1}
                      y="0"
                      height="530"
                      width="1"
                      stroke="transparent"
                      strokeWidth="16"
                      fill="black"
                      onClick={onMonthClick}
                    />
                    <text
                      x={idx === 0 ? 0 : idx === 11 ? 1070 : idx * 100 - 16}
                      y="545"
                    >
                      {month.slice(0, 3)}
                    </text>
                  </g>
                );
              })}

              <Schedule
                monthsSum={factMonthsSum}
                maxTime={maxTime}
                type="fact"
              />
              <Schedule
                monthsSum={planMonthsSum}
                maxTime={maxTime}
                type="plan"
              />

              {/* {factMonthsSum &&
                factMonthsSum.map((times, idx) => {
                  if (idx === factMonthsSum.length - 1) {
                    return;
                  }
    
                  return (
                    <g key={idx}>
                      {Object.keys(times).map((time, id) => {
                        return (
                          <line
                            key={id}
                            x1={idx * 100}
                            y1={530 - Math.ceil((times[time] * 530) / maxTime)}
                            x2={(idx + 1) * 100}
                            y2={
                              530 -
                              Math.ceil(
                                (factMonthsSum[idx + 1][time] * 530) / maxTime
                              )
                            }
                            stroke={FlightColors.fact[time]}
                            strokeWidth="1"
                          />
                        );
                      })}
                    </g>
                  );
                })} */}
            </svg>
          </div>
        </div>
      </div>

      <div className="canvas__definitions">
        <div className="canvas__definitions-part">
          <h2>Фактический налет</h2>
          <div className="canvas__definitions-item">
            <div>Время налета (с момента взлета до посадки)</div>
            <div>
              <span
                style={{ backgroundColor: FlightColors.fact.timeFlight }}
              ></span>
            </div>
          </div>
          <div className="canvas__definitions-item">
            <div>
              Полетное время (время налета + руление и работа двигателя на
              земле)
            </div>
            <div>
              <span
                style={{ backgroundColor: FlightColors.fact.timeBlock }}
              ></span>
            </div>
          </div>
          <div className="canvas__definitions-item">
            <div>Ночное летное время (является частью налета)</div>
            <div>
              <span
                style={{ backgroundColor: FlightColors.fact.timeNight }}
              ></span>
            </div>
          </div>
          <div className="canvas__definitions-item">
            <div>Биологическая ночь</div>
            <div>
              <span
                style={{
                  backgroundColor: FlightColors.fact.timeBiologicalNight,
                }}
              ></span>
            </div>
          </div>
          <div className="canvas__definitions-item">
            <div>
              Рабочее время (полетное время + предполетная и послеполетная
              подготовка)
            </div>
            <div>
              <span
                style={{ backgroundColor: FlightColors.fact.timeWork }}
              ></span>
            </div>
          </div>
        </div>
        <div className="canvas__definitions-part">
          <h2>Плановый налет</h2>
          <div className="canvas__definitions-item">
            <div>Время налета (с момента взлета до посадки)</div>
            <div>
              <span
                style={{ backgroundColor: FlightColors.plan.timeFlight }}
              ></span>
            </div>
          </div>
          <div className="canvas__definitions-item">
            <div>
              Полетное время (время налета + руление и работа двигателя на
              земле)
            </div>
            <div>
              <span
                style={{ backgroundColor: FlightColors.plan.timeBlock }}
              ></span>
            </div>
          </div>
          <div className="canvas__definitions-item">
            <div>Ночное летное время (является частью налета)</div>
            <div>
              <span
                style={{ backgroundColor: FlightColors.plan.timeNight }}
              ></span>
            </div>
          </div>
          <div className="canvas__definitions-item">
            <div>Биологическая ночь</div>
            <div>
              <span
                style={{
                  backgroundColor: FlightColors.plan.timeBiologicalNight,
                }}
              ></span>
            </div>
          </div>
          <div className="canvas__definitions-item">
            <div>
              Рабочее время (полетное время + предполетная и послеполетная
              подготовка)
            </div>
            <div>
              <span
                style={{ backgroundColor: FlightColors.plan.timeWork }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
