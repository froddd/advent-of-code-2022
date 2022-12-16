
const getTrees = input => input.map(line => line.split('').map(x => Number(x)))

const part1 = input => {
    const trees = getTrees(input)
    let visible = 0

    for (let y = 0; y < trees.length; y++) {
        const line = trees[y]

        for (let x = 0; x < line.length; x++) {
            const column = trees.map(line => line[x])
            const height = line[x]
            const treesBeforeX = line.slice(0, x)
            const treesAfterX = line.slice(x + 1)
            const treesBeforeY = column.slice(0, y)
            const treesAfterY = column.slice(y + 1)

            if (x === 0 || x === trees[y].length // start or end of line
                || y === 0 || y === trees.length // start or end of column
                || height > Math.max(...treesBeforeX) // visible from left
                || height > Math.max(...treesAfterX) // visible from right
                || height > Math.max(...treesBeforeY) // visible from top
                || height > Math.max(...treesAfterY) // visible from bottom
            ) {
                visible += 1
            }
        }
    }

    return visible
}

const part2 = input => {
    const trees = getTrees(input)
    let scenicScores = []

    const directionScore = (visibleTrees, height) => {
        const index = visibleTrees.findIndex(x => x >= height)

        return index === -1 ? visibleTrees.length : index + 1
    }

    for (let y = 0; y < trees.length; y++) {
        const line = trees[y]

        for (let x = 0; x < line.length; x++) {
            const column = trees.map(line => line[x])
            const height = line[x]

            // Ignore start and end of lines as scenic score would be 0
            if (x !== 0 && x !== line.length -1 && y !== 0 && y !== trees.length -1){
                const treesBeforeX = line.slice(0, x)
                const treesAfterX = line.slice(x + 1)
                const treesBeforeY = column.slice(0, y)
                const treesAfterY = column.slice(y + 1)

                if (
                    height > Math.max(...treesBeforeX) // visible from left
                    || height > Math.max(...treesAfterX) // visible from right
                    || height > Math.max(...treesBeforeY) // visible from top
                    || height > Math.max(...treesAfterY) // visible from bottom
                ) {
                    const up = directionScore(treesBeforeY.reverse(), height)
                    const left = directionScore(treesBeforeX.reverse(), height)
                    const down = directionScore(treesAfterY, height)
                    const right = directionScore(treesAfterX, height)

                    if (![up, left, down, right].some(el => el === 0)) {
                        scenicScores.push(up * left * down * right)
                    }
                }
            }
        }
    }

    return Math.max(...scenicScores)
}

module.exports = {
    part1,
    part2
}
