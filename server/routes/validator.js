function validate_email(input_email) {
    const pattern = /^[a-z0-9\.-]+@[a-z]+\.[a-z]+/;
    const result = input_email.match(pattern);
    if(result) {
        return result[0];
    }
    return false;
}


function validate_name(input_name) {
    const pattern = /^[a-zA-Z0-9]+/;
    const result = input_name.match(pattern);
    if(result) {
        return result[0];
    }
    return false;
}

module.exports = {validate_email, validate_name};