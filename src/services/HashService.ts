
class HashService {
    private chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    constructor() { }

    addStringToArrayOfChars(str: string) {
        this.chars.concat(str);
    }

    generateHash(lengthOfHash: number) {
        var hash = '';
        lengthOfHash = lengthOfHash;
        for (var i = 0; i < lengthOfHash; i++) {
            hash += this.chars.charAt(Math.floor(Math.random() * this.chars.length));
        }
        return hash;
    }
}

export const hashService = new HashService();
