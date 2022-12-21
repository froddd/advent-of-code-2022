const getMinMax = rocks => {
    const x = rocks.map(rock => Number(rock.split(',')[0]))
    const y = rocks.map(rock => Number(rock.split(',')[1]))

    return [Math.min(...x), Math.max(...x), 0, Math.max(...y)]
}

const render = (rocks, sands) => {
    const [minX, maxX, minY, maxY] = getMinMax(rocks)

    let output = ''

    for (let i = minY; i <= maxY; i++) {
        for (let j = minX; j <= maxX; j++) {
            const coords = `${j},${i}`
            if (rocks.includes(coords)) {
                output += '#'
            } else if (sands.includes(coords)) {
                output += 'o'
            } else {
                output += '.'
            }
        }
        output += '\n'
    }

    console.log(output)
}

const part1 = input => {
    // draw the lines
    const rocks = []
    const sands = []

    input.forEach(line => {
        const ends = line.split('->').map(coords => coords.split(',').map(coord => Number(coord)))
        let current = ends.shift()
        rocks.push(current.join(','))

        ends.forEach(coords => {
            const dimension = current[0] === coords[0] ? 1 : 0
            const direction = current[dimension] - coords[dimension] < 0 ? 1 : -1

            while (current[dimension] !== coords[dimension]) {
                current[dimension] += direction
                rocks.push(current.join(','))
            }
        })
    })

    const [minX, maxX, minY, maxY] = getMinMax(rocks)

    let overflow = false
    let units = 0

    const isOccupied = coords => rocks.includes(coords.join(',')) || sands.includes(coords.join(','))

    while (overflow === false) {
        // New sand
        let settled = false
        let coords = [500, 0]

        while (settled === false) {
            const down = [coords[0], coords[1] + 1]
            if (isOccupied(down)) {
                const downLeft = [coords[0] -1, coords[1] + 1]
                if (isOccupied(downLeft)) {
                    const downRight = [coords[0] +1, coords[1] + 1]
                    if (isOccupied(downRight)) {
                        settled = true
                        units += 1
                        sands.push(coords.join(','))
                    } else {
                        coords = downRight
                    }
                } else {
                    coords = downLeft
                }
            } else {
                coords = down
            }

            if (coords[0] < minX || coords[0] > maxX || coords[1] < minY || coords[1] > maxY) {
                settled = true
                overflow = true
            }
        }
    }

    render(rocks, sands)

    return units
}

const part2 = input => {}

module.exports = {
    part1,
    part2
}
