class MainScene extends Scene {
    constructor() {
        super()
        this.instantiate(new ChickenGameObject(), new Vector2(270, 570))

        this.instantiate(new TreeGameObject(2, 2), new Vector2(2 * 60 + 30, 570 - 2 * 60))
        this.instantiate(new TreeGameObject(5, 4), new Vector2(4 * 60 + 30, 570 - 5 * 60))

        this.instantiate(new CarGameObject(1), new Vector2(0, 450))
        this.instantiate(new CarGameObject(-1), new Vector2(600, 330))
        this.instantiate(new CarGameObject(1), new Vector2(0, 90))
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

        if (gameState === "playing") return

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
            ctx.fillText("Red rectangles (cars): moving obstacles, touching one ends the game", 300, 280)
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
    }
}