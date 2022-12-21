const handleError = (error: any) => {
    if (error.response) { // get response with a status code not in range 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) { // no response
        console.log(error.request);
    } else { // Something wrong in setting up the request
        console.log('Error', error.message);
    }
    console.log(error.config);

};

export default handleError;