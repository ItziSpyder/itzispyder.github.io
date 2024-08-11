const title = document.getElementById('categoryTitle')
const scriptsContainer = document.getElementById('scripts')
const formatter = new Compressor()

var currentCategory = updateCategory('crystal')
var currentScripts = []
var currentScriptDisplays = []

document.addEventListener('click', e => {
    if (e.target.getAttribute('id') == 'navButton') {
        updateCategory(e.target.innerText)
    }
})

function updateCategory(newCategory) {
    currentCategory = newCategory.toLowerCase()
    title.innerText = captialize(currentCategory) + ' Scripts'
    fetchCategory()
    return currentCategory
}

function fetchCategory() {
    fetch('./scripts/content/' + currentCategory + '.category')
    .then(res => res.text())
    .then(res => parseFile(formatter.decompress(res)))
}

async function parseFile(fileContents) {
    var scripts = fileContents.split(/^```/gm).filter(s => s != null && s.trim().length != 0)
    currentScripts = []
    currentScriptDisplays.forEach(s => scriptsContainer.removeChild(s))
    currentScriptDisplays = []
    
    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i]
        script = parseScript(script)
        currentScripts.push(script)
        
        code = `
        <p id="title">` + script.name + `</p>
        <p id="desc">` + script.desc + `</p>
        <textarea id="contents">` + script.contents + `</textarea>
        `

        console.log(code)

        var div = document.createElement('div')
        div.setAttribute('id', 'script')
        div.innerHTML = code
        scriptsContainer.appendChild(div)
        currentScriptDisplays.push(div)
    }
}

function parseHTMLlines(str) {
    str = formatter.decompress(str)
    code = ``

    var lines = str.split(/\n/gm).filter(s => s != null)
    for (var i = 0; i < lines.length; i++) {
        code += `<p style="margin: 0; padding: 0;">` + lines[i].replaceAll(' ', '&nbsp') + `</p>`
    }

    var div = document.createElement('p')
    div.setAttribute('id', 'contents')
    div.innerHTML = code
    return div
}

function parseScript(script) {
    var lines = script.split(/\n/gm).filter(s => s.match(/.*(def|module|desc).*/gm))
    var name = 'Unnamed Module'
    var desc = 'No description provided'
    var hasName = false
    var hasDesc = false

    for (var i = 0; i < lines.length; i++) {
        if (hasDesc && hasName) {
            break
        }
        var line = lines[i]

        if (line.match(/.*(def module|module create).*/gm) != null) {
            line = line.replaceAll(/.*(def module|module create)\s+/gm, '')
            line = captialize(line)
            name = line
            hasName = true
        }
        else if (line.match(/.*(def description|def desc|description|desc).*/gm) != null) {
            line = line.replaceAll(/.*(def description|def desc|description|desc)\s+/gm, '')
            line = line.replaceAll(/(^\")|(\"$)/gm, '')
            desc = line
            hasDesc = true
        }
    }
    return new Script(name, desc, script)
}

function captialize(str) {
    var words = str.split(/[ \\/+_,-]/gm)
    var result = ''
    for (var i = 0; i < words.length; i++) {
        var str = words[i]
        result += str.substring(0, 1).toUpperCase() + str.substring(1) + ' '
    }
    return result.trim()
}

class Script {
    name
    desc
    contents

    constructor(name, desc, contents) {
        this.name = name
        this.desc = desc
        this.contents = contents
    }

    canSearch(query) {
        return (this.name + this.desc + this.contents).toLowerCase().contains(query)
    }
}