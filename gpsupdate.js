const fs = require('fs');
const csv = require('csv-parser');
const { fromPoint } = require('utm');

// Function to convert UTM coordinates to latitude and longitude
function convertUTMToLatLong(utmX, utmY, zoneNumber, northernHemisphere) {
    const latLong = fromPoint({x: utmX, y: utmY, zoneNumber, northernHemisphere});
    return { lat: latLong.latitude, long: latLong.longitude };
}
//hello rachel 
// Read the CSV file
fs.createReadStream('"C:\Users\rache\OneDrive\Documents\2024\Spring 2024\Courses\11.C85\Assignments\Final Project\Geographic Data\buildings_permits_parcelID_timeseries_pivoted.csv"')
    .pipe(csv())
    .on('data', (row) => {
        // Convert GPS_X and GPS_Y to latitude and longitude
        const { lat, long } = convertUTMToLatLong(row.GPS_X, row.GPS_Y, 18, true); // Replace zoneNumber and hemisphere with your specific values
        // Update the row with latitude and longitude
        row.Latitude = lat;
        row.Longitude = long;
        // Delete the original GPS_X and GPS_Y columns
        delete row.GPS_X;
        delete row.GPS_Y;
        // Log the updated row
        console.log(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });