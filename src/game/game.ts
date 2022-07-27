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
}