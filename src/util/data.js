const b64DecodeUnicode = (str) => {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
};

const b64toJson = (str) => {
  return JSON.parse(b64DecodeUnicode(str));
};

export { b64toJson };
