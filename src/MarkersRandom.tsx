import React, { useEffect, useState } from "react";

import { Marker, useMap } from "react-leaflet";
import L, { LatLngExpression, curve } from "leaflet";
import "@elfalem/leaflet-curve";

const MarkersRandom: React.FC<any> = () => {
  const [markerList] = useState<LatLngExpression[]>([
    [37.99844161072895, -113.7147375086645],
    [22.59784633366193, 113.81528826706406]
  ]);
  const map = useMap();

  const latlng1: [number, number] = [37.99844161072895, -113.7147375086645];
  const latlng2: [number, number] = [22.59784633366193, 113.81528826706406];

  const offsetX = latlng2[1] - latlng1[1],
    offsetY = latlng2[0] - latlng1[0];

  const r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
    theta = Math.atan2(offsetY, offsetX);

  const thetaOffset = 3.14 / 10;

  const r2 = r / 2 / Math.cos(thetaOffset),
    theta2 = theta + thetaOffset;

  const midpointX = r2 * Math.cos(theta2) + latlng1[1],
    midpointY = r2 * Math.sin(theta2) + latlng1[0];

  const midpointLatLng: [number, number] = [midpointY, midpointX];

  useEffect(() => {
    const pathFive = curve(["M", latlng1, "Q", midpointLatLng, latlng2], {
      color: "blue",
      fill: false,
      animate: { duration: 3000, iterations: 1 }
    });
    pathFive.addTo(map);
    const timer = setTimeout(() => {
      pathFive.remove();
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {markerList.length !== 0 &&
        markerList?.map((position, index) => {
          const iconPerson = new L.Icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon.png",
            // iconRetinaUrl: '../../../../static/img/leaflet/marker-icon-2x.png',
            iconAnchor: [12.5, 41],
            popupAnchor: undefined,
            shadowUrl: "",
            shadowSize: undefined,
            shadowAnchor: undefined,
            iconSize: new L.Point(25, 41)
          });
          return (
            position && (
              <Marker key={index} position={position} icon={iconPerson} />
            )
          );
        })}
    </>
  );
};

export default MarkersRandom;
