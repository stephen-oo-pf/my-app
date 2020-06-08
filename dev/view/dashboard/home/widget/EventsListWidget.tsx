import * as React from 'react';
import Widget from './Widget';
import './EventsListWidget.scss';
import UITabBar, { UITabBarItem } from '../../../../ui/UITabBar';


import mapMarkerAlert from '@iconify/icons-mdi/map-marker-alert';
import { listen, unlisten } from '../../../../dispatcher/Dispatcher';
import AppEvent from '../../../../event/AppEvent';
import User from '../../../../data/User';
import UIAlertList from '../../../../ui/UIAlertList';
import { ALERT_TYPE_ACTIVE_INCIDENT } from '../../../../data/AlertData';
import FormatUtil from '../../../../util/FormatUtil';
import Api, { IErrorType } from '../../../../api/Api';
import UILoadingBox from '../../../../ui/UILoadingBox';
import UIErrorBox from '../../../../ui/UIErrorBox';
import {IIncidentReportData} from '../../../../data/IncidentData';

export interface EventsListWidgetProps {
}


export interface IPerOrgIncidentType{
    orgId:string;
    orgName:string;
    incidentTypeId:string;
    reports:IIncidentReportData[];
    datetime:number;
    description?:string;//not used...this is to help be compatible with other interfaces during union
    incidentId?:string;//not used...this is to help be compatible with other interfaces during union
}

export const ALERT_ALT_TYPE_PER_ORG_INCIDENT_TYPE:string = "perOrgIncidentType";


export interface EventsListWidgetState {
    selectedTab:string;
    
    showLoadingReports:boolean;
    errorLoadingReports?:IErrorType;
    dataReports?:IIncidentReportData[];
    dataReportsPerOrgIncidentType?:IPerOrgIncidentType[];
    dataReportsLastUpdate?:Date;
}

export default class EventsListWidget extends React.Component<EventsListWidgetProps, EventsListWidgetState> {
    static ID:string = "eventsListWidget";

    static TAB_ACTIVE:string = "tabActive";
    static TAB_REPORTED:string = "tabReported";


    _unmounting:boolean=false;

    _loading:boolean=false;

    _tabs:UITabBarItem[] = [];
    constructor(props: EventsListWidgetProps) {
        super(props);


        this._tabs.push({id:EventsListWidget.TAB_ACTIVE, label:""});
        this._tabs.push({id:EventsListWidget.TAB_REPORTED, icon:mapMarkerAlert, label:""});


        //we only show the loading when its mounting
        this.state = {
            selectedTab:EventsListWidget.TAB_ACTIVE,
            showLoadingReports:true
        }
    }
    componentDidMount(){
        
        listen(AppEvent.CHECKING_ALERTS_TICK, this._onCheckingAlerts);
        listen(AppEvent.ALERTS_UPDATE, this._onAlertsUpdate);

        this._loadIncidentReports();
    }

    componentWillUnmount(){
        this._unmounting=true;
        unlisten(AppEvent.ALERTS_UPDATE, this._onAlertsUpdate);
        unlisten(AppEvent.CHECKING_ALERTS_TICK, this._onCheckingAlerts);
    }

    _loadIncidentReports=()=>{
        

        if(!this._loading){
            this._loading=true;

            this.setState({errorLoadingReports:undefined},()=>{
                Api.incidentManager.getPendingIncidentReports(($success,$results)=>{
                    if(!this._unmounting){
                        this._loading=false;
                        if($success){
        
                            let incidentReports = $results as IIncidentReportData[];
        
                            /*
                            Sort data into an array of a new type specific to this widget (for now) "IPerOrgIncidentType"
                            Each item has a unique incidentType AND orgId... it contains a reports array of all incident Reports that match that incidentType AND orgId
                            */
                            let dataPerOrgIncidentTypes:IPerOrgIncidentType[] = incidentReports.reduce(($prev:IPerOrgIncidentType[],$current)=>{
                                let match = $prev.find(($reportPerOIT)=>{
                                    let isMatch:boolean=false;
                                    if($reportPerOIT.orgId===$current.orgId && $reportPerOIT.incidentTypeId===$current.incidentTypeId){
                                        isMatch=true;
                                    }
                                    return isMatch;
                                });
                                if(match){
                                    //exists
                                    match.reports.push($current);                            
                                }else{
                                    //new
                                    $prev.push({
                                        orgName:$current.orgName,
                                        orgId:$current.orgId,
                                        datetime:0,
                                        reports:[$current],
                                        incidentTypeId:$current.incidentTypeId
                                    });
                                }
                                return $prev
                            },[]);
        
                            //now sort the items individual reports
                            dataPerOrgIncidentTypes.forEach(($data)=>{
                                $data.reports.sort(($reportA,$reportB)=>{
                                    let a:number=0;
                                    if($reportA.createDts){
                                        a = $reportA.createDts;
                                        if($reportA.updateDts){
                                            a = $reportA.updateDts;
                                        }
                                    }
                                    let b:number=0;
                                    if($reportB.createDts){
                                        b = $reportB.createDts;
                                        if($reportB.updateDts){
                                            b = $reportB.updateDts;
                                        }
                                    }
        
                                    if(a===b){
                                        return 0;
                                    }else if(a>b){
                                        return 1;
                                    }else{
                                        return -1;
                                    }
                                });
        
                                let latestReport = $data.reports[0];
                                let latestReportTime = 0;
                                if(latestReport.createDts){
                                    latestReportTime = latestReport.createDts;
                                    if(latestReport.updateDts){
                                        latestReportTime = latestReport.updateDts;
                                    }
                                }
                                $data.datetime = latestReportTime;
                            });
        
                            //now sort items baed on elapsedTime
                            dataPerOrgIncidentTypes.sort(($perA,$perB)=>{
                                if($perA.datetime===$perB.datetime){
                                    return 0
                                }else if($perA.datetime>$perB.datetime){
                                    return 1
                                }else{
                                    return -1;
                                }
                            });
        
                            this.setState({showLoadingReports:false, dataReports:incidentReports, dataReportsPerOrgIncidentType:dataPerOrgIncidentTypes, dataReportsLastUpdate:new Date()});
                        }else{
                            this.setState({showLoadingReports:false, errorLoadingReports:$results});
                        }
                    }
                });
            });
        }

    }
    _onAlertsUpdate=($event:AppEvent)=>{
        this.forceUpdate();
    }
    _onCheckingAlerts=($event:AppEvent)=>{
        if(this.state.selectedTab===EventsListWidget.TAB_REPORTED){
            this._loadIncidentReports();
        }
    }

    _onTabClick=($value:string)=>{
        this.setState({selectedTab:$value});
        if($value===EventsListWidget.TAB_REPORTED){
            this._loadIncidentReports();
        }
    }
    render() {
        let reportedCount = User.state.alerts_PENDING_INCIDENT_REPORT.reduce(($prev:number, $current)=>{
            return $prev+$current.numItems;
        },0);

        this._tabs[0].label = "Active ("+User.state.alerts_ACTIVE_INCIDENT.length+")";
        this._tabs[1].label = "Reported ("+reportedCount+")";

        let date;

        let jsxContent:JSX.Element = <></>;
        switch(this.state.selectedTab){
            case EventsListWidget.TAB_ACTIVE:
                jsxContent = (
                    <UIAlertList key="activeList" smaller type={ALERT_TYPE_ACTIVE_INCIDENT} data={User.state.alerts_ACTIVE_INCIDENT} />
                );
                date = User.state.alertsLastUpdate;
            break;
            case EventsListWidget.TAB_REPORTED:
                jsxContent = (
                    <>
                        {this.state.showLoadingReports && (
                            <UILoadingBox fullHeight/>
                        )}
                        {this.state.errorLoadingReports && !this.state.showLoadingReports &&(
                            <UIErrorBox error={this.state.errorLoadingReports.desc}/>
                        )}
                        {this.state.dataReportsPerOrgIncidentType && !this.state.showLoadingReports && !this.state.errorLoadingReports &&   (
                            <UIAlertList key="reportedList" smaller type={ALERT_ALT_TYPE_PER_ORG_INCIDENT_TYPE} data={this.state.dataReportsPerOrgIncidentType} />
                        )}
                    </>
                );
                date = this.state.dataReportsLastUpdate;
            break;
        }
        

        return (
            <Widget id={EventsListWidget.ID}>
                <UITabBar
                    selectedID={this.state.selectedTab}
                    horizontal
                    data={this._tabs}
                    onChange={this._onTabClick}
                />
                <div className="eventsListContent">
                    {jsxContent}
                </div>                
                {date && (
                    <div className="lastUpdate">Last Update: {FormatUtil.dateHMS(date,true)}</div>
                )}
            </Widget>
        );
    }
}
