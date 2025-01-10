import axios from 'axios';

const REGLEMENT_API_Base_URL = 'http://localhost:8083/reglements'

class ReglementService{
    getReglements(){
        return axios.get(REGLEMENT_API_Base_URL);
    }
}
export default new ReglementService()