const methods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH",
    OPTION: "OPTION"
};

class FetchesFunc {
    static #fetchBy(urlPath, methodType, path, data = null) {
        return (async () => {
            if (!Object.values(methods).includes(methodType)) {
                console.error(`Invalid HTTP method: ${methodType}`);
                return null;
            }

            try {
                const options = {
                    method: methodType,
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                // If method is GET or OPTION, we do not send a body
                if (methodType !== methods.GET && methodType !== methods.OPTION) {
                    options.body = JSON.stringify(data);
                }

                const response = await fetch(`${urlPath}${path}`, options);

                if (!response.ok) {
                    console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
                    return null;
                }

                return await response.json();
            } catch (error) {
                console.error(`Fetch failed: ${error.message}`);
                return null;
            }
        })(); // Immediately invoke the async function and return its result
    }

    static get(urlPath, path) {
        return FetchesFunc.#fetchBy(urlPath, methods.GET, path);
    }

    static getWithData(urlPath, path, data) { // Changed name to avoid conflict
        return FetchesFunc.#fetchBy(urlPath, methods.GET, path, data);
    }

    static post(urlPath, path, data) {
        return FetchesFunc.#fetchBy(urlPath, methods.POST, path, data);
    }

    static put(urlPath, path, data) {
        return FetchesFunc.#fetchBy(urlPath, methods.PUT, path, data);
    }

    static delete(urlPath, path, data) {
        return FetchesFunc.#fetchBy(urlPath, methods.DELETE, path, data);
    }
}
