const moveRopeParts = (head, tail) => {
    if (Math.abs(head[0] - tail[0]) > 1 && Math.abs(head[1] - tail[1]) > 1) {
        // If head has moved diagonally...
        if (head[0] > tail[0]) {
            tail[0] += 1
        } else {
            tail[0] -= 1
        }
        if (head[1] > tail[1]) {
            tail[1] += 1
        } else {
            tail[1] -= 1
        }
    } else if (Math.abs(head[0] - tail[0]) > 1) {
        if (head[0] > tail[0]) {
            tail[0] += 1
        } else {
            tail[0] -= 1
        }
        if (head[1] !== tail[1]) {
            tail[1] = head[1]
        }
    } else if (Math.abs(head[1] - tail[1]) > 1) {
        if (head[1] > tail[1]) {
            tail[1] += 1
        } else {
            tail[1] -= 1
        }
        if (head[0] !== tail[0]) {
            tail[0] = head[0]
        }
    }
}

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

            moveRopeParts(head, tail)

            const tailCoords = `${tail[0]},${tail[1]}`

            if (!visited.includes(tailCoords)) {
                visited.push(tailCoords)
            }
        }
    })

    return visited.length
}

const part2 = input => {
    const visited = []
    const rope = Array(10).fill([]).map(x => [0,0])

    input.forEach(line => {
        const [direction, distance] = line.split(' ')

        for (let i = 0; i < parseInt(distance); i++) {
            if (direction === 'U') {
                rope[0][1] += 1
            } else if (direction === 'D') {
                rope[0][1] -= 1
            } else if (direction === 'L') {
                rope[0][0] -= 1
            } else if (direction === 'R') {
                rope[0][0] += 1
            }

            for (let j = 0; j < rope.length - 1; j++) {
                const head = rope[j]
                const tail = rope[j+1]

                moveRopeParts(head, tail)
            }

            const tailCoords = `${rope[9][0]},${rope[9][1]}`

            if (!visited.includes(tailCoords)) {
                visited.push(tailCoords)
            }
        }


    })

    return visited.length
}

module.exports = {
    part1,
    part2
}
