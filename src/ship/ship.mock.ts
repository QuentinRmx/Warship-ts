import { Ship } from '@/ship'
import { mockFleetFactory } from '@/fleet'
import { mockNodeFactory } from '../node/node.mock'

export const mockShipFactory = (
    fleet = mockFleetFactory(),
    node = mockNodeFactory()
): Ship => new Ship(fleet, node)