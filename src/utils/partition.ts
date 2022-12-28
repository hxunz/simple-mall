export const getPartition = <T>(items: Array<T>, division = 5) => {
  const partitionResult = [];

  for (let i = 0; i < items.length; i += division) {
    partitionResult.push(items.slice(i, i + division));
  }

  return partitionResult;
};
