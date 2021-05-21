import { Tool } from './Tool'

export class DrawingBoardUI {
    public currentTool: Tool | null
    public constructor(container: string, width: number, height: number) {
        this.currentTool = null
        this.attachCanvas(container, this.createCanvas(width, height))
    }

    createCanvas(width: number, height: number) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        canvas.width = width
        canvas.height = height
        canvas.style.border = '1px solid red'

        //dzieki wzorcowi strategia musimy tylko sprawdzic czy jakies narzedzie jest ustawione, naszej klasy nie interesuje jakim narzedziem sie poslugujemy, wiemy ze wszystkie
        // narzedzia beda mialy dane funkcje onMousemove itd bo musza miec taki sam interfejs

        canvas.addEventListener('mousemove', (ev) => {
            if (this.currentTool) {
                this.currentTool.onMouseMove(ev.offsetX, ev.offsetY, ctx)
            }
        })

        canvas.addEventListener('mousedown', (ev) => {
            if (this.currentTool) {
                this.currentTool.onMouseDown(ev.offsetX, ev.offsetY, ctx)
            }
        })

        canvas.addEventListener('mouseup', (ev) => {
            if (this.currentTool) {
                this.currentTool.onMouseUp(ev.offsetX, ev.offsetY, ctx)
            }
        })

        return canvas
    }

    attachCanvas(container: string, canvas: HTMLCanvasElement) {
        document.querySelector(container)?.appendChild(canvas)
    }

    changeTool(tool: Tool) {
        this.currentTool = tool
    }
}
