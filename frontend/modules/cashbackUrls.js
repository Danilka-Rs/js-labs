class CashbackUrls {
    constructor() {
        this.baseUrl = "http://localhost:3000";
    }

    getCashbacks(title = "") {
        const params = new URLSearchParams();

        if (title.trim()) {
            params.set("title", title.trim());
        }

        const query = params.toString();

        return `${this.baseUrl}/cashbacks${query ? `?${query}` : ""}`;
    }

    getCashbackById(id) {
        return `${this.baseUrl}/cashbacks/${id}`;
    }

    createCashback() {
        return `${this.baseUrl}/cashbacks`;
    }

    removeCashbackById(id) {
        return `${this.baseUrl}/cashbacks/${id}`;
    }

    updateCashbackById(id) {
        return `${this.baseUrl}/cashbacks/${id}`;
    }
}

export const cashbackUrls = new CashbackUrls();
