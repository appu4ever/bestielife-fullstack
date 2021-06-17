export const formatData = (data: Record<string, number>) => {
  let result: number[] = [];
  Object.keys(data).forEach((datum) => {
    result[parseInt(datum.split('/')[0]) - 1] = data[datum];
  });
  return result;
};
