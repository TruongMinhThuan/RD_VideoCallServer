import ip from 'ip'


export default class Networking {
    static getIpAddress() {
        return ip.address()
    }
}