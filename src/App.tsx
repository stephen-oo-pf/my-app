// File: src/App.tsx
// Date: 05/21/2020
// Note: cra-with-typescript.jsx
//..............................................................................
import * as React from 'react';
import './App.sass';
import logo from './logo.svg';

import Description from './components/Description';
import Header from './components/Header';
import Modal from './components/dialogs/Modal'; // container
import VideoReact from './components/VideoReact';   // component

interface IProps {

}

interface IState {
  isOpen?: boolean;
}
class App extends React.Component<IProps, IState> {
  constructor(props: IState) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public render() {
    return (
      <div className="App">
		<button onClick={this.toggleModal}>
          Open the modal
        </button>

        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}>
            <VideoReact />
        </Modal>
      
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Header name="REACT" />
        </header>
        <Description countBy={3} />
      </div>
    );
  }
}

export default App;

// eof
