import { Fleet } from "@/fleet"
import { Entity } from "@/utils"
import { ShipDrawComponent } from './components/draw/draw'
import { ShipLocomotionComponent } from './components/locomotion/locomotion'
import { Vector2D } from '@/utils';
import { Node } from "@/node";

export class Ship extends Entity {

    private _locomotionComponent: ShipLocomotionComponent
    
    constructor(public readonly Factory: Fleet, node: Node) {
        super()
        this._locomotionComponent = new ShipLocomotionComponent()
        this._locomotionComponent.Node = node
    }

    public get Position(): Vector2D | null {
        return this._locomotionComponent.Position
    }

    public Awake(): void {
        this.AddComponent(new ShipDrawComponent())
        this.AddComponent(this._locomotionComponent)
        super.Awake()
    }
}