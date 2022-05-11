import React,  {useEffect, useRef, useState} from 'react';
import "./Map.scss";

interface IMap {
    mapType: google.maps.MapTypeId ,
    mapTypeControl?: boolean
}

type GoogleLatLng= google.maps.LatLng;
type GoogleMap= google.maps.Map;

const  Map: React.FC<IMap> = ({mapType, mapTypeControl=false}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();
    const startMap = (): void => {
        if(!map) {
            //TODO
            defaultMapStart();
        }
    }

    useEffect(startMap,[map]);
    const defaultMapStart = (): void => {
        const defaultAddress = new google.maps.LatLng(20.5937, 78.9629);
        //TODO: initmap
        initMap(5, defaultAddress);
    }

    const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
        if(ref.current) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: zoomLevel,
                    center: address,
                    mapTypeControl,
                    streetViewControl: false,
                    mapTypeId: mapType
                })
            );
        }
    };

    return <div className="map-container">
            <div ref={ref} className='map-container__map'></div>
        </div>
} 

export default Map;