const getStacks = input => {
    const crates = input.filter(line => line.match(/\[[A-Z]]/));
    const numStacks = input.find(line => line.match(/^(\d|\s)*$/)).trim().split(/\s+/).length;

    const stacks = [];
    crates.reverse().forEach(line => {
        for (let i=0; i < numStacks; i++) {
            if (!stacks[i]) stacks[i] = [];
            const crate = line.substring(i*4, (i*4)+3).replace(/[^A-Z]/g, '');
            if (crate) {
                stacks[i].push(crate);
            }
        }
    });

    return stacks;
}

const getMoves = input => input.filter(line => line.startsWith('move')).map(line => line.match(/move (\d+) from (\d+) to (\d+)/).slice(1,4).map(x => parseInt(x)));

const part1 = input => {
    const stacks = getStacks(input);
    const moves = getMoves(input);

    moves.forEach(move => {
        const [quantity, source, destination] = move;
        for (let i = 1; i <= quantity; i++) {
            const crateToMove = stacks[source-1].pop();
            stacks[destination-1].push(crateToMove);
        }
    })

    return stacks.map(stack => stack.pop()).join('');
}

const part2 = input => {
    const stacks = getStacks(input);
    const moves = getMoves(input);

    moves.forEach(move => {
        const [quantity, source, destination] = move;
        const cratesToMove = stacks[source-1].splice(-quantity, quantity);
        stacks[destination-1].push(...cratesToMove);
    })

    return stacks.map(stack => stack.pop()).join('');
}

module.exports = {
    part1,
    part2
}
