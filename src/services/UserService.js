
const baseUrl = `https://localhost:44319/api/v1.0/tweets`;
const contentTypeHeader = {'Content-Type': 'application/json'};


export async function registerUser(userData){
    
    try{
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
        if(!response.ok){
            throw new Error(`${response.status}`);
        }
        //console.log(`Response in userservice.registerUser is ${response}`);
        return await response.json();
        
    }catch(error){
        return null;
    }
}