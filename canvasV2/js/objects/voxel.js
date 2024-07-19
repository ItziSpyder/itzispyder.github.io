
import * as Buffer from '../render/buffer.js'

export class Voxel {

    x = 0
    y = 0
    z = 0

    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    render(world, rotation, focalPoint, camera, vertexConsumer) {
        vertexConsumer.begin(Buffer.MODE_QUADS, 5)
        this.consumerVertices(world, vertexConsumer)
        vertexConsumer.draw(rotation, focalPoint, camera)
    }

    consumerVertices(world, vertexConsumer) {
        var i0 = this.x
        var j0 = this.y
        var k0 = this.z
        var i1 = this.x + 1
        var j1 = this.y + 1
        var k1 = this.z + 1

        var cullFaces = world.getCullFaces(i0, j0, k0)

        if (!cullFaces.bottom) {
            vertexConsumer.vertex(i0, j1, k0)//.color('#00ff0040') // top
            vertexConsumer.vertex(i1, j1, k0)//.color('#00ff0040')
            vertexConsumer.vertex(i1, j1, k1)//.color('#00ff0040')
            vertexConsumer.vertex(i0, j1, k1)//.color('#00ff0040')
        }

        if (!cullFaces.top) {
            vertexConsumer.vertex(i0, j0, k0)//.color('#ff000040') // bottom
            vertexConsumer.vertex(i1, j0, k0)//.color('#ff000040')
            vertexConsumer.vertex(i1, j0, k1)//.color('#ff000040')
            vertexConsumer.vertex(i0, j0, k1)//.color('#ff000040')
        }

        if (!cullFaces.north) {
            vertexConsumer.vertex(i0, j0, k1)//.color('#ffffff40') // back
            vertexConsumer.vertex(i1, j0, k1)//.color('#ffffff40')
            vertexConsumer.vertex(i1, j1, k1)//.color('#ffffff40')
            vertexConsumer.vertex(i0, j1, k1)//.color('#ffffff40')
        }

        if (!cullFaces.south) {
            vertexConsumer.vertex(i0, j0, k0)//.color('#0000ff40') // front
            vertexConsumer.vertex(i1, j0, k0)//.color('#0000ff40')
            vertexConsumer.vertex(i1, j1, k0)//.color('#0000ff40')
            vertexConsumer.vertex(i0, j1, k0)//.color('#0000ff40')
        }

        if (!cullFaces.east) {
            vertexConsumer.vertex(i1, j0, k0)//.color('#ff00ff40') // right
            vertexConsumer.vertex(i1, j1, k0)//.color('#ff00ff40')
            vertexConsumer.vertex(i1, j1, k1)//.color('#ff00ff40')
            vertexConsumer.vertex(i1, j0, k1)//.color('#ff00ff40')
        }

        if (!cullFaces.west) {
            vertexConsumer.vertex(i0, j0, k0)//.color('#00000040') // left
            vertexConsumer.vertex(i0, j1, k0)//.color('#00000040')
            vertexConsumer.vertex(i0, j1, k1)//.color('#00000040')
            vertexConsumer.vertex(i0, j0, k1)//.color('#00000040')
        }
    }
}