import { LightningElement, track } from 'lwc';
import JwtDecryptUtil from "c/jwtDecryptUtil";
export default class JwtTokenDecrypter extends LightningElement {

    @track decryptedHeader = '';
    @track decryptedBody = '';
    jwtKey;
    jwtBody;

    keyUtilInitialized = false;
    jwtDecrypter;

    renderedCallback() {
        if (this.keyUtilInitialized) {
            return;
        }

        this.keyUtilInitialized = true;
        this.jwtDecrypter = new JwtDecryptUtil();
        this.jwtDecrypter.init(this);
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

        const isValid = this.jwtDecrypter.validateJwt(this.jwtKey, this.jwtBody);
        console.log(`Is valid ${isValid}`);

        const _decrypted = this.jwtDecrypter.getJwtHeaderAndBody(this.jwtBody);
        this.decryptedHeader = JSON.stringify(_decrypted.header);
        console.log(`decryptedHeader: ${JSON.stringify(this.decryptedHeader)} `);
        this.decryptedBody = JSON.stringify(_decrypted.body);
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