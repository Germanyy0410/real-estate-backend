export const getBoundingBox = (lon, lat) => {
  const R = 6371; // Earth's radius in km
  const radiusKm = 20;

  const latRadian = lat * (Math.PI / 180);
  const lonRadian = lon * (Math.PI / 180);

  const deltaLat = radiusKm / R;
  const deltaLon = radiusKm / (R * Math.cos(latRadian));

  const minLat = lat - deltaLat * (180 / Math.PI);
  const maxLat = lat + deltaLat * (180 / Math.PI);
  const minLon = lon - deltaLon * (180 / Math.PI);
  const maxLon = lon + deltaLon * (180 / Math.PI);

  return {
    minLat,
    maxLat,
    minLon,
    maxLon,
  };
};
