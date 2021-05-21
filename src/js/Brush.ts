import { Tool } from './Tool'

export class Brush extends Tool {
    constructor(capSize: number, color: string) {
        super()
        this._drawing = false
        this._capSize = capSize || 5
        this._color = color || 'black'
    }

    onMouseMove(x: number, y: number, ctx: CanvasRenderingContext2D) {
        if (this._drawing) {
            ctx.lineWidth = this._capSize
            ctx.lineCap = 'round'
            ctx.strokeStyle = this._color
            ctx.lineTo(x, y)
            ctx.stroke()
        }
    }

    onMouseUp(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this._drawing = false
        ctx.beginPath()
    }

    onMouseDown(x: number, y: number, ctx: CanvasRenderingContext2D) {
        if (!this._drawing) {
            this._drawing = true
        }
    }
}
