
const baseUrl = `https://localhost:44319/api/v1.0/tweets`;
const contentTypeHeader = {'Content-Type': 'application/json'};


export async function registerUser(userData) {

    try {
        const request = new Request(`${baseUrl}/register`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: contentTypeHeader,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(userData)
        });

        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        //console.log(`Response in userservice.registerUser is ${response.body}`);
        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function loginUser(credentials) {

    try {
        const request = new Request(`${baseUrl}/login`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: contentTypeHeader,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(credentials)
        });

        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        
        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function forgotPassword(username, updatedPassword) {

    try {
        const request = new Request(`${baseUrl}/${username}/forgot`, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers: contentTypeHeader,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(updatedPassword)
        });

        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        
        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function searchUser(username) {

    try {
        const request = new Request(`${baseUrl}/users/search/${username}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: contentTypeHeader,
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });

        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        
        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function getAllUsers() {

    try {
        const request = new Request(`${baseUrl}/users/all`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: contentTypeHeader,
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });

        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        
        return await response.json();

    } catch (error) {
        throw error;
    }
}