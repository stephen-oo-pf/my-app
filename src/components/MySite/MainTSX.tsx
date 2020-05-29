// File: src/MainTSX.tsx
// Date: 05/28/2020
// Note: Code convention for the React-TypeScript class-component.tsx
//..............................................................................
import * as React from 'react';

interface IProps {
  countBy?: number;
}

interface IState {
  count: number;
}

class MainTSX extends React.Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    countBy: 1,
  };

  public state: IState = {
    count: 0,
  };

  public increase = () => {
    const countBy: number = this.props.countBy!;
    const count = this.state.count + countBy;
    this.setState({ count });
  };

  public render() {
    return (
      <div>
        <p>My favorite number is {this.state.count}</p>
        <button onClick={this.increase}>Increase</button>
      </div>
    );
  }
}

export default MainTSX;

// eof
