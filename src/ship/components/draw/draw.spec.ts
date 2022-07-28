import { ShipDrawComponent } from './draw'
import { mockShipFactory } from '@/ship'
import { CanvasLayer } from '@/canvas-layer'

describe('>>> Draw Ship Component', () => {
    let comp: ShipDrawComponent

    beforeEach(() => {
        comp = new ShipDrawComponent()
        comp.Entity = mockShipFactory()
    })


    it('should cleanup when awakens', () => {
        const spy = jest.spyOn(CanvasLayer.Foreground, 'ClearRect')
        expect(spy).not.toBeCalled()

        comp.Awake()
        expect(spy).toBeCalled()
    })

    it('should cleanup and draw a circle every frame', () => {
        const spyClear = jest.spyOn(CanvasLayer.Foreground, 'ClearRect')
        const spyFillCircle = jest.spyOn(CanvasLayer.Foreground, 'FillCircle')

        expect(spyClear).not.toBeCalled()
        expect(spyFillCircle).not.toBeCalled()

        comp.Update(0)

        expect(spyClear).toBeCalled()
        expect(spyFillCircle).toBeCalled()
    })

})