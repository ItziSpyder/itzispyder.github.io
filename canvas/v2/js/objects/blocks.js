import { Voxel } from "./voxel.js";

export var BEDROCK = tessellate('#00000080', false)
export var GRASS = tessellate('#ff000080', true)

function tessellate(color, outline) {
    return (x, y, z) => new Voxel(x, y, z).withColor(color).withOutline(outline)
}

