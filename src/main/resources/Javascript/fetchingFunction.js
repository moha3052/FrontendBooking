export class FetchesFunc {
    static methods = {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE",
        PATCH: "PATCH",
        OPTION: "OPTION",
    };

    static async fetchBy(urlPath, path, methodType, fullHeader = null, data = null, token = null, login = false) {
        if (!Object.values(FetchesFunc.methods).includes(methodType)) {
            console.error(`Invalid HTTP method: ${methodType}`);
            return null;
        }

        try {
            const headers = new Headers({
                "Content-Type": "application/json", // Default content type
            });

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            } else if (!login) {
                console.error("Token missing. Ensure you're logged in.");
                return {
                    success: false,
                    message: "Authorization token missing.",
                };
            }

            if (fullHeader && typeof fullHeader === "object") {
                for (const [key, value] of Object.entries(fullHeader)) {
                    headers.set(key, value);
                }
            }
            console.log("Token being sent:", FetchesFunc.getTokenFromStorage());
            console.log("Headers:", headers);
            const options = {
                method: methodType,
                headers,
            };

            if (methodType !== FetchesFunc.methods.GET && methodType !== FetchesFunc.methods.OPTION) {
                options.body = JSON.stringify(data);
            }

            console.log("Request Details:", {
                url: `${urlPath}${path}`,
                method: options.method,
                headers: Object.fromEntries(headers),
                body: options.body,
            });

            const response = await fetch(`${urlPath}${path}`, options);

            if (!response.ok) {
                let errorMessage = response.statusText;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || response.statusText;
                } catch (e) {
                    // Default to statusText if parsing fails
                }

                console.error(`HTTP Error: ${response.status} - ${errorMessage}`);
                return {
                    success: false,
                    status: response.status,
                    message: errorMessage,
                };
            }

            const responseData = await response.json();
            console.log("Response received:", responseData);
            return responseData;
        } catch (error) {
            console.error(`Fetch failed: ${error.message}`);
            return {
                success: false,
                message: error.message,
            };
        }
    }

    static async login(urlPath, path, data) {
        const response = await this.fetchBy(urlPath, path, this.methods.POST, null, data, null, true);

        if (response && response.data && response.data.accessToken) {
            this.saveToken(response.data.accessToken); // Save the token
            console.log("Token saved successfully:", response.data.accessToken);
        } else {
            console.error("Failed to login:", response);
        }

        return response;
    }


    static getTokenFromStorage() {
        console.log("This is the user"+localStorage.getItem("user"));
        const user =localStorage.getItem("user");
        console.log("This Is The User:" + user)
        return user;

    }
    static saveToken(token) {
        localStorage.setItem("user", token);
    }

    static removeToken() {
        localStorage.removeItem("user");
    }
}
