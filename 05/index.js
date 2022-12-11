const part1 = input => {
    const crates = input.filter(line => line.match(/\[[A-Z]]/));
    const numStacks = input.find(line => line.match(/^(\d|\s)*$/)).trim().split(/\s+/).length;
    const moves = input.filter(line => line.startsWith('move'));

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

    moves.forEach(line => {
        const [quantity, source, destination] = line.match(/move (\d+) from (\d+) to (\d+)/).slice(1,4).map(x => parseInt(x));
        for (let i = 1; i <= quantity; i++) {
            const crateToMove = stacks[source-1].pop();
            stacks[destination-1].push(crateToMove);
        }
    })

    return stacks.map(stack => stack.pop()).join('');
}

const part2 = input => {}

module.exports = {
    part1,
    part2
}
