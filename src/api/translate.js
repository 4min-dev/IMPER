import navigator from "navigator";
import axios from "axios";

export default {
    async translate(text) {
        return axios.post(
          'https://translation.googleapis.com/language/translate/v2',
          {},
          {
            params: {
              q: text,
              target: navigator.language.slice(0,2),
              key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
            }
          }
        )
    }
}