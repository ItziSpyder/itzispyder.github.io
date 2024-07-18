import { Voxel } from "./voxel.js"
import { Vector } from "../math/vector.js"

export class World {

    voxels = []
    camera = null
    frames = []
    frame = 0

    constructor(camera) {
        this.camera = camera
        this.generate()

        for (var i = 0; i < 60; i++) {
            this.frames.push(0)
        }
    }

    generate() {
        var cam = this.camera
        for (var x = -10; x < 10; x++) {
            for (var z = -10; z < 10; z++) {
                this.voxels.push(new Voxel(cam.x + x, cam.y, cam.z + z))
            }
        }
        this.voxels.push(new Voxel(cam.x - 1, cam.y - 1, cam.z + 5))
        this.voxels.push(new Voxel(cam.x + 0, cam.y - 1, cam.z + 5))
        this.voxels.push(new Voxel(cam.x + 1, cam.y - 1, cam.z + 5))
        this.voxels.push(new Voxel(cam.x + 0, cam.y - 2, cam.z + 5))
        this.voxels.push(new Voxel(cam.x + 0, cam.y - 3, cam.z + 5))
        this.voxels.push(new Voxel(cam.x + 0, cam.y - 4, cam.z + 5))
    }

    render(rotation, focalPoint, camera, buf) {
        for (var i = 0; i < this.voxels.length; i++) {
            var voxel = this.voxels[i]
            voxel.render(rotation, focalPoint, camera, buf)
        }
    }

    renderHud(context, focalPoint, camera, pitch, yaw) {
        // fps
        this.frames[this.frame++ % this.frames.length] = Date.now()

        // text hud
        context.beginPath()
        context.font = '30px serif'
        context.fillStyle = 'white'
        context.fillText('The Canvas Game', 10, 30)

        camera = camera.round()
        var rot = new Vector(pitch, yaw, 0).round()
        context.font = '20px serif'
        context.fillText('Pos [' + camera.x + ', ' + camera.y + ', ' + camera.z + ']', 10, 50)
        context.fillText('Rot [' + rot.x + ', ' + rot.y + ']', 10, 70)
        context.fillText('FPS [' + this.getFps() + ']', 10, 90)

        // crosshair 
        context.beginPath()
        var cx = focalPoint.x
        var cy = focalPoint.y
        context.strokeStyle = 'white'
        context.moveTo(cx - 20, cy)
        context.lineTo(cx + 20, cy)
        context.moveTo(cx, cy - 20)
        context.lineTo(cx, cy + 20)
        context.stroke()
    }

    getFps() {
        var samples = 10
        var end = Date.now()
        var start = this.frames[(this.frame - samples) % this.frames.length]
        var elapsed = (end - start) / samples
        var fps = 1000 / elapsed
        return Math.floor(fps * 10) / 10
    }

    clear() {
        voxels.splice(0, voxels.length)
    }
}


