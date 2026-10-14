let gameState = "start"

const menuButton = { x: 200, y: 330, w: 200, h: 60 }
const helpButton = { x: 200, y: 410, w: 200, h: 60 }
const backButton = { x: 200, y: 480, w: 200, h: 60 }

function isInside(mx, my, b) {
    return mx > b.x && mx < b.x + b.w && my > b.y && my < b.y + b.h
}

addEventListener("click", function (event) {
    const rect = Engine.canvas.getBoundingClientRect()
    const mx = event.clientX - rect.left
    const my = event.clientY - rect.top

    if (gameState === "start") {
        if (isInside(mx, my, menuButton)) gameState = "playing"
        if (isInside(mx, my, helpButton)) gameState = "help"
    } else if (gameState === "help") {
        if (isInside(mx, my, backButton)) gameState = "start"
    } else if (gameState === "over" || gameState === "won") {
        if (isInside(mx, my, menuButton)) {
            Engine.currentScene = new MainScene()
            Engine.currentScene.start()
            gameState = "playing"
        }
    }
})

class ChickenController extends Component {
    lane = 0
    col = 4
    canMove = true

    start() {
        this.transform.position = new Vector2(this.col * 60 + 30, 570 - this.lane * 60)
    }

    update() {
        if (gameState !== "playing") return

        if (!Input.keysDown.includes("Space") && !Input.keysDown.includes("ArrowLeft") && !Input.keysDown.includes("ArrowRight")) {
            this.canMove = true
        }

        if (!this.canMove) return

        if (Input.keysDown.includes("Space")) this.move(this.lane + 1, this.col)
        if (Input.keysDown.includes("ArrowLeft")) this.move(this.lane, this.col - 1)
        if (Input.keysDown.includes("ArrowRight")) this.move(this.lane, this.col + 1)

        this.checkCarHit()
    }

    move(newLane, newCol) {
        if (newLane > 9) {
            gameState = "won"
            return
        }

        if (newLane < 0 || newCol < 0 || newCol > 9) return

        for (const go of Engine.currentScene.gameObjects) {
            if (go.name === "Tree" && go.lane === newLane && go.col === newCol) return
        }

        this.lane = newLane
        this.col = newCol
        this.transform.position = new Vector2(this.col * 60 + 30, 570 - this.lane * 60)
        this.canMove = false
    }

    checkCarHit() {
        for (const go of Engine.currentScene.gameObjects) {
            if (go.name === "Car") {
                let dist = this.transform.position.minus(go.transform.position).magnitude
                if (dist < 25) {
                    gameState = "over"
                }
            }
        }
    }
}

class CarController extends Component {
    speed = 80
    dir = 1

    update() {
        if (gameState !== "playing") return

        this.transform.position.x += Time.deltaTime * this.speed * this.dir
        if (this.transform.position.x > 630) this.transform.position.x = -30
        if (this.transform.position.x < -30) this.transform.position.x = 630
    }
}