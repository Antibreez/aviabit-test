import fs from "fs";

const Dates = {
  MIN: "2020-03-10",
  MAX: "2022-08-06",
};

const Airports = [
  {
    name: "Сыктывкар",
    lat: 61.668797,
    long: 50.836497,
  },
  {
    name: "Нарьян-Мар",
    lat: 67.634059,
    long: 53.086047,
  },
  {
    name: "Улан-Удэ(Байкал)",
    lat: 51.816899,
    long: 107.444211,
  },
  {
    name: "Улан-Удэ(Байкал)",
    lat: 56.833139,
    long: 53.451249,
  },
  {
    name: "Нижневартовск",
    lat: 60.958974,
    long: 76.494213,
  },
  {
    name: "Салехард",
    lat: 66.595541,
    long: 66.585813,
  },
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const rand = lower + Math.random() * (upper + 1 - lower);
  return Math.floor(rand);
};

const getRandomArrayItem = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const getRandomDate = (start, end) => {
  const st = new Date(start).getTime();
  const et = end ? new Date(end).getTime() : new Date().getTime();
  return new Date(st + Math.random() * (et - st));
};

const getRandomFlight = () => {
  const timeFlight = getRandomInteger(10000, 40000);
  const timeBlock = Math.round(
    timeFlight * (getRandomInteger(1030, 1040) / 1000)
  );
  const timeNight = Math.round(timeFlight * (getRandomInteger(40, 60) / 100));
  const timeBiologicalNight = Math.round(
    timeFlight * (getRandomInteger(1060, 1100) / 1000)
  );
  const timeWork = Math.round(
    timeFlight * (getRandomInteger(1300, 1600) / 1000)
  );

  return {
    dateFlight: getRandomDate(Dates.MIN, Dates.MAX),
    flight: `${getRandomArrayItem(["AB", "BC", "CD"])}-${getRandomInteger(
      1111,
      9999
    )}`,
    pinType: `${getRandomArrayItem(["A", "B", "C"])}-${getRandomInteger(
      111,
      999
    )}-${getRandomInteger(111, 999)}`,
    pin: getRandomArrayItem([
      "XXXAK",
      "XXBCD",
      "XXAAB",
      "XAABC",
      "XAXBD",
      "AAXDB",
      "XAAAA",
      "XDDDD",
      "DDXAB",
    ]),
    timeFlight,
    timeBlock,
    timeNight,
    timeBiologicalNight,
    timeWork,
    type: getRandomInteger(0, 1),
    takeoff: getRandomArrayItem(Airports),
    landing: getRandomArrayItem(Airports),
  };
};

const flights = Array.from({ length: 100 }, getRandomFlight);

// fs.readFile("./flights.json", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   const flight = {
//     id: 1,
//     ...JSON.parse(data),
//   };

//   console.log(JSON.parse(data));
//   console.log(flight);
// });

fs.writeFile("new-json.json", JSON.stringify(flights, null, " "), (error) =>
  console.log(error)
);
