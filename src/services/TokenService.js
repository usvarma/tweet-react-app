const baseUrl = `https://localhost:44319/api/v1.0/tweets`;
const contentTypeHeader = { 'Content-Type': 'application/json' };

let _token = JSON.parse(localStorage.getItem("token"))|| "";

const getExpirationDate = (jwtToken) => {
    if (!jwtToken) return null;

    const jwt = JSON.parse(atob(jwtToken.split(".")[1]));

    // multiply by 1000 to convert seconds into milliseconds
    return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

const isExpired = (token) => {
    if (!token) {
        return false;
    }
    let expiryDate = getExpirationDate(token);
    return expiryDate === null ? false : Date.now() > expiryDate;

};

export const GetToken = async () => {
    if (!_token || !_token.trim()) {
        return null;
    }
    if (isExpired(_token)) {

        try {
            const request = new Request(`${baseUrl}/users/refreshtoken`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: contentTypeHeader,
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({ TokenString: _token })
            });

            const response = await fetch(request);
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            var newToken = await response.text();
            console.log(`Token in tokenservice is: ${newToken}`);
            SetToken(newToken);
            return newToken;
        } catch (error) {
            throw error;
        }
    }
    return _token;
};

export const SetToken = (token) => {
    if (!token || !token.trim()) {
        localStorage.removeItem("token");
    } else {
        localStorage.setItem("token", JSON.stringify(token));
    }
    _token = token;

};

export const GetUserInfo = async () => {
    let token = await GetToken();
    console.log(`Token in GetUserInfo is ${token}`);
    if (!token || !token.trim()) {
        return null;
    } else {
        console.log(token);
        const jwt = atob(token.split(".")[1]);
        let user = {
            userName: jwt.unique_name,
            emailId: jwt.email,
            name: jwt.name,
            //image: jwt.given_name?.toLowerCase(),
        };
        return user;
    }

};
