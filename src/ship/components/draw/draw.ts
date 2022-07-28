import { Color, IComponent, Vector2D } from "@/utils"
import { Ship } from "@/ship/ship"
import { CanvasLayer } from '../../../canvas-layer/canvas-layer'
import { Team } from "@/team"
import { Settings } from '../../../settings/settings'

export class ShipDrawComponent implements IComponent {
    public Entity: Ship

    private get Position(): Vector2D {
        const position = this.Entity.Position
        if (!position) {
            throw new Error('Attempt to draw Ship that has no Position.')
        }

        return position
    }

    public Awake(): void {
        this.Clear()
    }

    public Update(deltaTime: number): void {
        this.Clear()
        this.Draw()
    }

    private Draw(): void {
        const radius = Settings.ships.radius
        const colors = Settings.ships.colors
        const color = this.Entity.Factory.Team === Team.A ? colors.a : colors.b
        CanvasLayer.Foreground.FillCircle(this.Position, radius, color)
    }

    private Clear(): void {
        CanvasLayer.Foreground.ClearRect(
            new Vector2D(
                this.Position.x - Settings.grid.nodeSize / 2,
                this.Position.y - Settings.grid.nodeSize / 2
            ),
            new Vector2D(Settings.grid.nodeSize, Settings.grid.nodeSize)
        )
    }
}