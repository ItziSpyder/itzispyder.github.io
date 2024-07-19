
import { Vector } from '../math/vector.js'
import * as Buffer from '../render/buffer.js'

export class Voxel {

    x = 0
    y = 0
    z = 0
    color = '#00000080'
    outline = false

    constructor(x, y, z) {
        this.x = Math.floor(x)
        this.y = Math.floor(y)
        this.z = Math.floor(z)
    }

    render(world, rotation, focalPoint, camera, vertexConsumer) {
        vertexConsumer.begin(Buffer.MODE_QUADS, 5)
        this.consumerVertices(world, vertexConsumer, this.color)
        vertexConsumer.draw(rotation, focalPoint, camera)

        if (this.outline) {
            vertexConsumer.begin(Buffer.MODE_QUAD_LINES, 5)
            this.consumerVertices(world, vertexConsumer, 'red')
            vertexConsumer.draw(rotation, focalPoint, camera)
        }
    }

    consumerVertices(world, vertexConsumer, color) {
        var i0 = this.x
        var j0 = this.y
        var k0 = this.z
        var i1 = this.x + 1
        var j1 = this.y + 1
        var k1 = this.z + 1

        var cullFaces = world.getCullFaces(i0, j0, k0)

        if (!cullFaces.bottom) {
            vertexConsumer.vertex(i0, j1, k0).color(color) // top
            vertexConsumer.vertex(i1, j1, k0).color(color)
            vertexConsumer.vertex(i1, j1, k1).color(color)
            vertexConsumer.vertex(i0, j1, k1).color(color)
        }

        if (!cullFaces.top) {
            vertexConsumer.vertex(i0, j0, k0).color(color) // bottom
            vertexConsumer.vertex(i1, j0, k0).color(color)
            vertexConsumer.vertex(i1, j0, k1).color(color)
            vertexConsumer.vertex(i0, j0, k1).color(color)
        }

        if (!cullFaces.north) {
            vertexConsumer.vertex(i0, j0, k1).color(color) // back
            vertexConsumer.vertex(i1, j0, k1).color(color)
            vertexConsumer.vertex(i1, j1, k1).color(color)
            vertexConsumer.vertex(i0, j1, k1).color(color)
        }

        if (!cullFaces.south) {
            vertexConsumer.vertex(i0, j0, k0).color(color) // front
            vertexConsumer.vertex(i1, j0, k0).color(color)
            vertexConsumer.vertex(i1, j1, k0).color(color)
            vertexConsumer.vertex(i0, j1, k0).color(color)
        }

        if (!cullFaces.east) {
            vertexConsumer.vertex(i1, j0, k0).color(color) // right
            vertexConsumer.vertex(i1, j1, k0).color(color)
            vertexConsumer.vertex(i1, j1, k1).color(color)
            vertexConsumer.vertex(i1, j0, k1).color(color)
        }

        if (!cullFaces.west) {
            vertexConsumer.vertex(i0, j0, k0).color(color) // left
            vertexConsumer.vertex(i0, j1, k0).color(color)
            vertexConsumer.vertex(i0, j1, k1).color(color)
            vertexConsumer.vertex(i0, j0, k1).color(color)
        }
    }

    center() {
        return new Vector(this.x + 0.5, this.y + 0.5, this.z + 0.5)
    }

    withColor(color) {
        this.color = color
        return this
    }

    withOutline(outline) {
        this.outline = outline
        return this
    }
}