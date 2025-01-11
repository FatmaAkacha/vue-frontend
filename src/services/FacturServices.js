import axios from 'axios';

const FACTURE_API_Base_URL = 'http://localhost:8081';

class FacturServices {
    // Récupérer toutes les factures
    getFactures() {
        return axios.get(`${FACTURE_API_Base_URL}/factures`);
    }

    // Récupérer une facture par son ID
    getFactureById(id) {
        return axios.get(`${FACTURE_API_Base_URL}/${id}`);
    }

    // Mettre à jour le statut d'une facture
    updateFactureStatus(id, status) {
        return axios.put(`${FACTURE_API_Base_URL}/${id}/update-status`, null, {
            params: { status },
        });
    }

    // Calculer le total d'une facture
    getFactureTotal(id) {
        return axios.get(`${FACTURE_API_Base_URL}/${id}/total`);
    }

    // Récupérer les clients les plus fidèles
    getMostLoyalClients() {
        return axios.get(`${FACTURE_API_Base_URL}/most-loyal-clients`);
    }

    // Récupérer les produits les plus demandés
    getMostRequestedProducts() {
        return axios.get(`${FACTURE_API_Base_URL}/most-requested-products`);
    }

    // Créer une nouvelle facture
    createFacture(facture) {
        return axios.post(`${FACTURE_API_Base_URL}/facture`, facture);
    }

    // Supprimer une facture par son ID
    deleteFacture(id) {
        return axios.delete(`${FACTURE_API_Base_URL}/facture/${id}`);
    }

    // Obtenir le chiffre d'affaires global
    getGlobalChiffreAffaires() {
        return axios.get(`${FACTURE_API_Base_URL}/global-chiffre-affaires`);
    }

    // Obtenir le chiffre d'affaires pour une année spécifique
    getChiffreAffairesByYear(year) {
        return axios.get(`${FACTURE_API_Base_URL}/chiffre-affaires`, {
            params: { year },
        });
    }

    // Récupérer les factures groupées par statut
    getFacturesByStatus() {
        return axios.get(`${FACTURE_API_Base_URL}/status`);
    }

    // Obtenir les dettes par client
    getDettesParClient() {
        return axios.get(`${FACTURE_API_Base_URL}/dettes`);
    }
    // Mettre à jour une facture complète
    updateFacture(id, facture) {
        return axios.put(`${FACTURE_API_Base_URL}/${id}/update`, facture); // Appel correct au backend
      }

}

export default new FacturServices();