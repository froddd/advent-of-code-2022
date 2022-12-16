const part1 = input => {
    const trees = [];
    let visible = 0;

    input.forEach(line => trees.push(line.split('').map(x => Number(x))));

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
                visible += 1;
            }
        }
    }

    return visible;
}

const part2 = input => {
}

module.exports = {
    part1,
    part2
}
