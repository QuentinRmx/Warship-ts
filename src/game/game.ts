import { Entity } from "@/utils"

export class Game extends Entity {
    
    private _lastTimestamp = 0


    constructor() {
        super()
        this.Update()
    }


    public Update(): void {
        const deltaTime = (Date.now() - this._lastTimestamp) / 1000

        super.Update(deltaTime)

        this._lastTimestamp = Date.now()

        window.requestAnimationFrame(() => this.Update())
    }
}