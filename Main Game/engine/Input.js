class Input{
    /**
     * @type{string[]} A list of the keys that are currently pressed
     */
    static keysDown = []

    /**
     * 
     * @param {KeyboardEvent} event Event details for the keydown event
     */
    static keydown(event){
        //Don't add the key to our list of keys if it is already there
        //Note that we grab event.code
        if(!Input.keysDown.includes(event.code))
            Input.keysDown.push(event.code)
    }

    /**
     * 
     * @param {KeyboardEvent} event Event details for the keyup event
     */
    static keyup(event){
        //Remove a key code from the list of codes
        //In JS, you have to find the index and then remove it from the array

        //Get the index of the key
        let index = Input.keysDown.indexOf(event.code)

        //Remove the key from the array using the split command
        Input.keysDown.splice(index,1)

    }
}

