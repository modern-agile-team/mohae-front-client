export const getByteSize = (size: number): string => {
  const sizeType = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
  const calculate = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, calculate)).toFixed(2) + ' ' + sizeType[calculate]
  );
};

const response = 1;
