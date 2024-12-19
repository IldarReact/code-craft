import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="p-4 md:p-6 w-full max-w-4xl mx-auto">
    {children}
  </div>
);

export default Container;