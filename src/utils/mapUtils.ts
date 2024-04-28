type Coordinate = {
    latitude: number;
    longitude: number;
  };
  
  export const isWithinRegion = (
    point: Coordinate,
    reference: Coordinate,
    latitudeDelta: number,
    longitudeDelta: number
  ): boolean => {
    // Checks if a point is within a rectangular region defined by another point
    // and its dimensions (latitude_delta, longitude_delta).
  
    // Args:
    //     point: The point (latitude, longitude) to check.
    //     reference: The reference point (latitude, longitude) for the region.
    //     latitudeDelta: Half of the latitude span of the region.
    //     longitudeDelta: Half of the longitude span of the region.
  
    // Returns:
    //     True if the point is within the region, False otherwise.
    
    const minLatitude = reference.latitude - latitudeDelta;
    const maxLatitude = reference.latitude + latitudeDelta;
    const minLongitude = reference.longitude - longitudeDelta;
    const maxLongitude = reference.longitude + longitudeDelta;
  
    return (minLatitude <= point.latitude && point.latitude <= maxLatitude) && (minLongitude <= point.longitude && point.longitude <= maxLongitude);
  }
  