import { Brush } from './Brush'
import { Pencil } from './Pencil'
import { Shape } from './Shape'
import { Tool } from './Tool'

export class ToolsFactory {
    private brush: Tool
    private pencil: Tool
    private shape: Tool

    public constructor() {
        //bez wchodzenie w szczegoly implementacji latwo jest modyfikowac narzedzia dzieki fabryce
        //jedno miejsce w ktorym konfigurujemy jak sa tworzone poszczegolne narzedzia - sa tworzone w sposob spojny i mamy nad tym kontrole
        this.brush = new Brush(10, 'red')
        this.pencil = new Pencil(1, 'gray')
        this.shape = new Shape(20, 'green')
    }

    public getTool(tool: string) {
        switch (tool) {
            case 'brush':
                return this.brush
            case 'pencil':
                return this.pencil
            case 'shape':
                return this.shape
        }
    }
}
