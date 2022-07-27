import { Settings } from '@/settings'
import { Entity } from '@/utils'

export class Game extends Entity {

    private _lastTimestamp = 0

    public Entities: Entity[] = []


    public Awake(): void {
        super.Awake()

        for (const entity of this.Entities) {
            entity.Awake()
        }

        // Make sure we start after all entities are awaken.
        window.requestAnimationFrame(() => {
            // set initial timestamp.
            this._lastTimestamp = Date.now()
            // start game loop.
            this.Update()
        })

        this.DirtyDraw()
    }


    public Update(): void {
        // Compute time elapsed since last Update cycle.
        const deltaTime = (Date.now() - this._lastTimestamp) / 1000
        super.Update(deltaTime)

        for (const entity of this.Entities) {
            entity.Update(deltaTime)
        }

        this._lastTimestamp = Date.now()
        window.requestAnimationFrame(() => this.Update())
    }

    private DirtyDraw(): void {
        const canvas = document.createElement('canvas')
        const canvasSize = (Settings.grid.nodeSize + Settings.grid.nodeOffset) * Settings.grid.dimension + Settings.grid.nodeOffset
        canvas.setAttribute('width', canvasSize.toString())
        canvas.setAttribute('height', canvasSize.toString())
        document.body.appendChild(canvas)

        const size = Settings.grid.nodeSize
        const offset = Settings.grid.nodeOffset
        for (let y = 0; y < Settings.grid.dimension; y++) {
            for (let x = 0; x < Settings.grid.dimension; x++) {
                const ctx = canvas.getContext('2d')!
                ctx.beginPath()
                ctx.fillStyle = Settings.grid.color
                ctx.rect((size + offset) * x, (size + offset) * y, size, size)
                ctx.fill()
            }
        }
    }

}