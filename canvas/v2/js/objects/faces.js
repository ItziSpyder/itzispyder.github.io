
export class Faces {

    north = false
    south = false
    east = false
    west = false
    top = false
    bottom = false

    constructor(north, south, east, west, top, bottom) {
        this.north = north
        this.south = south
        this.east = east
        this.west = west
        this.top = top
        this.bottom = bottom
    }

    static createFalse() {
        return new Faces(false, false, false, false, false, false)
    }

    static createTrue() {
        return new Faces(true, true, true, true, true, true)
    }
}


