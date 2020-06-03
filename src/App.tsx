// File: src/App.tsx
// Date: 06/03/2020
// Note: safety-shield settings
//..............................................................................
import * as React from 'react';
import './App.sass';
import logo from './logo.svg';

import { Icon, InlineIcon } from '@iconify/react';
import accountBox from '@iconify/icons-mdi/account-box';

//___ components ___
import HeaderTSX from './components/MySite/HeaderTSX';
import MainTSX from './components/MySite/MainTSX';  
import EventCalendar from './components/MyJSX/EventCalendar';
import MyD3Component from './components/MyD3/MyD3Component'; 

//___ dialogs ___
import Modal from './dialogs/Modal';

//___ views ___
import HeaderJSX from './views/MyRouter/HeaderJSX';
import MainJSX from './views/MyRouter/MainJSX';	
import D3Chart from './views/EventResponse/D3Chart';


interface IProps {}

interface IState {

}
class App extends React.Component<IProps, IState> {
  public render() {
    return (
    	<div className="app"> 
    	{/*
			<div className="App"> 
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <EventCalendar />   
          
          <div>       
          	<hr />
         		<label htmlFor="appt">Choose a time for your meeting: </label>
						<input type="time" id="appt" name="appt" min="09:00" max="18:00" required /><br />
						<label htmlFor="appt">Choose a date for your meeting: </label>
						<input type="date" id="appt" name="appt" required /><br />
						<small>Office hours are 9 am to 6 pm - Monday to Friday</small>
         	</div>
        </header>		
			
				<div className="my-site">
					<HeaderTSX /> 
 	      	<MainTSX countBy={3}/> 
	      </div>
	      <hr />
				<div className="my-router">
					<MainJSX />	
					<HeaderJSX />
				</div>
	      <hr />
				<Icon icon={accountBox} className="icon is-large" />
				<hr />
				<React.Fragment>		
					<h1>Modal Example</h1>
	      	<Modal widthClose />
	      	<h3>With String</h3>
	      	<Modal modalContent={"This is a modal"} widthClose />
	      	<h3>With JSX</h3>
	      	<Modal modalContent={<b>This is JSX Content</b>} widthClose />
				</React.Fragment>
				<hr />
				<MyD3Component data={[1,2,3]} />
				<hr />
				<D3Chart />		
				*/}		
			</div>
    );
  }
}

export default App;

// eof
