import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://tahfeeth.frmawy.tech/api/',
    timeout: 1000,
    headers: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RhaGZlZXRoLmZybWF3eS5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNzA4MDA5Mjc3LCJuYmYiOjE3MDgwMDkyNzcsImp0aSI6IkF1UWFXa0F2ODdXUGwyUkMiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.fTYQuuXL5GJzTaKgRpFbZfxd_oFUdDNZzW4O0jhRhyE'        
    },
  });
