
import * as math from '../math/math.js'
import { Vector } from './vector.js'

export class Quaternion {

    constructor(w, x, y, z) {
        this.w = w
        this.x = x
        this.y = y
        this.z = z
    }

    length() {
        return math.sqrt(this.w*this.w + this.x*this.x + this.y*this.y + this.z*this.z)
    }

    normalize() {
        var len = this.length()
        return new Quaternion(
            this.w / len,
            this.x / len,
            this.y / len,
            this.z / len,
        )
    }

    rotationX(angle) {
        angle *= 0.5
        var sin = math.sin(angle)
        var cos = math.cosFromSin(angle)
        return new Quaternion(cos, sin, 0, 0)
    }

    rotationY(angle) {
        angle *= 0.5
        var sin = math.sin(angle)
        var cos = math.cosFromSin(angle)
        return new Quaternion(cos, 0, sin, 0)
    }

    rotationZ(angle) {
        angle *= 0.5
        var sin = math.sin(angle)
        var cos = math.cosFromSin(angle)
        return new Quaternion(cos, 0, 0, sin)
    }

    inverse() {
        return new Quaternion(this.w, -this.x, -this.y, -this.z)
    }

    mul(quat) {
        var w1 = this.w
        var x1 = this.x
        var y1 = this.y
        var z1 = this.z
        var w2 = quat.w
        var x2 = quat.x
        var y2 = quat.y
        var z2 = quat.z

        return new Quaternion(
            w1*w2 - x1*x2 - y1*y2 - z1*z2,
            w1*x2 + x1*w2 + y1*z2 - z1*y2,
            w1*y2 - x1*z2 + y1*w2 + z1*x2,
            w1*z2 + x1*y2 - y1*x2 + z1*w2,
        )
    }

    transform(vec) {
        var qNor = this.normalize()
        var qVec = vec.toQuaternion()
        var qInv = qNor.inverse()
        return qNor.mul(qVec).mul(qInv).toVector()
    }

    toVector() {
        return new Vector(this.x, this.y, this.z)
    }

    print() {
        console.log(this)
    }
}