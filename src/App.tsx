// File: src/App.tsx
// Date: 05/27/2020
// Note: cra-with-typescript.jsx
//..............................................................................
import * as React from 'react';
import './App.sass';
import logo from './logo.svg';

import D3Chart from './D3Chart';


interface IProps {

}

interface IState {

}
class App extends React.Component<IProps, IState> {
  constructor(props: IState) {
    super(props);
    this.state = { };
  }

  public render() {
    return (
		<div className="App container">      
       		<D3Chart />
		</div>
    );
  }
}

export default App;

// eof
