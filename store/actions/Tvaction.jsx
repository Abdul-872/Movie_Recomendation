import axios from "../../src/utils/axios";

import { loadTv } from "../reducers/TvSlice";

export const aysncloadtv = (id) => async (dispatch) => {
  try {
    console.log("TV ID:", id);

    const details = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recomendation = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);

    const Theultimatedata = {
      details: details.data,
      externalid: externalid.data,
      recomendation: recomendation.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find(
        (m) => m.type === "Trailer"
      ),
      watchproviders:
        watchproviders.data.results?.IN || {},
    };

    console.log(Theultimatedata);

    dispatch(loadTv(Theultimatedata));

  } catch (error) {
    console.log(error);
  }
};