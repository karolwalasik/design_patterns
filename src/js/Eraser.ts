import { Tool } from './Tool'

export class Eraser extends Tool {
    public constructor(size: number, color: string) {
        super()
        this._drawing = false
        this._size = size || 20
    }

    public onMouseMove(x: number, y: number, ctx: CanvasRenderingContext2D) {
        if (this._drawing) {
            ctx.clearRect(
                x - this._size / 2,
                y - this._size / 2,
                this._size,
                this._size
            )
        }
    }

    public onMouseUp(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this._drawing = false
    }

    public onMouseDown(x: number, y: number, ctx: CanvasRenderingContext2D) {
        if (!this._drawing) {
            this._drawing = true
        }
    }
}
