import { Entity } from '@/utils'
import { Grid } from '../grid/grid'


export class Game extends Entity {

    private _lastTimestamp = 0

    private _entities: Entity[] = []

    public get Entities(): Entity[] {
        return this._entities
    }

    public Awake(): void {
        super.Awake()

        this._entities.push(new Grid())

        for (const entity of this._entities) {
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

        for (const entity of this._entities) {
            entity.Update(deltaTime)
        }

        this._lastTimestamp = Date.now()
        window.requestAnimationFrame(() => this.Update())
    }
}