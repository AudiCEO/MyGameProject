class ChickenGameObject extends GameObject {
    constructor() {
        super("Chicken")
        this.addComponent(new Polygon(), { fillStyle: "yellow", points: Assets.square })
        this.addComponent(new ChickenController())
    }
}

class CarGameObject extends GameObject {
    constructor(dir) {
        super("Car")
        this.addComponent(new Polygon(), { fillStyle: "red", points: Assets.carRect })
        this.addComponent(new CarController(), { dir: dir })
    }
}

class TreeGameObject extends GameObject {
    constructor(lane, col) {
        super("Tree")
        this.lane = lane
        this.col = col
        this.addComponent(new Polygon(), { fillStyle: "darkgreen", points: Assets.tree })
    }
}
