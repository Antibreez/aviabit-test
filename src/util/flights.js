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

export const groupSortedFlightsByMonth = (flights) => {
  return groupSortedFlightsByYears(flights).map((flight) => {
    const minMonth = +flight.flights[0].dateFlight.split("-")[1];
    const maxMonth = +flight.flights.slice(-1)[0].dateFlight.split("-")[1];

    const groupedFlights = [];

    for (let month = minMonth; month <= maxMonth; month++) {
      const group = flight.flights.filter((flight) => {
        return +flight.dateFlight.split("-")[1] === month;
      });

      groupedFlights.push({
        month,
        flights: group,
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

  // console.log(groupedFlights, "######################");
};

export const summarizeData = (group, data) => {
  return group.reduce((prev, current) => {
    return prev + +current[data];
  }, 0);
};
