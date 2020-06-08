import React from 'react';
import UIView from '../../../ui/UIView';
import './HomeView.scss';


import UIGrid, { GridItem } from '../../../ui/UIGrid';
import { listen, unlisten } from '../../../dispatcher/Dispatcher';
import DashboardEvent from '../../../event/DashboardEvent';

import { RouteComponentProps } from 'react-router-dom';
import OrgStatsWidget from './widget/OrgStatsWidget';
import User from '../../../data/User';
import UserRights, { hasUserRight } from '../../../data/UserRights';
import TitleUtil from '../../../util/TitleUtil';
import ECWidget from './widget/ECWidget';

import homeIcon from '@iconify/icons-mdi/home';
import AppData from '../../../data/AppData';
import EventsMapWidget from './widget/EventsMapWidget';
import EventsListWidget from './widget/EventsListWidget';
import AppEvent from '../../../event/AppEvent';

import UIIncidentBanner from '../../../ui/UIIncidentBanner';
import NotifWidget from './widget/NotifWidget';
import OrgSelectorWidget from './widget/OrgSelectorWidget';
import DrillWidget from './widget/DrillWidget';

export interface IHomeViewProps extends RouteComponentProps {

}

export interface IHomeViewState {
    items:GridItem[];

}

export default class HomeView extends React.Component<IHomeViewProps, IHomeViewState> {

    static ID:string = "home";
    static PATH:string = "/dashboard";
    static ICON:object = homeIcon;

    private grid:React.RefObject<UIGrid> = React.createRef();


    //master org widgets
    _gridItemOrgStats:GridItem = {id:OrgStatsWidget.ID, component:OrgStatsWidget, title:"",   layout:{x:0, y:0, w:6, h:1, minW:2, minH:1}, isVisible:true};
    
    
    //regular account/org widgets    
    _gridItemEventsMap:GridItem =   {id:EventsMapWidget.ID, component:EventsMapWidget, title:"Event Map",      layout:{x:0, y:0, w:6, h:3, minW:4, minH:3}, isVisible:true}
    _gridItemEventsList:GridItem =  {id:EventsListWidget.ID, component:EventsListWidget, title:"Event List",   layout:{x:6, y:0, w:4, h:3, minW:3, minH:2}, isVisible:true}
    _gridItemEC:GridItem =          {id:ECWidget.ID, component:ECWidget, title:"Emergency Contacts",           layout:{x:5, y:3, w:6, h:1, minW:3, minH:1, maxH:1}, isVisible:true};
    _gridItemNotif:GridItem =       {id:NotifWidget.ID, component:NotifWidget, title:"Notifications",          layout:{x:5, y:4, w:6, h:3, minW:3, minH:2}, isVisible:true};
    _gridItemOrgSelector:GridItem = {id:OrgSelectorWidget.ID, component:OrgSelectorWidget, title:"Summary For",layout:{x:0, y:3, w:4, h:1, minW:3, minH:1, maxH:1}, isVisible:true};
    _gridItemDrills:GridItem =      {id:DrillWidget.ID, component:DrillWidget, title:"Drill Schedule",         layout:{x:0, y:4, w:4, h:3, minW:3, minH:3}, isVisible:true};


    private timeoutID:number = -1;


    constructor(props: IHomeViewProps) {
        super(props);

        let gridItems:GridItem[] = [];

        
        if(User.selectedOrg.isRootAdmin && User.selectedOrg.orgId===AppData.masterOrgID){

            this._gridItemOrgStats.title = User.selectedOrg.terminologyList.parent_org.singular+" Statistics";

            if(hasUserRight(UserRights.WIDGET_ORG_SUMMARY,User.selectedOrg.userRights!)){
                gridItems.push(this._gridItemOrgStats);
            }
        }
        
        gridItems.push(this._gridItemEventsMap);
        
        
        if(User.state.userOrgsHasIncidentControl && !User.state.userOrgsHasMasterOrg){
            gridItems.push(this._gridItemEventsList);
        }else{
            //lets expand the map if no incident control
            this._gridItemEventsMap.layout.w=10;
        }

        

        if(User.selectedOrg.orgId!==AppData.masterOrgID){

            if(User.state.userOrgsFlat.length>1){

                gridItems.push(this._gridItemOrgSelector);
            }

            gridItems.push(this._gridItemNotif);
            gridItems.push(this._gridItemEC);
        }

        if(User.selectedOrg.hasIncidentControl){
            gridItems.push(this._gridItemDrills);

        }

        /*
        {id:OrgStatsWidget.ID, component:OrgStatsWidget, title:"Statistics", 
        layout:{x:0, y:0, w:7, h:3, minW:2, minH:2}, isVisible:true},
        {id:NotifWidget.ID, component:NotifWidget, title:"Notifications", 
        layout:{x:7, y:0, w:3, h:3, minW:2, minH:2}, isVisible:true},
        {id:"erp"+StatWidget.ID, component:StatWidget, title:"Latest ERPs", 
        layout:{x:0, y:3, w:7, h:2, minW:2, minH:1}, isVisible:true},
        {id:StatWidget.ID, component:StatWidget, title:"Statistics", 
        layout:{x:7, y:3, w:3, h:2, minW:2, minH:2}, isVisible:true},  
        */  

        this.state = {
            items:gridItems
        }
    }
    _onSettingsChanged=($items:GridItem[])=>{
        this.setState({items:$items});
    }
    componentDidMount(){        
        TitleUtil.setPageTitle("Dashboard");

        listen(AppEvent.ALERTS_UPDATE, this._onAlertsUpdate);
        listen(DashboardEvent.DASHBOARD_EXPAND_TOGGLED_COMPLETE, this._onDashboardExpandToggledComplete);

    }
    componentWillUnmount(){

        unlisten(AppEvent.ALERTS_UPDATE, this._onAlertsUpdate);
        unlisten(DashboardEvent.DASHBOARD_EXPAND_TOGGLED_COMPLETE, this._onDashboardExpandToggledComplete);
    }
    _onDashboardExpandToggledComplete=($event:DashboardEvent)=>{
        this._refreshGrid();
    }
    _refreshGrid=()=>{
        if(this.grid.current){
            this.grid.current.refresh();
        }
    }
    
    _onAlertsUpdate=()=>{
        this.forceUpdate();
    }

    render() {

        let jsxGrid:JSX.Element = (
            <UIGrid
                ref={this.grid}
                rowHeight={110}
                cols={10}         
                data={this.state.items}
            />
        );



            /*
            
                <HomeHeader
                    gridItems={this.state.items}
                    onGridItemsSettingsChanged={this._onSettingsChanged}
                />
                */
        return (
            <UIView id={HomeView.ID} usePadding useScrollContainer>
                <UIIncidentBanner/>
                {jsxGrid}    
            </UIView>
        );
    }
}
