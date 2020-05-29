// File: src/App.tsx
// Date: 05/29/2020
// Note: cra-with-typescript
//..............................................................................
import * as React from 'react';
import './App.sass';
import 'bulma';
//import logo from './logo.svg';

import { Icon, InlineIcon } from '@iconify/react';
import accountBox from '@iconify/icons-mdi/account-box';

//___ components ___
import HeaderTSX from './components/MySite/HeaderTSX';
import MainTSX from './components/MySite/MainTSX';
import VideoReact from './components/MyVideo/VideoReact';   

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
			<div className="App"> 
				<div className="my-site">
					<HeaderTSX /> 
 	      	<MainTSX /> 
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
				<D3Chart />				
			</div>
    );
  }
}

export default App;

// eof
