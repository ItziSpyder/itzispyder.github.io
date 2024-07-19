
import { Quaternion } from './math/quaternion.js'
import { Vector } from './math/vector.js'
import * as Buffer from './render/buffer.js'
import * as math from './math/math.js'
import { World } from './objects/world.js'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const view = [window.innerWidth, window.innerHeight]

// init

console.log(view)
canvas.width = view[0]
canvas.height = view[1]

// vars

var focalPoint = new Vector(view[0] / 2, view[1] / 2, 0.01)
var rotation = new Quaternion(1, 0, 0, 0)
var clientRotation = new Quaternion(1, 0, 0, 0)
var camera = new Vector(0, 10, 0)
var height = 2
var world = new World(camera, 100) // world and world size

export var prevCursor = [null, null]
export var prevRotation = [0, 0]

var keyLeft = false
var keyRight = false
var keyForward = false
var keyBackward = false
var keyJump = false
var cursorLock = true

// render

var buf = new Buffer.Builder(view, context)
setInterval(renderFrame, 1000 / 70)

function renderFrame() {
    buf.clear()
    world.render(rotation, clientRotation, focalPoint, camera, buf)
    world.renderHud(context, focalPoint, camera, prevRotation[0], prevRotation[1])
    renderTick()
}

function renderTick() {
    updatePosition()
}

function updateRotation() {
    var quatZero = new Quaternion(1, 0, 0, 0)
    var quatPitch = quatZero.rotationX(math.toRadians(prevRotation[0]))
    var quatYaw = quatZero.rotationY(math.toRadians(prevRotation[1]))
    rotation = quatPitch.mul(quatYaw)

    quatPitch = quatZero.rotationX(math.toRadians(-prevRotation[0]))
    quatYaw = quatZero.rotationY(math.toRadians(-prevRotation[1]))
    clientRotation = quatYaw.mul(quatPitch)
}

function updatePosition() {
    var yaw = prevRotation[1]
    var dir = new Vector(0, 0, 0)
    var horizontal = false

    if (keyLeft) {
        dir = dir.add(1, 0, 0)
        horizontal = true
    }
    if (keyRight) {
        dir = dir.add(-1, 0, 0)
        horizontal = true
    }
    if (keyForward) {
        dir = dir.add(0, 0, -1)
        horizontal = true
    }
    if (keyBackward) {
        dir = dir.add(0, 0, 1)
        horizontal = true
    }

    var standingOn = camera.add(0, -height - 0.01, 0).round()

    if (keyJump) {
        dir = dir.add(0, 2, 0)
    }
    else if (world.getVoxel(standingOn.x, standingOn.y, standingOn.z) == null) {
        dir = dir.add(0, -1, 0)
    }

    var quatYaw = new Quaternion(1, 0, 0, 0).rotationY(math.toRadians(-yaw))
    dir = quatYaw.transform(dir.mul(0.25, 0.25, 0.25))
    var destVec = camera.addVec(new Vector(dir.x, dir.y, dir.z))
    var check = destVec.round()
    var collision = world.getVoxel(check.x, check.y, check.z) == null && world.getVoxel(check.x, check.y - 1, check.z) == null && world.getVoxel(check.x, check.y - 2, check.z) == null

    if (!horizontal || collision) {
        camera = destVec
    }
}

function updateMouse(e) {
    if (prevCursor[0] == null || prevCursor[1] == null) {
        prevCursor[0] = e.clientX
        prevCursor[1] = e.clientY
    }

    var deltaX = e.clientX - prevCursor[0]
    var deltaY = e.clientY - prevCursor[1]
    prevCursor[0] = e.clientX
    prevCursor[1] = e.clientY
    prevRotation[0] = math.clamp(prevRotation[0] + deltaY, -90, 90)
    prevRotation[1] += -deltaX
    updateRotation()
}

document.body.addEventListener('mousedown', e => {
    if (world.crosshair == null) {
        return
    }
    var target = world.crosshair

    console.log(target)

    switch (e.buttons) {
        case 1:
            world.removeVoxel(target.hit.x, target.hit.y, target.hit.z)
            break
        case 2:
            world.addVoxel(target.face.x, target.face.y, target.face.z)
            break
    }
})
document.body.addEventListener('contextmenu', e => {
    e.preventDefault()
})
document.body.addEventListener('mousemove', updateMouse)
document.body.addEventListener('keypress', e => {
    // console.log(e)
    switch (e.key) {
        case 'w':
            keyForward = true
            break
        case 'a':
            keyLeft = true
            break
        case 's':
            keyBackward = true
            break
        case 'd':
            keyRight = true
            break
        case ' ':
            keyJump = true
            break
        case 'q':
            cursorLock = !cursorLock
            break
    }
})
document.body.addEventListener('keyup', e => {
    // console.log('release: ' + e.key)
    switch (e.key) {
        case 'w':
            keyForward = false
            break
        case 'a':
            keyLeft = false
            break
        case 's':
            keyBackward = false
            break
        case 'd':
            keyRight = false
            break
        case ' ':
            keyJump = false
            break
    }
})

