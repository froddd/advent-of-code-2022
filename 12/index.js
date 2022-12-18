const getStart = (input, startLetter) => {
    const startLine = input.find(line => line.split('').find(char => char === startLetter))
    const startY = input.indexOf(startLine)
    const startX = startLine.indexOf(startLetter)

    return [startX, startY]
}

const renderPath = (path, map, startX, startY) => {
    let output = ``
    let grid = Array(map.length).fill('.').map(line => Array(map[0].length).fill('.'))
    path.reverse().unshift(`${startX},${startY}`);
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
    console.log(output)
}

const findPaths = (map, startLetter, endLetter) => {
    const [startX, startY] = getStart(map, startLetter)

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
            .filter(node => map[node.y] && map[node.y][node.x])
            // node is valid, i.e. at least one lower than current, or is the last node
            .filter(node => {
                let currentNodeLetter = map[currentNode.y][currentNode.x]
                if (currentNodeLetter === 'E') currentNodeLetter = 'z'
                let targetNodeLetter = map[node.y][node.x]
                if (targetNodeLetter === 'S') targetNodeLetter = 'a'

                return targetNodeLetter.charCodeAt(0) >= currentNodeLetter.charCodeAt(0) - 1
            })
            // Add existing path to keep track
            .map(node => ({...node, path: [...path, `${node.x},${node.y}`]}))
    }

    while (queue.length > 0) {
        const currentNode = queue.shift()

        if (!visited.includes(`${currentNode.x},${currentNode.y}`)) {
            if (map[currentNode.y][currentNode.x] === endLetter) {
                possiblePaths.push(currentNode.path)
            }

            const nextNodes = getNextNodes(currentNode, currentNode.path)

            if (nextNodes.length > 0) {
                queue.push(...nextNodes)
            }

            visited.push(`${currentNode.x},${currentNode.y}`)
        }
    }

    return possiblePaths
}

const part1 = input => {
    const possiblePaths = findPaths(input, 'E', 'S')

    const distance = possiblePaths[0].length

    const [startX, startY] = getStart(input, 'E')
    renderPath(possiblePaths[0], input, startX, startY)

    return distance
}

const part2 = input => {
    const possiblePaths = findPaths(input, 'E', 'a')

    const shortestPath = possiblePaths.sort((a,b) => a - b)[0]
    const distance = shortestPath.length

    const [startX, startY] = getStart(input, 'E')
    renderPath(shortestPath, input, startX, startY)

    return distance
}

module.exports = {
    part1,
    part2
}
