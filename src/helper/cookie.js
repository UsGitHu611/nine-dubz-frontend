class Cookie {

    #cookieArr = document.cookie.split("; ");
    #cookieStruct = this.#cookieArr.reduce((acc, prev) => {
        const [key, value] = prev.split("=");
        return {...acc, [key] : value }
    },{})

    findKey(key){
        return this.#cookieStruct[key];
    }

}

export const cookie = new Cookie();