import { Entity } from "@/utils"
import { NodeDrawComponent } from './components/draw/draw'
import { Vector2D } from '../utils/vector2d/vector2d'

export class Node extends Entity {

    constructor(
        public readonly Start: Vector2D,
        public readonly End: Vector2D,
        public readonly Index: Vector2D
    ) {
        super()
    }


    public Awake(): void {
        this.AddComponent(new NodeDrawComponent())

        super.Awake()
    }

    public get Size(): Vector2D {
        return new Vector2D(this.End.x - this.Start.x, this.End.y - this.Start.y)
    }

    public get Center(): Vector2D {
        return new Vector2D(
            this.Start.x + this.Size.x / 2,
            this.Start.y + this.Size.y / 2
        )
    }
}