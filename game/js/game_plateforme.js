class plateform{
    constructor(height, width, position){
        this.position = position
        this.height = height
        this.width = width
    }
    draw(ctx){
        ctx.fillStyle = 'black'
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }
}

export default plateform