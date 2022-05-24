
class HashService {
    private chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    constructor() { }

    addStringToArrayOfChars(str: string) {
        this.chars.concat(str);
    }

    generateHash(lengthOfHash: number) {
        var hash = '';
        length = length || 6;
        for (var i = 0; i < length; i++) {
            hash += this.chars.charAt(Math.floor(Math.random() * this.chars.length));
        }
        return hash;
    }
}

export const hashService = new HashService();
