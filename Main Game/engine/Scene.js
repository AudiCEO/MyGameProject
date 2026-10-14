class Scene{
    gameObjects = []

    instantiate(gameObject, position = new Vector2(0,0), rotation = 0){
        this.gameObjects.push(gameObject)
        gameObject.transform.position = position
        gameObject.transform.rotation = rotation
    }

    start(){
        for(const gameObject of this.gameObjects){
            gameObject.start()
        }
    }

    update(){
        for(const gameObject of this.gameObjects){
            gameObject.update()
        }

        let temp = []
        for(const gameObject of this.gameObjects){
            if(!gameObject.markForDestroy)
                temp.push(gameObject)
        }
        this.gameObjects = temp
    }

    draw(ctx){
        for(const gameObject of this.gameObjects){
            gameObject.draw(ctx)
        }
    }
}

function instantiate(gameObject, position = new Vector2(0,0), rotation = 0){
    Engine.currentScene.instantiate(gameObject, position, rotation)
}
