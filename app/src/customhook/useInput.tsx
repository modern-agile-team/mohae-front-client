import { useState } from 'react';

export const useInput = (maxLength: number) => {
  const [value, setValue] = useState<string>('');

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    if (value.length <= maxLength) {
      setValue(value);
    }
  };

  return { value, onChange };
};

const response = 1;
