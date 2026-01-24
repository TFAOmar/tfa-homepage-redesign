export interface Location {
  id: number;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  hours: string;
  coordinates: [number, number]; // [longitude, latitude]
  region: string;
}

export const locations: Location[] = [
  // Southern California - Inland Empire
  { id: 1, name: "Claremont", city: "Claremont", state: "CA", address: "915 W Foothill Blvd STE I, Claremont, CA 91711", phone: "(323) 919-5660", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.7198, 34.0967], region: "Southern California" },
  { id: 2, name: "Upland", city: "Upland", state: "CA", address: "121 S. Mountain, Upland, CA 91786", phone: "(888) 350-5396", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.6484, 34.0975], region: "Southern California" },
  { id: 3, name: "Rancho Cucamonga", city: "Rancho Cucamonga", state: "CA", address: "9267 Haven Ave, Suite 180, Rancho Cucamonga, CA 91730", phone: "(909) 295-5467", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.5931, 34.1064], region: "Southern California" },
  { id: 4, name: "Fontana", city: "Fontana", state: "CA", address: "8265 Sierra Ave, Suite 106, Fontana, CA 92335", phone: "(909) 822-5192", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.4350, 34.0922], region: "Southern California" },
  
  // Southern California - San Gabriel Valley
  { id: 5, name: "Covina", city: "Covina", state: "CA", address: "965 N. Grand, Covina, CA 91724", phone: "(888) 350-5396", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.8903, 34.0900], region: "Southern California" },
  { id: 6, name: "Covina (Village Oaks)", city: "Covina", state: "CA", address: "970 S Village Oaks, Suite 209, Covina, CA 91708", phone: "(888) 350-5396", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.9034, 34.0600], region: "Southern California" },
  { id: 7, name: "Glendora", city: "Glendora", state: "CA", address: "223 S Glendora Ave, Suite 202, Glendora, CA 91741", phone: "(888) 350-5396", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.8653, 34.1361], region: "Southern California" },
  { id: 8, name: "San Dimas", city: "San Dimas", state: "CA", address: "433 W. Allen Ave, Suite 104, San Dimas, CA 91773", phone: "(626) 926-4026", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.8067, 34.1067], region: "Southern California" },
  { id: 9, name: "Pomona", city: "Pomona", state: "CA", address: "420 N. Gibbs St., Pomona, CA 91767", phone: "(909) 622-3222", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.7500, 34.0633], region: "Southern California" },
  
  // Southern California - LA Area
  { id: 10, name: "La Mirada", city: "La Mirada", state: "CA", address: "16700 Valley View Ave #190, La Mirada, CA 90638", phone: "(888) 350-5396", hours: "Mon-Fri: 9am-5pm", coordinates: [-118.0120, 33.9172], region: "Southern California" },
  { id: 11, name: "San Fernando", city: "San Fernando", state: "CA", address: "313 S. Brand Ave., San Fernando, CA 91340", phone: "(818) 838-6655", hours: "Mon-Fri: 9am-5pm", coordinates: [-118.4390, 34.2819], region: "Southern California" },
  
  // Southern California - Orange County
  { id: 12, name: "Anaheim", city: "Anaheim", state: "CA", address: "1801 E. Katella Ave, Suite 1009, Anaheim, CA 92805", phone: "(714) 329-4844", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.8897, 33.8046], region: "Southern California" },
  { id: 13, name: "Anaheim (Satellite)", city: "Anaheim", state: "CA", address: "Anaheim, CA", phone: "(888) 350-5396", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.9145, 33.8366], region: "Southern California" },
  { id: 14, name: "Orange", city: "Orange", state: "CA", address: "500 N. State College Blvd, Suite 1100, Orange, CA 92868", phone: "(717) 837-3362", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.8531, 33.7879], region: "Southern California" },
  { id: 15, name: "Newport Beach", city: "Newport Beach", state: "CA", address: "333 Bayside Dr, Newport Beach, CA 92660", phone: "(310) 849-1533", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.9187, 33.6189], region: "Southern California" },
  
  // Southern California - San Diego
  { id: 16, name: "San Diego", city: "San Diego", state: "CA", address: "1855 1st Avenue, Suite #103, San Diego, CA 92101", phone: "(888) 350-5396", hours: "Mon-Fri: 9am-5pm", coordinates: [-117.1611, 32.7157], region: "Southern California" },
  
  // Arizona
  { id: 17, name: "Tempe", city: "Tempe", state: "AZ", address: "60 E. Rio Salado Parkway, Suite 900, Tempe, AZ 85281", phone: "(888) 350-5396", hours: "Mon-Fri: 9am-5pm", coordinates: [-111.9400, 33.4255], region: "Arizona" },
  { id: 18, name: "Surprise", city: "Surprise", state: "AZ", address: "Surprise, AZ", phone: "(888) 350-5396", hours: "Mon-Fri: 9am-5pm", coordinates: [-112.4530, 33.6292], region: "Arizona" },
  
  // Oregon
  { id: 19, name: "Medford", city: "Medford", state: "OR", address: "210 West 8th St, Medford, OR 97501", phone: "(800) 223-1281", hours: "Mon-Fri: 9am-5pm", coordinates: [-122.8756, 42.3265], region: "Pacific Northwest" },
  
  // Central California
  { id: 20, name: "Fresno", city: "Fresno", state: "CA", address: "7621 N Del Mar Ave, Unit 102, Fresno, CA 93711", phone: "(888) 350-5396", hours: "Mon-Fri: 9am-5pm", coordinates: [-119.7871, 36.8252], region: "Central California" },
];
