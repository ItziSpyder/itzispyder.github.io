
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

var focalPoint = new Vector(view[0] / 2, view[1] / 2, 20)
var rotation = new Quaternion(1, 0, 0, 0)
var camera = new Vector(0, 2, 0)
var world = new World(camera)

export var prevCursor = [null, null]
export var prevRotation = [0, 0]

var keyLeft = false
var keyRight = false
var keyForward = false
var keyBackward = false
var keyJump = false

// render

var buf = new Buffer.Builder(view, context)

setInterval(renderFrame, 1000 / 120)
setInterval(renderTick, 1000 / 50)

function renderFrame() {
    buf.clear()
    world.render(rotation, focalPoint, camera, buf)
    world.renderHud(context, focalPoint, camera, prevRotation[0], prevRotation[1])
}

function renderTick() {
    updatePosition()
}

function updateRotation() {
    var quatZero = new Quaternion(1, 0, 0, 0)
    var quatPitch = quatZero.rotationX(math.toRadians(prevRotation[0]))
    var quatYaw = quatZero.rotationY(math.toRadians(prevRotation[1]))
    rotation = quatPitch.mul(quatYaw)
}

function updatePosition() {
    var yaw = prevRotation[1]
    var dir = new Vector(0, 0, 0)

    if (keyLeft) {
        dir = dir.add(1, 0, 0)
    }
    if (keyRight) {
        dir = dir.add(-1, 0, 0)
    }
    if (keyForward) {
        dir = dir.add(0, 0, -1)
    }
    if (keyBackward) {
        dir = dir.add(0, 0, 1)
    }
    if (keyJump) {
        if (camera.y <= 6) {
            dir = dir.add(0, 2, 0)
        }
        else {
            keyJump = false
        }
    }
    else if (camera.y > 2) {
        dir = dir.add(0, -1, 0)
    }

    var quatYaw = new Quaternion(1, 0, 0, 0).rotationY(math.toRadians(-yaw))
    dir = quatYaw.transform(dir)
    camera = camera.addVec(new Vector(dir.x, dir.y, dir.z))
}

document.body.addEventListener('mousemove', e => {
    if (prevCursor[0] == null || prevCursor[1] == null) {
        prevCursor[0] = e.clientX
        prevCursor[1] = e.clientY
    }

    var deltaX = e.clientX - prevCursor[0]
    var deltaY = e.clientY - prevCursor[1]
    prevCursor[0] = e.clientX
    prevCursor[1] = e.clientY
    prevRotation[0] = math.clamp(prevRotation[0] + deltaY * 0.5, -90, 90)
    prevRotation[1] += -deltaX * 0.5
    updateRotation()
})
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

