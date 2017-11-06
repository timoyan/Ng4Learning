export class Utils {
    static isInteger(x) {
        return (typeof parseInt(x,10) === 'number') && (x % 1 === 0);
    }
}