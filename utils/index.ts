export const truncate = (text: string, num = 6): string => {
  if (!text) return "";
  const characters: number = text.length;
  if (characters >= 42) {
    return text.slice(0, num) + "..." + text.substring(characters - num);
  } else {
    return text;
  }
};

export const copyText = async (string: string) => {
  await navigator.clipboard.writeText(string);
};

export const formatAmount = (
  amount: string | number,
  decimal = 2,
  locale = true
): string => {
  if (typeof amount === "number") amount = String(amount);
  if (isNaN(Number(amount))) amount = "0";
  const fractions = amount.toString().split(".");
  const digits = fractions[1]?.length ?? 0;
  if (decimal <= 0) {
    delete fractions[1];
  } else if (digits >= decimal) {
    fractions[1] = fractions[1]?.substring(0, decimal);
  } else {
    fractions[1] = fractions[1] ?? "";
    if (locale) {
      fractions[1] = fractions[1].concat(
        Array(decimal - digits)
          .fill("0")
          .join("")
      );
    }
  }
  if (locale) {
    fractions[0] = Number(fractions[0]).toLocaleString();
  }

  return fractions.filter((x: string) => !!x).join(".");
};

export const navigateToCheckoutResult = (isSuccess: boolean) => {
  const router = useRouter();
  if (isSuccess) router.push("/checkout/result?rs=success");
  else router.push("/checkout/result?rs=failed");
};
