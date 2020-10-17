import axios from 'axios'

const API_KEY:string = 'AIzaSyBQ5oyuVA-gUd-mNoocU1xrZ1jO0rbe0Iw'

interface GeoLocation {
    pos: {
        lat:number,
        lng:number
    }
}

 const _getGeoByAddress = async (address:string) => {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
    const lat = res.data.results[0].geometry.location.lat
    const lng = res.data.results[0].geometry.location.lng
    const geoLocation = {pos: {lat, lng}}
    return geoLocation
}

export const getDistances = async (address1:string, address2:string) => {
    const address1_geo:GeoLocation = await _getGeoByAddress(address1) ;
    const address2_geo:GeoLocation = await _getGeoByAddress(address2) ;
    const distance:number | undefined = calcDistance(address1_geo, address2_geo)
    return distance
}

const calcDistance = (geo1: GeoLocation, geo2: GeoLocation) => {
    if(!geo1.pos || !geo2.pos ) return 
  
      var R = 6371.0710; // Radius of the Earth in KM
      var rlat1 = geo1.pos.lat * (Math.PI/180); // Convert degrees to radians
      var rlat2 = geo2.pos.lat * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (geo2.pos.lng - geo1.pos.lng) * (Math.PI/180); // Radian difference (longitudes)
  
      var d:number = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return d ;
    }