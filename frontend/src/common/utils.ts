import isLowercase from "validator/lib/isLowercase";
import isUppercase from "validator/lib/isUppercase";
import isAlpha from "validator/lib/isAlpha";

export const isValidPassword = (password: string) =>
  !(
    password.length < 6 ||
    isLowercase(password) || //only lowercase
    isUppercase(password) || //only uppercase
    isAlpha(password)
  ); //only letters (a-zA-Z)

export const isDefined = (variable: any) =>
  typeof variable === "undefined" ? false : true;

//https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
export const groupBy = (items: any, key: string) =>
  items.reduce(
    (result: any, item: any) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );

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

declare global {
  interface Document {
    documentMode?: any;
  }
}
export const isIE = () => !!document.documentMode;

//formatter for parsing number only
export const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
});
