
export function format(str, ...args) {
    for (var i = 0; i < args.length; i++) {
        str = str.replace('%s', args[i])
    }
    return str
}

export function print(str, ...args) {
    console.log(format(str, ...args))
}