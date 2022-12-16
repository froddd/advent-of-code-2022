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

const part2 = input => {}

module.exports = {
    part1,
    part2
}
