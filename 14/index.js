const getRocks = input => {
    const rocks = []

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

    return rocks
}

const getMinMax = rocks => {
    const x = rocks.map(rock => Number(rock.split(',')[0]))
    const y = rocks.map(rock => Number(rock.split(',')[1]))

    return [Math.min(...x), Math.max(...x), 0, Math.max(...y)]
}

const render = (rocks, sands, untilBlocked = false) => {
    let [minX, maxX, minY, maxY] = getMinMax(untilBlocked ? sands : rocks)

    if (untilBlocked) {
        minX -= 2
        maxX += 2
    }

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

    if (untilBlocked) {
        output += Array((maxX - minX) + 1).fill('#').join('')
    }

    console.log(output)
}

const part1 = input => {
    const rocks = getRocks(input)
    const sands = []
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

const part2 = input => {
    const rocks = getRocks(input)
    const sands = []
    const maxY = Math.max(...rocks.map(rock => Number(rock.split(',')[1]))) + 1

    let blocked = false
    let units = 0

    const isOccupied = coords => rocks.includes(coords.join(',')) || sands.includes(coords.join(','))

    // This takes a long while to complete... But it does /shrug
    // Uncomment stdout write to visualise ongoing progress
    while (blocked === false) {
        // New sand
        let settled = false
        let coords = [500, 0]

        // if (units % 1000 === 0) {
        //     console.log('\n')
        //     console.log(units)
        // }

        while (settled === false) {
            const down = [coords[0], coords[1] + 1]
            const downLeft = [coords[0] -1, coords[1] + 1]
            const downRight = [coords[0] +1, coords[1] + 1]

            if (coords[1] >= maxY) {
                // process.stdout.write('.')
                settled = true
            } else if (!isOccupied(down)) {
                // console.log('Down is free')
                coords = down
            } else if (!isOccupied(downLeft)) {
                // console.log('Down left is free')
                coords = downLeft
            } else if (!isOccupied(downRight)) {
                // console.log('Down right is free')
                coords = downRight
            } else {
                // process.stdout.write('o')
                settled = true
            }

            if (settled === true) {
                units += 1
                sands.push(coords.join(','))
            }

            if (isOccupied([500, 0])) {
                settled = true
                blocked = true
            }
        }
    }

    // render(rocks, sands, true)

    return units
}

module.exports = {
    part1,
    part2
}
