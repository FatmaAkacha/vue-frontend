import axios from 'axios';

const REGLEMENT_API_Base_URL = 'http://localhost:8083';  // Votre base URL d'API

class ReglementService {
    // Récupérer tous les règlements
    getReglements() {
        return axios.get(`${REGLEMENT_API_Base_URL}/reglements`); 
        }

    // Créer un nouveau règlement
    createReglement(reglement) {
        return axios.post(`${REGLEMENT_API_Base_URL}/reglement`, reglement);  // Envoie des données via POST
    }

    // Autres méthodes si nécessaire, comme la mise à jour ou la suppression
    updateReglement(id, reglement) {
        return axios.put(`${REGLEMENT_API_Base_URL}/${id}`, reglement);
    }

    deleteReglement(id) {
        return axios.delete(`${REGLEMENT_API_Base_URL}/${id}`);
    }
}

export default new ReglementService();