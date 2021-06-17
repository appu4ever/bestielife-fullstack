export const formatExpenseData = (expense: string) => {
  // console.log(expense);
  return parseInt(JSON.parse(expense).sum);
};
