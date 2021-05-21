//wzorzec strategia wymaga aby interfejs obiektów(strategii był taki sam)
import { Tool } from './Tool'

export class Pencil extends Tool {
    public constructor(capSize: number, color: string) {
        super()
        this._drawing = false
        this._capSize = capSize || 5
        this._color = color || 'black'
    }

    public onMouseMove(x: number, y: number, ctx: CanvasRenderingContext2D) {
        if (this._drawing) {
            ctx.lineWidth = this._capSize
            ctx.lineCap = 'round'
            ctx.strokeStyle = this._color
            ctx.lineTo(x, y)
            ctx.stroke()
        }
    }

    public onMouseUp(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this._drawing = false
        ctx.beginPath()
    }

    public onMouseDown(x: number, y: number, ctx: CanvasRenderingContext2D) {
        if (!this._drawing) {
            this._drawing = true
        }
    }
}
