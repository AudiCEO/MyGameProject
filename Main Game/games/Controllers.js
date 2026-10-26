//Which screen we are on: "start", "playing", "help", "over", or "won"
let gameState = "start"

//How many retries the chicken has left (1 means one extra try)
let lives = 1

//Week 7 variables
let score = 0
let bestScore = 0
let highestLane = 0     
let invincibleTime = 0  

//Ends the game and saves the best score
function endGame(state) {
    gameState = state
    if (score > bestScore) {
        bestScore = score
    }
}

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
            lives = 1
            score = 0
            highestLane = 0
            invincibleTime = 0
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

        //Count down the invincibility timer
        if (invincibleTime > 0) {
            invincibleTime = invincibleTime - Time.deltaTime
        }

        this.checkCarHit()
        if (gameState !== "playing") return

        if (!Input.keysDown.includes("Space") && !Input.keysDown.includes("ArrowLeft") && !Input.keysDown.includes("ArrowRight")) {
            this.canMove = true
        }

        if (!this.canMove) return

        if (Input.keysDown.includes("Space")) this.move(this.lane + 1, this.col)
        if (Input.keysDown.includes("ArrowLeft")) this.move(this.lane, this.col - 1)
        if (Input.keysDown.includes("ArrowRight")) this.move(this.lane, this.col + 1)
    }

    move(newLane, newCol) {
        if (newLane > 9) {
            endGame("won")
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

        //Only score when reaching a lane further than ever before
        if (this.lane > highestLane) {
            highestLane = this.lane
            score = score + 1
        }
    }

    checkCarHit() {
        for (const go of Engine.currentScene.gameObjects) {
            if (go.name === "Car") {
                let dist = this.transform.position.minus(go.transform.position).magnitude
                if (dist < 25 && invincibleTime <= 0) {
                    if (lives > 0) {
                        //Still have a retry: lose one and go back to the start
                        lives = lives - 1
                        this.lane = 0
                        this.col = 4
                        this.transform.position = new Vector2(270, 570)
                        invincibleTime = 2
                    } else {
                        //No retries left, game over
                        endGame("over")
                    }
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
