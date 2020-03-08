export default new class Environment {
    isElectron = (): boolean => {
        return navigator.userAgent.toLowerCase().indexOf(' electron/') > -1
    }
}