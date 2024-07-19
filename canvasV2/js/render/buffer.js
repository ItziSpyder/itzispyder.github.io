
import { Vector } from '../math/vector.js'
import * as math from '../math/math.js'

export const MODE_LINES = 0
export const MODE_QUADS = 1
export const MODE_QUAD_LINES = 2

export class Builder {

    mode = MODE_LINES
    buffer = []
    scale = 1

    constructor(view, drawContext) {
        this.context = drawContext
        this.view = view
        this.scale = 1
    }

    clear() {
        this.context.clearRect(0, 0, this.view[0], this.view[1])
        return this
    }

    draw(quaternion, focalPoint, camera) {
        var min, step
        
        switch (this.mode) {
            case MODE_LINES: 
                min = 2
                step = 2
                break
            case MODE_QUADS:
                min = 4
                step = 4
                break
            case MODE_QUAD_LINES:
                min = 4
                step = 4
                break
            default:
                throw new Error("draw mode is unspecified! (" + this.mode + ")")
        }

        if (this.buffer.length < min) {
            throw new Error("buffer is empty")
        }

        var stepCount = 0
        this.context.beginPath()
        for (var i = 0; i < this.buffer.length; i++) {
            var vertex = this.buffer[i].project(quaternion, focalPoint, camera)

            if (stepCount >= step) {
                this.context.beginPath() // reset
                stepCount = 0
            }

            if (stepCount == 0) {
                this.context.moveTo(vertex.x, vertex.y)
                // console.log('move');
                // console.log(vertex);
            }
            else {
                this.context.lineTo(vertex.x, vertex.y)
                // console.log('line');
                // console.log(vertex);
            }
            
            if (stepCount == step - 1) {
                this.context.fillStyle = vertex.color
                this.context.strokeStyle = vertex.color
                switch (this.mode) {
                    case MODE_LINES:
                        this.context.stroke()
                        break
                    case MODE_QUADS:
                        this.context.fill()
                        break
                    case MODE_QUAD_LINES:
                        this.context.stroke()
                        break
                }
            }

            stepCount++
        }
    }

    begin(mode, scale) {
        this.mode = mode
        this.buffer.splice(0, this.buffer.length)
        this.scale = scale
        return this
    }

    vertex(x, y, z) {
        this.buffer.push(new Vertex(x, y, z, this.scale, '#00000080'))
        return this
    }

    color(color) {
        this.peek().color = color
        return this
    }

    peek() {
        return this.buffer[this.buffer.length - 1]
    }
}

class Vertex {

    x = 0
    y = 0
    z = 0
    scale = 1
    color = 'white'

    constructor(x, y, z, scale, color) {
        this.x = x * scale
        this.y = y * scale
        this.z = z * scale
        this.scale = scale
        this.color = color
    }

    project(quaternion, focalPoint, camera) {
        camera = camera.mul(this.scale, this.scale, this.scale)
        var vector = new Vector(-this.x, -this.y, -this.z).addVec(camera)
        vector = quaternion.transform(vector)

        var focal = focalPoint.z
        var depth = (focal + vector.z) * 0.00025

        if (depth <= 0) {
            depth = 0.00000000000000000000001
        }

        var x = (focal * vector.x / depth) + focalPoint.x / this.scale
        var y = (focal * vector.y / depth) + focalPoint.y / this.scale
        return new Vertex(x, y, 0, this.scale, this.color)
    }
}

