import { apiBaseUrl } from "../env/env.js";
function Api(){
    let baseUrl;
    let baseHeaders;
    
    function init(
        url = apiBaseUrl, 
        headers = {"Content-Type": 'application/json'}
    )
    {
        baseUrl = url;
        baseHeaders = headers;
        return {
            get, post
        }
    }
    async function request(endpoint, method, bodyData, headers = {}){
        try{
            const options = {
                method,
                headers: {
                    ...baseHeaders,
                    ...headers
                }
            }
            if (bodyData){
                options.body = JSON.stringify(bodyData)
            }
            const response = await fetch(baseUrl + endpoint, options);
            if (!response.ok){
                throw new Error(`Response status: ${response.status}`)
            }
            const data = await response.json();
            return data;
        }catch(err){
            console.log('error', err.message);
            throw err;
        }
    }
    function get(endpoint){
        return request(endpoint, 'GET');
    }

    function post(endpoint, bodyData, headers){
        return request(endpoint, 'POST', bodyData, headers);
    }
    return {init};
}

export {Api};