class GameObject{
    /**
     * @type{Component[]} The list of components in the game object
     */
    components = []

    /**
     * @type{Boolean} Whether the game object has been marked for destroy
     */
    markForDestroy = false

    /**
     * @type{String} The name of the game object
     */
    name

    /** 
     * @returns{Transform} The transform
    */
    get transform(){
        return /** @type {Transform} */ (this.components[0]);
    }

    /**
     * Create a new game object
     * 
     * @param {String} name The name of the game object
     */
    constructor(name){
        this.addComponent(new Transform())
        this.name = name
    }

    /**
     * 
     * @param {Component} component The component to add
     * @param {Object} parameters An object with the parameters to set on the component
     */
    addComponent(component, parameters){
        Object.assign(component, parameters)
        this.components.push(component)
        component.gameObject = this
    }

    /**
     * Start the game object
     */
    start(){
        for(const component of this.components){
            component.start?.()
        }

    }

    /**
     * Update the game object
     */
    update(){
        for(const component of this.components){
            component.update?.()
        }

    }

    /**
     * Draw the game object
     * 
     * @param {CanvasRenderingContext2D} ctx The context to draw to
     */
    draw(ctx){
        for(const component of this.components){
            component.draw?.(ctx)
        }
    }

    /**
     * Mark the game object for destruction
     */
    destroy(){
        this.markForDestroy = true
    }

    /**
     * Find a game object by name
     * @param {String} name The name of the game object to find
     * @returns The first game object with the give name in the list of game object, undefined otherwise
     */
    static find(name){
        //return Engine.currentScene.gameObjects.find(function(go){return go.name == name})
        return Engine.currentScene.gameObjects.find(go=>go.name == name )
    }
}