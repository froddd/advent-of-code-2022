const part1 = input => {
    const startLine = input.find(line => line.split('').find(char => char === 'S'))
    const startY = input.indexOf(startLine)
    const startX = startLine.indexOf('S')

    const startNode = { x: startX, y: startY, path: [] }

    let queue = [startNode]
    const visited = []
    const possiblePaths = []

    const getNextNodes = (currentNode, path) => {
        const u = { x: currentNode.x, y: currentNode.y - 1 }
        const l = { x: currentNode.x - 1, y: currentNode.y }
        const d = { x: currentNode.x, y: currentNode.y + 1 }
        const r = { x: currentNode.x + 1, y: currentNode.y }

        return [u, l, d, r]
            // node exists in map
            .filter(node => input[node.y] && input[node.y][node.x])
            // node is valid, i.e. at most one higher than current, or is the last node
            .filter(node => {
                let currentNodeLetter = input[currentNode.y][currentNode.x]
                if (currentNodeLetter === 'S') currentNodeLetter = 'a'
                let targetNodeLetter = input[node.y][node.x]
                if (targetNodeLetter === 'E') targetNodeLetter = 'z'

                return targetNodeLetter.charCodeAt(0) <= currentNodeLetter.charCodeAt(0) + 1
            })
            // Add existing path to keep track
            .map(node => ({...node, path: [...path, `${node.x},${node.y}`]}))
    }

    while (queue.length > 0) {
        const currentNode = queue.shift()

        if (!visited.includes(`${currentNode.x},${currentNode.y}`)) {
            if (input[currentNode.y][currentNode.x] === 'E') {
                possiblePaths.push(currentNode.path)
            }

            const nextNodes = getNextNodes(currentNode, currentNode.path)

            if (nextNodes.length > 0) {
                queue.push(...nextNodes)
            }

            visited.push(`${currentNode.x},${currentNode.y}`)
        }
    }

    const shortestLength = possiblePaths[0].length

    const renderPath = () => {
        possiblePaths.forEach((path, index) => {
            let output = `== PATH ${index + 1} (${path.length}) ==\n`
            let grid = Array(input.length).fill('.').map(line => Array(startLine.length).fill('.'))
            path.unshift(`${startX},${startY}`);
            path.forEach((step, index) => {
                const [x, y] = step.split(',')
                if (path[index+1]) {
                    const [nextX, nextY] =  path[index+1].split(',').map(x => Number(x))
                    let direction = '?'
                    if (nextX > x) direction = '>'
                    if (nextX < x) direction = '<'
                    if (nextY > y) direction = 'V'
                    if (nextY < y) direction = '^'
                    grid[y][x] = direction
                } else {
                    grid[y][x] = 'E'
                }
            })

            output += grid.map(line => line.join('')).join('\n')
            console.log(output);
        })
    }

    renderPath()

    return shortestLength
}

const part2 = input => {}

module.exports = {
    part1,
    part2
}
