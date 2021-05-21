import { Tool } from './Tool'

export class Shape extends Tool {
    public constructor(size: number, color: string) {
        super()
        this._size = size || 20
        this._color = color || 'red'
    }

    public onMouseDown(x: number, y: number, ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this._color
        ctx.strokeRect(
            x - this._size / 2,
            y - this._size / 2,
            this._size,
            this._size
        )
    }
}
