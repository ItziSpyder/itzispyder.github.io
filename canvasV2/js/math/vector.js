
import * as math from '../math/math.js'
import { Quaternion } from './quaternion.js'

export class Vector {

    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    mulVec(vec) {
        return this.mul(vec.x, vec.y, vec.z)
    }

    mul(x, y, z) {
        return new Vector(this.x * x, this.y * y, this.z * z)
    }

    addVec(vec) {
        return this.add(vec.x, vec.y, vec.z)
    }

    add(x, y, z) {
        return new Vector(this.x + x, this.y + y, this.z + z)
    }

    subVec(vec) {
        return this.sub(vec.x, vec.y, vec.z)
    }

    sub(x, y, z) {
        return new Vector(this.x - x, this.y - y, this.z - z)
    }

    length() {
        return math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z)
    }

    normalize() {
        var len = this.length()
        return new Vector(this.x / len, this.y / len, this.z / len)
    }

    toQuaternion() {
        return new Quaternion(0, this.x, this.y, this.z)
    }

    print() {
        console.log(this)
    }

    round() {
        var x = Math.floor(this.x)
        var y = Math.floor(this.y)
        var z = Math.floor(this.z)
        return new Vector(x, y, z)
    }

    lerp(vec, delta) {
        var x = math.lerp(this.x, vec.x, delta)
        var y = math.lerp(this.y, vec.y, delta)
        var z = math.lerp(this.z, vec.z, delta)
        return new Vector(x, y, z)
    } 
}