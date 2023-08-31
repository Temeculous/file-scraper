const fs = require("fs");

function doThing() {
    //E:\Dropbox\Art\Testing
    const startDir = 'E:/Dropbox/Art/Sonas'

    readFolder(startDir)
}

function readFolder(parentPath) {
    let dir = fs.readdirSync(parentPath)

    let folders = []
    for (let item of dir) {
        let info = fs.statSync(`${parentPath}/${item}`)
        if (info.isDirectory())
            folders.push(`${parentPath}/${item}`)
    }

    let parent = parentPath.split('/')
    if (folders.length > 0) {
        // Need to go deeper
        let fileCount = 0
        for (let folder of folders) {
            fileCount += readFolder(folder)
        }
        if ((parent[parent.length - 1] === "Commissions" || parent[parent.length - 1] === "NSFW") && fileCount > 0) {
            console.log(`${parentPath}: ${fileCount}`)
            return 0
        } else {
            return fileCount
        }
    } else {
        // Found the end
        let files = []
        if (parent[parent.length - 1] === "Not Posted") {
            for (let item of dir) {
                let info = fs.statSync(`${parentPath}/${item}`)
                if (info.isFile())
                    files.push(`${parentPath}/${item}`)
            }
        }
        return files.length
    }
}

doThing()