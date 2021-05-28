// @ts-ignore
// @ts-nocheck
import '../scss/main.scss'
import { ToolsUI } from './ToolsUI'
import { ToolsFactory } from './ToolsFactory'
import { DrawingBoardUI } from './DrawingBoardUI'
import { DrawingContextUI } from './DrawingContextUI'

const factory = new ToolsFactory()
const tools = new ToolsUI('.js-tools')
const board = new DrawingBoardUI('.js-canvas', 600, 300)
const context = new DrawingContextUI('.js-context')

tools.subscribe((selectedTool) => {
    const tool = factory.getTool(selectedTool)
    board.changeTool(tool)
})

tools.subscribe((selectedTool) => {
    context.updateContext(selectedTool)
})

tools.subscribe((selectedTool) => {
    tools.setActive(selectedTool)
})
