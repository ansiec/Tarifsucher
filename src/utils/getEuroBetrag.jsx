const getEuroBetrag = (int) => {
  let string = int.toLocaleString("de-De");
  const centBetrag = Math.round((int * 100) % 100);
  const euroUndCent =
    centBetrag !== 0 && centBetrag % 10 === 0 ? string + "0" : string;
  return euroUndCent + " €";
};

export default getEuroBetrag;
