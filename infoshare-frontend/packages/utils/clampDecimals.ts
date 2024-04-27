export default function clampDecimals(value: string | number, decimalCount = 1) {
  if (Number.isNaN(value)) {
    return 0;
  }

  return parseFloat(parseFloat(value.toString()).toFixed(decimalCount));
}
