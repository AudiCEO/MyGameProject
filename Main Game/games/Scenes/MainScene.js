class MainScene extends Scene {
    constructor() {
        super()
        this.instantiate(new ChickenGameObject(), new Vector2(270, 570))

        //Cars: CarGameObject(direction, speed)
        this.instantiate(new CarGameObject(1), new Vector2(0, 450))
        this.instantiate(new CarGameObject(-1), new Vector2(600, 330))
        this.instantiate(new CarGameObject(1), new Vector2(0, 90))

        //This is for more cars, each lane has its own speed
        this.instantiate(new CarGameObject(-1, 60), new Vector2(600, 510))   //lane 1, slow
        this.instantiate(new CarGameObject(1, 120), new Vector2(0, 390))     //lane 3, fast
        this.instantiate(new CarGameObject(-1), new Vector2(200, 330))       //lane 4, second car
        this.instantiate(new CarGameObject(-1, 100), new Vector2(600, 210))  //lane 6
        this.instantiate(new CarGameObject(1, 70), new Vector2(0, 150))      //lane 7, slow
        
                //Random trees
        //Need to select one column that never gets a tree, so there is always a clear path to the top
        let safeCol = Math.floor(Math.random() * 10)

        //Go through lanes 1-9 (lane 0 is the start row, make sure no trees there)
        for (let lane = 1; lane <= 9; lane++) {
            //Each lane gets 0,1, or 2 trees
            let treeCount = Math.floor(Math.random() * 3)
            let usedCols = []

            for (let i = 0; i < treeCount; i++) {
                let col = Math.floor(Math.random() * 10)

                //Skip the safe column and columns that already have a tree in this lane
                if (col !== safeCol && !usedCols.includes(col)) {
                    usedCols.push(col)
                    this.instantiate(new TreeGameObject(lane, col), new Vector2(col * 60 + 30, 570 - lane * 60))
                }
            }
        }
    }

    drawButton(ctx, b, label) {
        ctx.fillStyle = "orange"
        ctx.fillRect(b.x, b.y, b.w, b.h)
        ctx.fillStyle = "black"
        ctx.font = "26px Arial"
        ctx.textAlign = "center"
        ctx.fillText(label, b.x + b.w / 2, b.y + 38)
    }

    draw(ctx) {
        //Grid lines
        ctx.strokeStyle = "#cccccc"
        for (let i = 0; i <= 10; i++) {
            ctx.beginPath()
            ctx.moveTo(i * 60, 0)
            ctx.lineTo(i * 60, 600)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(0, i * 60)
            ctx.lineTo(600, i * 60)
            ctx.stroke()
        }

        super.draw(ctx)

        //Show retries, score, and best score
        ctx.fillStyle = "black"
        ctx.font = "20px Arial"
        ctx.textAlign = "left"
        ctx.fillText("Retries left: " + lives, 10, 25)
        ctx.fillText("Score: " + score, 10, 50)
        ctx.fillText("Best: " + bestScore, 10, 75)

        if (gameState === "playing") return

        //Fade out the board behind the menus
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
        ctx.fillRect(0, 0, 600, 600)
        ctx.textAlign = "center"

        if (gameState === "start") {
            ctx.fillStyle = "black"
            ctx.font = "50px Arial"
            ctx.fillText("Chicken Cross", 300, 260)
            this.drawButton(ctx, menuButton, "Start")
            this.drawButton(ctx, helpButton, "How to Play")
        } else if (gameState === "help") {
            ctx.fillStyle = "black"
            ctx.font = "34px Arial"
            ctx.fillText("How to Play", 300, 100)

            ctx.font = "20px Arial"
            ctx.fillText("Arrow Left / Right: move sideways", 300, 160)
            ctx.fillText("Space: hop forward one lane", 300, 190)
            ctx.fillText("Green shapes (trees): block your path, can't move onto them", 300, 240)
            ctx.fillText("Red rectangles (cars): moving obstacles, touching one costs a retry", 300, 280)
            ctx.fillText("Reach the top lane to win!", 300, 320)

            this.drawButton(ctx, backButton, "Back")
        } else if (gameState === "over") {
            ctx.fillStyle = "black"
            ctx.font = "50px Arial"
            ctx.fillText("GAME OVER", 300, 260)
            this.drawButton(ctx, menuButton, "Restart")
        } else if (gameState === "won") {
            ctx.fillStyle = "green"
            ctx.font = "50px Arial"
            ctx.fillText("You Win!", 300, 260)
            this.drawButton(ctx, menuButton, "Restart")
        }

        //Show the final score on the end screens
        if (gameState === "over" || gameState === "won") {
            ctx.fillStyle = "black"
            ctx.font = "24px Arial"
            ctx.textAlign = "center"
            ctx.fillText("Score: " + score + "   Best: " + bestScore, 300, 310)
        }
    }
}

