export const FlightData = [
  "Дата рейса",
  "Номер рейса",
  "Тип воздушного судна",
  "Бортовой номер воздушного судна",
  "Время налета (с момента взлета до посадки)",
  "Полетное время (время налета + руление и работа двигателя на земле)",
  "Ночное летное время (является частью налета)",
  "Биологическая ночь",
  "Рабочее время (полетное время + предполетная и послеполетная подготовка)",
];

export const FlightColors = {
  fact: {
    timeFlight: "rgba(26, 0, 109, 1)",
    timeBlock: "rgba(26, 0, 109, 0.8)",
    timeNight: "rgba(26, 0, 109, 0.6)",
    timeBiologicalNight: "rgba(26, 0, 109, 0.4)",
    timeWork: "rgba(26, 0, 109, 0.2)",
  },
  plan: {
    timeFlight: "rgba(107, 11, 0, 1)",
    timeBlock: "rgba(107, 11, 0, 0.8)",
    timeNight: "rgba(107, 11, 0, 0.6)",
    timeBiologicalNight: "rgba(107, 11, 0, 0.4)",
    timeWork: "rgba(107, 11, 0, 0.2)",
  },
};

export const sortFlightsByDate = (flights) => {
  flights.sort((a, b) => {
    return new Date(a.dateFlight).getTime() - new Date(b.dateFlight).getTime();
  });
};

export const groupSortedFlightsByYears = (flights) => {
  sortFlightsByDate(flights);
  const minYear = +flights[0].dateFlight.split("-")[0];
  const maxYear = +flights.slice(-1)[0].dateFlight.split("-")[0];

  const groupedFlights = [];

  for (let year = minYear; year <= maxYear; year++) {
    const group = flights.filter((flight) => {
      return +flight.dateFlight.split("-")[0] === year;
    });

    groupedFlights.push({
      year,
      flights: group,
    });
  }

  return groupedFlights;
};

export const groupSortedFlightsByData = (flights) => {
  const result = groupSortedFlightsByYears(flights).map((flight) => {
    const minMonth = +flight.flights[0].dateFlight.split("-")[1];
    const maxMonth = +flight.flights.slice(-1)[0].dateFlight.split("-")[1];

    const groupedFlights = [];

    for (let month = 1; month <= 12; month++) {
      const group = flight.flights.filter((flight) => {
        return +flight.dateFlight.split("-")[1] === month;
      });

      groupedFlights.push({
        month,
        flights: {
          fact: group.filter((item) => item.type === 0),
          plan: group.filter((item) => item.type === 1),
        },
      });
    }

    const a = {
      year: flight.year,
      months: [...groupedFlights],
    };

    //console.log(groupedFlights);

    return {
      year: flight.year,
      months: [...groupedFlights],
    };
  });

  return result;
};

export const summarizeData = (group, data) => {
  return group.reduce((prev, current) => {
    return prev + +current[data];
  }, 0);
};

export const getHoursFromSec = (sec) => {
  return +(sec / 3600).toFixed(1);
};
