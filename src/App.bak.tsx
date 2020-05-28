// File: src/App.bak.tsx
// Date: 05/28/2020
// Note: cra-with-typescript.jsx
//..............................................................................
import * as React from 'react';
import './App.sass';
import logo from './logo.svg';

//___ components ___
import Description from './components/MySite/Description';
//import Header from './components/MySite/Header';
import VideoReact from './components/MyVideo/VideoReact';   
import MyD3Component from './components/MyTypeScript/MyD3Component'; 
import EventCalendar from './components/MyD3/EventCalendar';
import MyComponent from './components/MyTypeScript/MyComponent'; 

//___ dialogs ___
import Modal from './dialogs/Modal';

//___ views ___
import Main from './views/Dashboard/Main';	
import Header from './views/Dashboard/Header';
import D3Chart from './views/EventResponse/D3Chart';


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
      	<Header />
		<Main />
  		<button onClick={this.toggleModal}>
          Open the modal
        </button>

        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}>
            <VideoReact />
        </Modal>
      
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <EventCalendar />   
          <div>       
         	<label htmlFor="appt">Choose a time for your meeting:</label>
			<input type="time" id="appt" name="appt" min="09:00" max="18:00" required />
			<label htmlFor="appt">Choose a date for your meeting:</label>
			<input type="date" id="appt" name="appt" required />
			<small>Office hours are 9am to 6pm - Mon to Fri</small>
         </div>

        </header>
       <D3Chart />
        <Description countBy={3} />
        <MyD3Component data={[1,2,3]} />
		<MyComponent />

              

      </div>
    );
  }
}

export default App;

// eof

/*
./src/components/MyD3Component.tsx
Line 59:9:  React Hook useEffect has an unnecessary dependency: 
'd3Container.current'. 

Either exclude it or remove the dependency array. Mutable values like 
'd3Container.current' aren't valid dependencies because mutating them
doesn't re-render the component  react-hooks/exhaustive-deps

Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.
*/