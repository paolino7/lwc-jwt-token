/**
 * Using library https://github.com/kjur/jsrsasign
 */
import { loadScript } from 'lightning/platformResourceLoader';
import jsrsasign from "@salesforce/resourceUrl/jsrsasign";
export default class JwtDecryptUtil {
    
    init(component) {
        loadScript(component, jsrsasign).then(() => {
            console.log('jsrsasign loaded!');
        }).catch( (e) => {
            console.error(`Error loading jsrsasign ${e}`);
        });
    }

    validateJwt(jwtKey, jwtBody) {
        const isValid = KJUR.jws.JWS.verifyJWT(jwtBody, jwtKey, {alg: ['HS256']});
        console.log(`Is valid ${isValid}`);
        return isValid;
    }

    getJwtHeaderAndBody(jwtBody) {
        const _header = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(jwtBody.split(".")[0]));
        console.log(`_header: ${JSON.stringify(_header)} `);
        const _body = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(jwtBody.split(".")[1]));
        console.log(`decryptedBody: ${_body} `);

        return {header: _header, body: _body}
    }
}
