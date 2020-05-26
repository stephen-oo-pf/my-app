// File: src/Header.tsx
// Date: 05/20/2020
// Note: functional-component.jsx
//..............................................................................
import * as React from 'react';

interface IProps {
  name?: string;
}

const Header: React.FC<IProps> = (props: IProps) => (
  <h1>Hello, {props.name}! Welcome to React and TypeScript + D3.</h1>
);

Header.defaultProps = {
  name: 'world',
};

export default Header;

// eof
