import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import jsrsasign from "@salesforce/resourceUrl/jsrsasign";

export default class JwtTokenDecrypter extends LightningElement {

    decryptedHeader = '';
    decryptedBody = '';
    jwtKey;
    jwtBody;

    keyUtilInitialized = false;

    renderedCallback() {
        if (this.keyUtilInitialized) {
            return;
        }

        this.keyUtilInitialized = true;
        loadScript(this, jsrsasign).then( () => {
            console.log('jsrsasign loaded!');
        })
    }

    handleDecrypt() {
        if (!this.jwtKey) {
            console.error(`JWT token empty ${this.jwtKey}`);
            return;
        }
        
        if (!this.jwtBody) {
            console.error(`JWT body empty ${this.jwtBody}`);
            return;
        }

        const isValid = KJUR.jws.JWS.verifyJWT(this.jwtBody, this.jwtKey, {alg: ['HS256']});
        console.log(`Is valid ${isValid}`);

        const _header = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(this.jwtBody.split(".")[0]));
        this.decryptedHeader = JSON.stringify(_header);
        console.log(`decryptedHeader: ${JSON.stringify(this.decryptedHeader)} `);
        const _body = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(this.jwtBody.split(".")[1]));
        this.decryptedBody = JSON.stringify(_body);
        console.log(`decryptedBody: ${this.decryptedBody} `);
        
    }

    handleChange(event) {
        const field = event.target.name;
        if (field === 'jwtKey') {
            this.jwtKey = event.target.value;
        } else if (field === 'jwtBody') {
            this.jwtBody = event.target.value;
        }
    }
}