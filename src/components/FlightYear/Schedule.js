import { FlightColors } from "../../util/flights";

function Schedule(props) {
  const { monthsSum, maxTime, type } = props;

  return (
    <>
      {monthsSum
        ? monthsSum.map((times, idx) => {
            if (idx === monthsSum.length - 1) {
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
                        Math.ceil((monthsSum[idx + 1][time] * 530) / maxTime)
                      }
                      stroke={FlightColors[type][time]}
                      strokeWidth="1"
                    />
                  );
                })}
              </g>
            );
          })
        : null}
    </>
  );
}

export default Schedule;
