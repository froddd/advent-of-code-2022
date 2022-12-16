const part1 = input => {
    let cycle = 0
    let X = 1
    let signalStrength = 0

    const addSignalStrength = cycle => {
        if ((cycle - 20) % 40 === 0) {
            signalStrength += X * cycle
        }
    }

    input.forEach(line => {
        cycle += 1
        addSignalStrength(cycle)

        if (!line.startsWith('noop')) {
            cycle += 1
            addSignalStrength(cycle)
            X += Number(line.split(' ')[1])
        }
    })

    return signalStrength
}

const part2 = input => {
    let cycle = 0
    let spritePosition = 0
    let output = ''

    const drawPixel = () => {
        const currentPixel = cycle % 40

        if (currentPixel > spritePosition && currentPixel < spritePosition + 4) {
            output += '##'
        } else {
            output += '  '
        }
        if (cycle % 40 === 0) {
            output += '\n'
        }
    }

    input.forEach(line => {
        cycle += 1
        drawPixel()

        if (!line.startsWith('noop')) {
            cycle += 1
            drawPixel()
            spritePosition += Number(line.split(' ')[1])
        }
    })

    return output
}

module.exports = {
    part1,
    part2
}
