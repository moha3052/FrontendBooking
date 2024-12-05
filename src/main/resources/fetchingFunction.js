const method = {
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
            if (!Object.values(method).includes(methodType)) {
                console.error(`Invalid HTTP method: ${methodType}`);
                return null;
            }

            try {
                const response = await fetch(`${urlPath}${path}`, {
                    method: methodType,
                    body: (methodType === method.GET || methodType === method.OPTION || data == null)
                        ? null
                        : JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

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
        return FetchesFunc.#fetchBy(urlPath, "GET", path);
    }
    static get(urlPath, path,data) {
        return FetchesFunc.#fetchBy(urlPath, "GET", path,data);
    }
    static post(urlPath, path, data) {
        return FetchesFunc.#fetchBy(urlPath, "POST", path, data);
    }

    static put(urlPath, path, data) {
        return FetchesFunc.#fetchBy(urlPath, "PUT", path, data);
    }

    static delete(urlPath, path, data) {
        return FetchesFunc.#fetchBy(urlPath, "DELETE", path, data);
    }

}
