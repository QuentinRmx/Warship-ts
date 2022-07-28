import { NodeDrawComponent } from "./draw"
import { CanvasLayer } from "@/utils"
import { mockNodeFactory } from "@/node"
import { Node } from "@/node"
import { Vector2D } from "@/utils"

describe('>>> Node Draw Component', () => {
    let comp: NodeDrawComponent

    beforeEach(() => {
        comp = new NodeDrawComponent()
        comp.Entity = mockNodeFactory()
    })

    it('should clean up when awakens', () => {
        const spy = jest.spyOn(CanvasLayer.Background, 'ClearRect')
        expect(spy).not.toBeCalled()

        comp.Awake()
        expect(spy).toBeCalled()
    })

    it('should clean up and draw every frame', () => {
        const spyClear = jest.spyOn(CanvasLayer.Background, 'ClearRect')
        const spyDraw = jest.spyOn(CanvasLayer.Background, 'FillRect')

        expect(spyClear).not.toBeCalled()
        expect(spyDraw).not.toBeCalled()

        comp.Update(0)
        expect(spyClear).toBeCalled()
        expect(spyDraw).toBeCalled()
    })
})