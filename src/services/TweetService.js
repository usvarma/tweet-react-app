import { GetToken } from "./TokenService";

const baseUrl = `https://localhost:44319/api/v1.0/tweets`;
//const token = await GetToken(); //Add call to tokenservice to get token
//const requestHeader = {'Content-Type': 'application/json', 'Authorization':token};


// export async function getAllTweets() {

//     try {
//         const request = new Request(`${baseUrl}/all`, {
//             method: 'GET',
//             mode: 'cors',
//             cache: 'no-cache',
//             headers: requestHeader,
//             redirect: 'follow',
//             referrerPolicy: 'no-referrer'
//         });

//         const response = await fetch(request);
//         if (!response.ok) {
//             throw new Error(`${response.status}`);
//         }
        
//         return await response.json();

//     } catch (error) {
//         throw error;
//     }
// }

export async function getAllTweetsOfUser(username) {
    const token = await GetToken(); //Add call to tokenservice to get token
    const requestHeader = {'Content-Type': 'application/json', 'Authorization':token};
    try {
        const request = new Request(`${baseUrl}/${username}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: requestHeader,
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

// export async function addTweetsForUser(tweetData, username) {

//     try {
//         const request = new Request(`${baseUrl}/${username}/add`, {
//             method: 'POST',
//             mode: 'cors',
//             cache: 'no-cache',
//             headers: requestHeader,
//             redirect: 'follow',
//             referrerPolicy: 'no-referrer',
//             body: JSON.stringify(tweetData)
//         });

//         const response = await fetch(request);
//         if (!response.ok) {
//             throw new Error(`${response.status}`);
//         }
        
//         return await response.json();

//     } catch (error) {
//         throw error;
//     }
// }

// export async function updateTweetsForUser(updatedTweet, username, id) {

//     try {
//         const request = new Request(`${baseUrl}/${username}/update/${id}`, {
//             method: 'PUT',
//             mode: 'cors',
//             cache: 'no-cache',
//             headers: requestHeader,
//             redirect: 'follow',
//             referrerPolicy: 'no-referrer',
//             body: JSON.stringify(updatedTweet)
//         });

//         const response = await fetch(request);
//         if (!response.ok) {
//             throw new Error(`${response.status}`);
//         }
        
//         return await response.json();

//     } catch (error) {
//         throw error;
//     }
// }

// export async function deleteTweetsForUser(username, id) {

//     try {
//         const request = new Request(`${baseUrl}/${username}/delete/${id}`, {
//             method: 'DELETE',
//             mode: 'cors',
//             cache: 'no-cache',
//             headers: requestHeader,
//             redirect: 'follow',
//             referrerPolicy: 'no-referrer'
//         });

//         const response = await fetch(request);
//         if (!response.ok) {
//             throw new Error(`${response.status}`);
//         }
        
//         return await response.json();

//     } catch (error) {
//         throw error;
//     }
// }

// export async function likeTweet(username, id) {

//     try {
//         const request = new Request(`${baseUrl}/${username}/like/${id}`, {
//             method: 'PUT',
//             mode: 'cors',
//             cache: 'no-cache',
//             headers: requestHeader,
//             redirect: 'follow',
//             referrerPolicy: 'no-referrer'
//         });

//         const response = await fetch(request);
//         if (!response.ok) {
//             throw new Error(`${response.status}`);
//         }
        
//         return await response.json();

//     } catch (error) {
//         throw error;
//     }
// }

// export async function replyForTweet(username, id, replyTweet) {

//     try {
//         const request = new Request(`${baseUrl}/${username}/reply/${id}`, {
//             method: 'POST',
//             mode: 'cors',
//             cache: 'no-cache',
//             headers: requestHeader,
//             redirect: 'follow',
//             referrerPolicy: 'no-referrer',
//             body: JSON.stringify(replyTweet)
//         });

//         const response = await fetch(request);
//         if (!response.ok) {
//             throw new Error(`${response.status}`);
//         }
        
//         return await response.json();

//     } catch (error) {
//         throw error;
//     }
// }