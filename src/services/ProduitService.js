import axios from 'axios';

const PRODUIT_API_Base_URL = 'http://localhost:7268/api/Produits';

class ProduitService {
    getProduits() {
        return axios.get(PRODUIT_API_Base_URL);
    }

    createProduit(produit) {
        return axios.post(PRODUIT_API_Base_URL, produit);
    }

    updateProduit(id, produit) {
        console.log(`Mise à jour du produit avec ID : ${id}`);  // Debugging
        return axios.put(`${PRODUIT_API_Base_URL}/${id}`, produit);
    }

    deleteProduit(id) {
        return axios.delete(`${PRODUIT_API_Base_URL}/${id}`);
    }

    getProduitById(id) {
        return axios.get(`${PRODUIT_API_Base_URL}/${id}`);
    }
}

export default new ProduitService();