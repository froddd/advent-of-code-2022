const part1 = input => {
    const visited = []
    const head = [0,0]
    const tail = [0,0]

    input.forEach(line => {
        const [direction, distance] = line.split(' ')

        for (let i = 0; i < parseInt(distance); i++) {
            if (direction === 'U') {
                head[1] += 1
            } else if (direction === 'D') {
                head[1] -= 1
            } else if (direction === 'L') {
                head[0] -= 1
            } else if (direction === 'R') {
                head[0] += 1
            }

            if (Math.abs(head[0] - tail[0]) > 1) {
                if (head[0] > tail[0]) {
                    tail[0] += 1
                } else {
                    tail[0] -= 1
                }
                if (head[1] !== tail[1]) {
                    tail[1] = head[1]
                }
            }
            if (Math.abs(head[1] - tail[1]) > 1) {
                if (head[1] > tail[1]) {
                    tail[1] += 1
                } else {
                    tail[1] -= 1
                }
                if (head[0] !== tail[0]) {
                    tail[0] = head[0]
                }
            }

            const tailCoords = `${tail[0]},${tail[1]}`

            if (!visited.includes(tailCoords)) {
                visited.push(tailCoords)
            }
        }
    })

    return visited.length
}

const part2 = input => {}

module.exports = {
    part1,
    part2
}
