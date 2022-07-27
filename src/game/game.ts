import { createTextSpan } from 'typescript'
import { Entity } from '../utils/ecs/entity'

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
        canvas.setAttribute('width', '500px')
        canvas.setAttribute('height', '500px')
        document.body.appendChild(canvas)

        const ctx = canvas.getContext('2d')!
        ctx.beginPath()
        ctx.fillStyle = 'rgba(255, 0, 0, 1)'
        ctx.rect(10, 10, 50, 50)
        ctx.fill()
    }

}