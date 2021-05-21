export abstract class Tool {
    protected _drawing: boolean = false
    protected _capSize: number = 1
    protected _color: string = 'black'
    protected _size: number = 10

    public onMouseMove(x: number, y: number, ctx: CanvasRenderingContext2D) {}

    public onMouseUp(x: number, y: number, ctx: CanvasRenderingContext2D) {}

    public onMouseDown(x: number, y: number, ctx: CanvasRenderingContext2D) {}
}
