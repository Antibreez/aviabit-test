const divideInteger = (int) => {
  const res = int
    .toString()
    .split("")
    .reverse()
    .map((char, idx) => {
      return (idx + 1) % 3 === 0 ? char + "." : char;
    })
    .reverse()
    .join("");

  return res.split(".").slice(-1).length < 3 ? res + "0" : res;
};

export { divideInteger };
