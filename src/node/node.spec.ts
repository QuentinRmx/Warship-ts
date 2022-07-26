import { Node } from "./node"
import { NodeDrawComponent } from './components/draw/draw'
import { Vector2D } from "@/utils"
import { mockNodeFactory } from './node.mock';


describe('>>> Node', () => {
    let node: Node
    const start = new Vector2D(1, 2)
    const end = new Vector2D(5, 6)

    beforeEach(() => {
        node = mockNodeFactory(start, end)
    })

    it('should calculate size', () => {
        expect(node.Size.x).toBe<number>(end.x - start.x)
        expect(node.Size.y).toBe<number>(end.y - start.y)
    })

    it('should calculate center point', () => {
        expect(node.Center.x).toBe<Number>(start.x + node.Size.x / 2)
        expect(node.Center.y).toBe<Number>(start.y + node.Size.y / 2)
    })

    it('should awake and update all Components', () => {
        const spyDrawCompAwake = jest.spyOn(NodeDrawComponent.prototype, 'Awake')
        const spyDrawCompUpdate = jest.spyOn(NodeDrawComponent.prototype, 'Update')

        expect(spyDrawCompAwake).not.toBeCalled()
        expect(spyDrawCompUpdate).not.toBeCalled()

        node.Awake()
        expect(spyDrawCompAwake).toBeCalled()

        node.Update(0)
        expect(spyDrawCompUpdate).toBeCalled()
    })
})