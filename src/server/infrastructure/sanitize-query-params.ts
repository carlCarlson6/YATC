export const sanitizeQueryParams = (input: string | string[] | undefined) => {
  if (!input)
    return "";
  if (typeof input === "string")
    return input;
  return input[0] ?? "";
};
