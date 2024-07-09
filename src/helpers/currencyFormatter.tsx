const currencyFormatter = (amount: number | string = 0) => {
  if (typeof amount === "string") {
    amount = parseFloat(amount);
  }
  if (amount === null || amount === undefined) {
    return "";
  }
  if (amount % 1 === 0) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
};

export default currencyFormatter;
