const getFirstDistinct = (input, numDistinct) => {
    const signal = input[0];

    let index = numDistinct;

    while(index <= signal.length) {
        if ([...new Set(signal.slice(index - numDistinct, index))].length === numDistinct) {
            break;
        }
        index++;
    }

    return index;
}

const part1 = input => getFirstDistinct(input, 4)

const part2 = input => getFirstDistinct(input, 14)

module.exports = {
    part1,
    part2
}
