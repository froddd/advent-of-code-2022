const logDepth = (message, depth = 0) => {} //console.log(`${Array(depth).fill('  ').join('')}- ${message}`)

const compare = (left, right, depth = 0) => {
    logDepth(`Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`, depth)
    depth ++

    if (typeof left === 'number' && typeof right === 'number') {
        if (left < right) {
            logDepth(`Left side is smaller, so inputs are in the right order`, depth)
            return true
        }
        if (left > right) {
            logDepth(`Right side is smaller, so inputs are not in the right order`, depth)
            return false
        }
    } else if (!Array.isArray(left)) {
        logDepth(`Mixed types; convert left to [${left}] and retry comparison`, depth)
        return compare([left], right, depth)
    } else if (!Array.isArray(right)) {
        logDepth(`Mixed types; convert right to [${right}] and retry comparison`, depth)
        return compare(left, [right], depth)
    } else {
        while(left.length > 0 && right.length > 0) {
            const subLeft = left.shift()
            const subRight = right.shift()
            const comparison = compare(subLeft, subRight, depth)
            if (comparison !== undefined) {
                return comparison
            }
        }
        if (left.length === 0 && right.length !== 0) {
            logDepth('Left side ran out of items, so inputs are in the right order', depth)
            return true
        } else if (right.length === 0 && left.length !== 0) {
            logDepth('Right side ran out of items, so inputs are not in the right order', depth)
            return false
        }
    }
}

const part1 = input => {
    const pairs = []

    for (let i = 0; i < input.length; i += 3) {
        pairs.push([JSON.parse(input[i]), JSON.parse(input[i + 1])])
    }

    const correctPairs = []

    pairs.forEach((pair, index) => {
        console.log(`== Pair ${index + 1} ==`)
        if (compare(pair[0], pair[1]) === true) {
            correctPairs.push(index + 1)
        }
    })

    return correctPairs.reduce((a, b) => a + b, 0)
}

const part2 = input => {
    const sorted = [...input, '[[2]]', '[[6]]'].filter(x => !!x).sort((a, b) => compare(JSON.parse(a), JSON.parse(b)) === true ? -1 : 1)


    return (sorted.indexOf('[[2]]') + 1) * (sorted.indexOf('[[6]]') + 1)
}

module.exports = {
    part1,
    part2
}
