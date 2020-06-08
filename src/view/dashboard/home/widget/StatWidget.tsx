import React from 'react';
import Widget from './Widget';

export interface IStatWidgetProps{
}

export interface IStatWidgetState {
}

export default class StatWidget extends React.Component<IStatWidgetProps, IStatWidgetState> {

    static ID:string = "statistics";

    constructor(props: IStatWidgetProps) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <Widget id={StatWidget.ID} monitorSize useScrollContainer>
                Stats Widget
            </Widget>
        );
    }
}


interface IStatWidgetItemProps {
}

class StatWidgetItem extends React.Component<IStatWidgetItemProps> {
    render() {
        let strCN:string = "statWidgetItem";

        return (
            <div className={strCN}>
            </div>
        );
    }
}


