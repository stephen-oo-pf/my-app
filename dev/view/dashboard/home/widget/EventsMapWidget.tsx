import * as React from 'react';
import Widget from './Widget';
import { GoogleMap } from '@react-google-maps/api';
import './EventsMapWidget.scss';
import User from '../../../../data/User';
import UIMapMarker from '../../../../ui/map/UIMapMarker';
import { listen, unlisten } from '../../../../dispatcher/Dispatcher';
import AppEvent from '../../../../event/AppEvent';
import { Organization } from '../../../../data/Organization';
import FormatUtil from '../../../../util/FormatUtil';

export interface EventsMapWidgetProps {
}

export interface EventsMapWidgetState {
}

export default class EventsMapWidget extends React.Component<EventsMapWidgetProps, EventsMapWidgetState> {
    static ID:string = "eventsMapWidget";

    
    _googleMap?:google.maps.Map;

    constructor(props: EventsMapWidgetProps) {
        super(props);

        this.state = {
        }
    }
    
    componentDidMount(){
        listen(AppEvent.ALERTS_UPDATE, this._onAlertsUpdate);
    }
    componentWillUnmount(){
        unlisten(AppEvent.ALERTS_UPDATE, this._onAlertsUpdate);
        window.clearTimeout(this.mapZoomAdjustTimeoutID);
    }
    _onAlertsUpdate=($event:AppEvent)=>{
        this.forceUpdate();
    }

    mapZoomAdjustTimeoutID:number = -1;

    _onMapLoaded=($map:google.maps.Map)=>{
        
        this._googleMap = $map;
        if(this._googleMap){
            this._googleMap.setTilt(0);

            let bounds = new google.maps.LatLngBounds();

            if(User.state.userOrgsFlat.length===1){

            }else{

            }
            User.state.userOrgsFlat.forEach(($org)=>{
                if($org.mapPosition){
                    bounds.extend($org.mapPosition);
                }
            });
            this._googleMap.fitBounds(bounds,100);
            this.mapZoomAdjustTimeoutID = window.setTimeout(()=>{
                if(this._googleMap){
                    let zoom = this._googleMap.getZoom();
                    let position = this._googleMap.getCenter();
                    if(zoom>14){
                        this._googleMap.setZoom(14);
                    }
                    if(position.lat()===0 && position.lng()===0){
                        this._googleMap.setZoom(2);
                    }
                }
            },1000);
        }

    }
    render() {



        let reportedCount = User.state.alerts_PENDING_INCIDENT_REPORT.reduce(($prev:number, $current)=>{
            return $prev+$current.numItems;
        },0);


        return (
            <Widget id={EventsMapWidget.ID}>
                <div className="eventsMapHeader">
                    <EventsMapWidgetHeaderItem count={""+User.state.alerts_ACTIVE_INCIDENT.length} desc={"Active Events"}/>
                    {User.state.userOrgsHasIncidentControl && (
                        <EventsMapWidgetHeaderItem count={""+reportedCount} desc={"Reported Events"}/>
                    )}
                    <EventsMapWidgetHeaderItem count={""+User.state.alerts_ASSIGNED_CHECKLIST.length} desc={"Checklists to complete"}/>
                </div>
                <div className="eventsMapContent">
                    
                    <GoogleMap
                        onLoad={this._onMapLoaded}
                        mapContainerClassName="eventsMapContentContainer"
                        clickableIcons={false}    
                    >  
                        {User.state.userOrgsSortedForMap.map(($org:Organization,$index:number)=>{
                            

                            if(!$org.mapPosition){
                                return null;
                            }
                            return (
                                <UIMapMarker
                                    zIndex={$index*2}
                                    key={$org.orgId}
                                    draggable={false}                                    
                                    id={$org.orgId}
                                    title={$org.orgName}
                                    label={$org.mapLabel!}
                                    icon={$org.mapIcon!}
                                    position={$org.mapPosition!}
                                />
                            )
                        })}
                    </GoogleMap> 
                                  
                    {User.state.alertsLastUpdate && (
                        <div className="lastUpdate">Last Update: {FormatUtil.dateHMS(User.state.alertsLastUpdate,true)}</div>
                    )} 
                </div>
            </Widget>
        );
    }
}


interface IEventsMapWidgetHeaderItemProps {
    count:string;
    desc:string;
}

class EventsMapWidgetHeaderItem extends React.Component<IEventsMapWidgetHeaderItemProps> {
    render() {
        return (
            <div className="mapHeaderItem">
                <div className="count">{this.props.count}</div>
                <div className="desc">{this.props.desc}</div>
            </div>
        );
    }
}
