// button.tsx

import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};

export default Button;
