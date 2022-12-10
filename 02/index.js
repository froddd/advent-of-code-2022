const gameTotal = (input, moves) => {
    let points = 0;

    input.forEach(line => {
        const [opponentMove, myMove] = line.split(' ');
        points += moves[opponentMove][myMove];
    })

    return points;
}

const part1 = (input) => {
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
    return gameTotal(input, moves)
}

const part2 = (input) => {
    const moves = {
        A: {
            X: 3 + 0,
            Y: 1 + 3,
            Z: 2 + 6
        },
        B: {
            X: 1 + 0,
            Y: 2 + 3,
            Z: 3 + 6
        },
        C: {
            X: 2 + 0,
            Y: 3 + 3,
            Z: 1 + 6
        }
    }
    return gameTotal(input, moves);
}

module.exports = {
    part1,
    part2
}
