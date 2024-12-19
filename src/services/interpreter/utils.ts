export const pythonOperators = {
  and: '&&',
  or: '||',
  not: '!',
  True: 'true',
  False: 'false',
  None: 'null',
} as const;

export const convertPythonToJS = (expr: string): string => {
  return Object.entries(pythonOperators).reduce(
    (acc, [py, js]) => acc.replace(new RegExp(`\\b${py}\\b`, 'g'), js),
    expr
  );
};