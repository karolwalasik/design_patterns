import { Tool } from './Tool'

export class DrawingContextUI {
    protected context: HTMLDivElement
    constructor(container: string) {
        this.context = document.createElement('div')
        this.context.textContent = '👈 Select a tool first'
        document.querySelector(container)?.appendChild(this.context)
    }

    public updateContext(tool: string) {
        this.context.textContent = this.formatText(tool)
    }

    private formatText(tool: string): string {
        switch (tool) {
            case 'brush':
                return `Selected tool - Brush 🖌`
            case 'pencil':
                return `Selected tool - Pencil ✏️`
            case 'shape':
                return `Selected tool - Shape ⏹`
            case 'eraser':
                return `Selected tool - Eraser ❌`
            default:
                return ''
        }
    }
}
