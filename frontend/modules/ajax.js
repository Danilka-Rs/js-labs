class FetchApi {
    async request(url, options = {}, callback) {
        try {
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    ...(options.headers || {})
                },
                ...options
            });

            const data = await this.parseResponse(response);
            callback(data, response.status);
        } catch (error) {
            console.error("Ошибка fetch-запроса:", error);
            callback(null, 0);
        }
    }

    async parseResponse(response) {
        if (response.status === 204) {
            return null;
        }

        const text = await response.text();

        if (!text) {
            return null;
        }

        try {
            return JSON.parse(text);
        } catch (error) {
            console.error("Ошибка парсинга JSON:", error);
            return null;
        }
    }

    get(url, callback) {
        return this.request(url, { method: "GET" }, callback);
    }

    post(url, data, callback) {
        return this.request(url, {
            method: "POST",
            body: JSON.stringify(data)
        }, callback);
    }

    patch(url, data, callback) {
        return this.request(url, {
            method: "PATCH",
            body: JSON.stringify(data)
        }, callback);
    }

    delete(url, callback) {
        return this.request(url, { method: "DELETE" }, callback);
    }
}

export const ajax = new FetchApi();
