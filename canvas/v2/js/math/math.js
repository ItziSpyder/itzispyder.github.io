
export const PI = 3.14159
export const PI_TWO = PI * 2
export const PI_HALF = PI / 2

export function toRadians(angleDeg) {
    return angleDeg * PI / 180
}

export function toDegrees(angleRad) {
    return angleRad * 180 / PI
}

export function clamp(a, minVal, maxVal) {
    return Math.max(minVal, Math.min(maxVal, a))
}

export function lerp(a, b, delta) {
    return a + (b - a) * clamp(delta)
}

export function sin(angle) {
    return Math.sin(angle)
}

export function cos(angle) {
    return Math.cos(angle)
}

export function tan(angle) {
    return Math.tan(angle)
}

export function cosFromSin(angle) {
    return this.sin(angle + PI_HALF)
}

export function sqrt(a) {
    return Math.sqrt(a)
}