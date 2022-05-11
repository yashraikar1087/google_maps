import React,  {useEffect, useRef, useState} from 'react';
import "./Map.scss";

interface IMap {
    mapType: google.maps.MapTypeId ,
    mapTypeControl?: boolean
}

interface IMarker {
    address: string;
    latitude: number;
    longitude: number;
}

type GoogleLatLng= google.maps.LatLng;
type GoogleMap= google.maps.Map;
type GoogleMarker = google.maps.Marker;

const  Map: React.FC<IMap> = ({mapType, mapTypeControl=false}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();
    const [marker, setMarker] = useState<IMarker>();

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

    const initEventListener = (): void => {
        if(map) {
            google.maps.event.addListener(map, 'click', function(e){
                coordinateToAddress(e.latLng)
            });
        }

    }
    useEffect(initEventListener, [map]);

    const coordinateToAddress = async (coordinate:GoogleLatLng) => {
        const geocoder = new google.maps.Geocoder();
        console.log(coordinate)
        await geocoder.geocode({location: coordinate}, function(results, status) {
            if(status === 'OK') {
                console.log(results)
                setMarker({
                    address: results[0].formatted_address,
                    longitude: coordinate.lat(),
                    latitude: coordinate.lng()
                })
            }
        })
    };

    const addSingleMarker = ():void => {
        console.log("in add single marker")
        console.log(marker)
        if(marker) {
            addMarker(new google.maps.LatLng(marker.latitude, marker.longitude));
        }

    };

    useEffect(addSingleMarker, [marker]);

    const addMarker = (location:GoogleLatLng):void => {
        const marker: GoogleMarker =new google.maps.Marker({
            position: location,
            map: map,
            icon: getIconAttributes('#000000')
        });
    };

    const getIconAttributes = (iconColor: string) => {
        return  {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 10
        }
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