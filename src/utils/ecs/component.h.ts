import { Entity } from "./entity"
import { IUpdate, IAwake } from '../lifecycle'


export interface IComponent extends IAwake, IUpdate{
    Entity: Entity | null
}