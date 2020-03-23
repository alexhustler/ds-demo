import md5 from "md5";

export const safeDivision = (a: number, b: number) => {
  if (!b || b === 0) {
    return 0;
  }
  return a / b;
};

export const isDefined = (variable: any) =>
  typeof variable === "undefined" ? false : true;

export const selectRandomItemFromArray = (items: any[]) => {
  return items[Math.floor(Math.random() * items.length)];
};

export const createRandomString = (
  length: number = 10,
  characters = "abcdefghjkmnpqrstuvwxyz23456789"
): string => {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
