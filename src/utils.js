// Extracts the values from rgba function: rgba(255, 255, 255) returns 255, 255, 255
export const getRGBvalue = (rgbFunction) => {
  return rgbFunction.split("rgb(")[1].split(")")[0];
};
