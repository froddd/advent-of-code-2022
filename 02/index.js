const gameTotal = (input) => {
    let points = 0;
    const moves = {
        A: {
            X: 1 + 3,
            Y: 2 + 6,
            Z: 3 + 0
        },
        B: {
            X: 1 + 0,
            Y: 2 + 3,
            Z: 3 + 6
        },
        C: {
            X: 1 + 6,
            Y: 2 + 0,
            Z: 3 + 3
        }
    }

    input.forEach(line => {
        const [opponentMove, myMove] = line.split(' ');
        points += moves[opponentMove][myMove];
    })

    return points;
}

module.exports = {
    part1: gameTotal
}
