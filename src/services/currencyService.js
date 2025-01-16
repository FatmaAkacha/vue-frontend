import axios from 'axios';

const CURRENCY_API_Base_URL = 'http://localhost:8084/api/currencies'; 

class CurrencyService {
    getAllCurrencies() {
        return axios.get(CURRENCY_API_Base_URL);
    }

    getExchangeRates(baseCurrency) {
        return axios.get(`${CURRENCY_API_Base_URL}/rates`, {
            params: { baseCurrency }
        });
    }

    convertCurrency(from, to, amount) {
        return axios.get(`${CURRENCY_API_Base_URL}/convert`, {
            params: { from, to, amount }
        });
    }
}

export default new CurrencyService();
