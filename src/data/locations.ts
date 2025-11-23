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
  // West Coast
  { id: 1, name: "Los Angeles", city: "Los Angeles", state: "CA", address: "123 Wilshire Blvd, Los Angeles, CA 90017", phone: "(213) 555-0100", hours: "Mon-Fri: 8am-6pm", coordinates: [-118.2437, 34.0522], region: "West" },
  { id: 2, name: "San Francisco", city: "San Francisco", state: "CA", address: "456 Market St, San Francisco, CA 94102", phone: "(415) 555-0101", hours: "Mon-Fri: 8am-6pm", coordinates: [-122.4194, 37.7749], region: "West" },
  { id: 3, name: "San Diego", city: "San Diego", state: "CA", address: "789 Broadway, San Diego, CA 92101", phone: "(619) 555-0102", hours: "Mon-Fri: 8am-6pm", coordinates: [-117.1611, 32.7157], region: "West" },
  { id: 4, name: "Seattle", city: "Seattle", state: "WA", address: "321 Pike St, Seattle, WA 98101", phone: "(206) 555-0103", hours: "Mon-Fri: 8am-6pm", coordinates: [-122.3321, 47.6062], region: "West" },
  { id: 5, name: "Portland", city: "Portland", state: "OR", address: "654 SW Morrison St, Portland, OR 97204", phone: "(503) 555-0104", hours: "Mon-Fri: 8am-6pm", coordinates: [-122.6765, 45.5152], region: "West" },
  { id: 6, name: "Phoenix", city: "Phoenix", state: "AZ", address: "987 N Central Ave, Phoenix, AZ 85004", phone: "(602) 555-0105", hours: "Mon-Fri: 8am-6pm", coordinates: [-112.0740, 33.4484], region: "West" },
  
  // Mountain
  { id: 7, name: "Denver", city: "Denver", state: "CO", address: "246 16th St, Denver, CO 80202", phone: "(303) 555-0106", hours: "Mon-Fri: 8am-6pm", coordinates: [-104.9903, 39.7392], region: "Mountain" },
  { id: 8, name: "Salt Lake City", city: "Salt Lake City", state: "UT", address: "135 Main St, Salt Lake City, UT 84101", phone: "(801) 555-0107", hours: "Mon-Fri: 8am-6pm", coordinates: [-111.8910, 40.7608], region: "Mountain" },
  
  // Southwest
  { id: 9, name: "Dallas", city: "Dallas", state: "TX", address: "468 Main St, Dallas, TX 75201", phone: "(214) 555-0108", hours: "Mon-Fri: 8am-6pm", coordinates: [-96.7970, 32.7767], region: "Southwest" },
  { id: 10, name: "Houston", city: "Houston", state: "TX", address: "791 Texas Ave, Houston, TX 77002", phone: "(713) 555-0109", hours: "Mon-Fri: 8am-6pm", coordinates: [-95.3698, 29.7604], region: "Southwest" },
  { id: 11, name: "Austin", city: "Austin", state: "TX", address: "357 Congress Ave, Austin, TX 78701", phone: "(512) 555-0110", hours: "Mon-Fri: 8am-6pm", coordinates: [-97.7431, 30.2672], region: "Southwest" },
  { id: 12, name: "San Antonio", city: "San Antonio", state: "TX", address: "159 E Houston St, San Antonio, TX 78205", phone: "(210) 555-0111", hours: "Mon-Fri: 8am-6pm", coordinates: [-98.4936, 29.4241], region: "Southwest" },
  
  // Midwest
  { id: 13, name: "Chicago", city: "Chicago", state: "IL", address: "753 Michigan Ave, Chicago, IL 60611", phone: "(312) 555-0112", hours: "Mon-Fri: 8am-6pm", coordinates: [-87.6298, 41.8781], region: "Midwest" },
  { id: 14, name: "Minneapolis", city: "Minneapolis", state: "MN", address: "951 Nicollet Mall, Minneapolis, MN 55403", phone: "(612) 555-0113", hours: "Mon-Fri: 8am-6pm", coordinates: [-93.2650, 44.9778], region: "Midwest" },
  { id: 15, name: "Detroit", city: "Detroit", state: "MI", address: "147 Woodward Ave, Detroit, MI 48226", phone: "(313) 555-0114", hours: "Mon-Fri: 8am-6pm", coordinates: [-83.0458, 42.3314], region: "Midwest" },
  { id: 16, name: "Milwaukee", city: "Milwaukee", state: "WI", address: "258 Wisconsin Ave, Milwaukee, WI 53203", phone: "(414) 555-0115", hours: "Mon-Fri: 8am-6pm", coordinates: [-87.9065, 43.0389], region: "Midwest" },
  { id: 17, name: "St. Louis", city: "St. Louis", state: "MO", address: "369 Market St, St. Louis, MO 63101", phone: "(314) 555-0116", hours: "Mon-Fri: 8am-6pm", coordinates: [-90.1994, 38.6270], region: "Midwest" },
  
  // Southeast
  { id: 18, name: "Atlanta", city: "Atlanta", state: "GA", address: "741 Peachtree St, Atlanta, GA 30308", phone: "(404) 555-0117", hours: "Mon-Fri: 8am-6pm", coordinates: [-84.3880, 33.7490], region: "Southeast" },
  { id: 19, name: "Miami", city: "Miami", state: "FL", address: "852 Biscayne Blvd, Miami, FL 33132", phone: "(305) 555-0118", hours: "Mon-Fri: 8am-6pm", coordinates: [-80.1918, 25.7617], region: "Southeast" },
  { id: 20, name: "Orlando", city: "Orlando", state: "FL", address: "963 Orange Ave, Orlando, FL 32801", phone: "(407) 555-0119", hours: "Mon-Fri: 8am-6pm", coordinates: [-81.3792, 28.5383], region: "Southeast" },
  { id: 21, name: "Tampa", city: "Tampa", state: "FL", address: "174 Franklin St, Tampa, FL 33602", phone: "(813) 555-0120", hours: "Mon-Fri: 8am-6pm", coordinates: [-82.4572, 27.9506], region: "Southeast" },
  { id: 22, name: "Charlotte", city: "Charlotte", state: "NC", address: "285 Tryon St, Charlotte, NC 28202", phone: "(704) 555-0121", hours: "Mon-Fri: 8am-6pm", coordinates: [-80.8431, 35.2271], region: "Southeast" },
  { id: 23, name: "Nashville", city: "Nashville", state: "TN", address: "396 Broadway, Nashville, TN 37203", phone: "(615) 555-0122", hours: "Mon-Fri: 8am-6pm", coordinates: [-86.7816, 36.1627], region: "Southeast" },
  
  // Northeast
  { id: 24, name: "New York", city: "New York", state: "NY", address: "507 5th Ave, New York, NY 10017", phone: "(212) 555-0123", hours: "Mon-Fri: 8am-6pm", coordinates: [-73.9712, 40.7580], region: "Northeast" },
  { id: 25, name: "Boston", city: "Boston", state: "MA", address: "618 Boylston St, Boston, MA 02116", phone: "(617) 555-0124", hours: "Mon-Fri: 8am-6pm", coordinates: [-71.0589, 42.3601], region: "Northeast" },
  { id: 26, name: "Philadelphia", city: "Philadelphia", state: "PA", address: "729 Market St, Philadelphia, PA 19106", phone: "(215) 555-0125", hours: "Mon-Fri: 8am-6pm", coordinates: [-75.1652, 39.9526], region: "Northeast" },
  { id: 27, name: "Washington DC", city: "Washington", state: "DC", address: "830 Pennsylvania Ave, Washington, DC 20004", phone: "(202) 555-0126", hours: "Mon-Fri: 8am-6pm", coordinates: [-77.0369, 38.9072], region: "Northeast" },
  { id: 28, name: "Pittsburgh", city: "Pittsburgh", state: "PA", address: "941 Liberty Ave, Pittsburgh, PA 15222", phone: "(412) 555-0127", hours: "Mon-Fri: 8am-6pm", coordinates: [-79.9959, 40.4406], region: "Northeast" },
  { id: 29, name: "Baltimore", city: "Baltimore", state: "MD", address: "152 Pratt St, Baltimore, MD 21202", phone: "(410) 555-0128", hours: "Mon-Fri: 8am-6pm", coordinates: [-76.6122, 39.2904], region: "Northeast" },
];
