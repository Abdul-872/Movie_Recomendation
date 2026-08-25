import axios from '../../src/utils/axios'
export {loadmovie} from '../reducers/MovieSlice'
import { loadmovie} from '../reducers/MovieSlice'
export {removemovie} from '../reducers/MovieSlice'

export const aysncloadmovie = (id)=> async(dispatch,getState)=>{
        try {
            const details = await axios.get(`/movie/${id}`);
            const externalid = await axios.get(`/movie/${id}/external_ids`);
            const recomendation = await axios.get(`/movie/${id}/recommendations`);
            const similar = await axios.get(`/movie/${id}/similar`);
            const videos = await axios.get(`/movie/${id}/videos`);
            const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

            const Theultimatedata = {
                details: details.data,
                externalid: externalid.data,
                recomendation: recomendation.data.results,
                similar: similar.data.results,
                videos: videos.data.results.find(m=>m.type === "Trailer"),
                watchproviders: watchproviders.data.results?.IN || {},
};
            console.log(Theultimatedata);
            dispatch(loadmovie(Theultimatedata));
            
        } catch (error) {
            console.log(error)
            
        }
}