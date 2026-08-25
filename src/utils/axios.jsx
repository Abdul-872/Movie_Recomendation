import axios from 'axios'

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmUyOWZkODI3ODUyZWUyOWI0MTViZDdlOWQ2ZjRmMSIsIm5iZiI6MTc4NjU3NTk5Ny42MTc5OTk4LCJzdWIiOiI2YTdjZmM3ZDY3OTM1NDhlM2VhNTYyODEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rL29-iRut9HsN0_zn1r-02okJPQm-i0V-u43hY0kKxk'}

})
export default instance