// @ts-ignore
// @ts-nocheck
export class ToolsUI {
    constructor(container) {
        const root = this.createRoot()
        this.createButtons(root)
        this.attachToContainer(container, root)
        // subscribers - funkcje nasluchujace na zmiane narzedzi (obserwator) / ToolsUi nie ma pojecia kto jest zainteresowany zmiana narzedzi
        //odseparowanie logiki zwiazanej ze zmiana(budowaniem) narzedzia od logiki zwiazanej z reagowaniem na taka zmiane
        this.subscribers = []
    }

    createRoot() {
        const root = document.createElement('div')
        root.classList.add('flex', 'flex-column')
        return root
    }

    createButtons(root) {
        //subject - pojedyncze narzedzie na ktorego zmiane nasluchuje
        root.appendChild(this.createButton('Pencil', 'pencil'))
        root.appendChild(this.createButton('Brush', 'brush'))
        root.appendChild(this.createButton('Shape', 'shape'))
    }

    attachToContainer(container, root) {
        document.querySelector(container).appendChild(root)
    }

    createButton(name, selector) {
        const btn = document.createElement('button')
        btn.setAttribute('data-tool', selector)
        btn.textContent = name
        btn.addEventListener('click', () => {
            this.subscribers.forEach((s) => s(selector))
        })
        return btn
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber)
    }
}
