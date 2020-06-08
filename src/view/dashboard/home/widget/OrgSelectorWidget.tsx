import React from 'react';
import Widget from './Widget';
import UISwitchAccount from '../../../../ui/UISwitchAccount';
import './OrgSelectorWidget.scss';

export interface IStatWidgetProps{
}

export interface IStatWidgetState {
}

export default class OrgSelectorWidget extends React.Component<IStatWidgetProps, IStatWidgetState> {

    static ID:string = "orgSelectorWidget";

    constructor(props: IStatWidgetProps) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <Widget id={OrgSelectorWidget.ID}>
                <UISwitchAccount/>
            </Widget>
        );
    }
}



