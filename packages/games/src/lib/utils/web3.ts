// It needs to be a package but currently using this file

export const toFormatted = (amount: number | string, decimals = 4): string => {
  if (typeof amount === 'string') {
    amount = Number(amount);
  }

  amount = new Intl.NumberFormat('en', {
    maximumFractionDigits: decimals,
  }).format(amount);

  return amount;
};

export const toDecimals = (amount: number | string, decimals = 2): number => {
  if (typeof amount === 'string') {
    amount = Number(amount);
  }
  return Math.floor(amount * 10 ** decimals) / 10 ** decimals;
};

export function adjustForDecimals(
  _amount: bigint,
  decimalsDiv: number,
  decimalsMul: number
): bigint {
  const div = 10 ** decimalsMul / 10 ** decimalsDiv;

  return _amount / BigInt(div);
}
