import React, { FC, ReactNode, useContext, useMemo, useState } from 'react';

type TestContextProps = {
  sampleData: string;
  setSampleData: (value: string) => void;
};

const TestContext = React.createContext<TestContextProps>({
  sampleData: '',
  setSampleData: (value) => {},
});

TestContext.displayName = 'TestContext';

export const useTestContext = () => useContext(TestContext);

type TestProviderProps = {
  children: ReactNode;
};

export const TestProvider: FC<TestProviderProps> = ({ children }) => {
  /* region Context Logic */
  const [sampleData, setSampleData] = useState('Hello World!');

  const contextValue = useMemo(
    () => ({
      sampleData,
      setSampleData,
    }),
    [sampleData, setSampleData]
  );
  /* endregion */

  return <TestContext.Provider value={contextValue}>{children}</TestContext.Provider>;
};
