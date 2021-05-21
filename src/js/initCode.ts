import './../scss/main.scss'

//problemy : brak separcaji logiki, brak skalowalności np dodanie kilku nowych narzedzi gdy ktos rusza kursorem myszy wymaga kilku nowych if'ow dla eventu mousemove
// strategia pozwala w dynamiczny sposob zmieniac fragmenty aplikacji
enum TOOLS {
    BRUSH = 'brush',
    PENCIL = 'pencil',
    SHAPE = 'shape',
    NONE = 'none',
}

enum DOM_SELECTORS {
    JS_TOOL = '.js-tool',
    JS_CURRENT_TOOL = '.js-current-tool',
    CANVAS = 'canvas',
}

enum CSS_CLASSES {
    ACTIVE = 'active',
}

enum HTML_ATTRIBUTES {
    DATA_COLOR = 'data-color',
    DATA_TOOL = 'data-tool',
}

const current = document.querySelector(DOM_SELECTORS.JS_CURRENT_TOOL)
const canvas: HTMLCanvasElement | null = document.querySelector(
    DOM_SELECTORS.CANVAS
)

const ctx = canvas?.getContext('2d')

let tool = TOOLS.NONE

let drawing = false

function selectBrush(btn: HTMLButtonElement) {
    const color = btn.getAttribute(HTML_ATTRIBUTES.DATA_COLOR)
    alert(color)
}

function removeActive() {
    document
        .querySelectorAll(DOM_SELECTORS.JS_TOOL)
        .forEach((t) => t.classList.remove(CSS_CLASSES.ACTIVE))
}

function setActive(element: HTMLButtonElement) {
    element.classList.add(CSS_CLASSES.ACTIVE)
}

document.querySelectorAll(DOM_SELECTORS.JS_TOOL).forEach((t) =>
    t.addEventListener('click', (ev) => {
        const selectedTool = ev.target as HTMLButtonElement
        tool = selectedTool?.getAttribute(HTML_ATTRIBUTES.DATA_TOOL) as TOOLS
        removeActive()
        setActive(selectedTool)
        if (current) {
            current.textContent = tool
        }
    })
)
if (canvas && ctx) {
    canvas.addEventListener('mousemove', (ev) => {
        if (tool === TOOLS.PENCIL && drawing) {
            ctx.lineWidth = 1
            ctx.lineCap = 'round'
            ctx.strokeStyle = 'black'
            ctx.lineTo(ev.offsetX, ev.offsetY)
            ctx.stroke()
        } else if (tool === TOOLS.BRUSH && drawing) {
            ctx.lineWidth = 5
            ctx.lineCap = 'round'
            ctx.strokeStyle = 'red'
            ctx.lineTo(ev.offsetX, ev.offsetY)
            ctx.stroke()
        }
    })

    canvas.addEventListener('pointerdown', (ev) => {
        if (tool === TOOLS.SHAPE) {
            const size = 20
            ctx.lineWidth = 5
            ctx.strokeStyle = 'green'
            ctx.strokeRect(
                ev.offsetX - size / 2,
                ev.offsetY - size / 2,
                size,
                size
            )
        } else if ([TOOLS.BRUSH, TOOLS.PENCIL].includes(tool)) {
            if (!drawing) {
                drawing = true
            }
        }
    })

    canvas.addEventListener('pointerup', () => {
        drawing = false
        ctx.beginPath()
    })
}
