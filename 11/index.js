const parseInput = input => input.filter(x => x.startsWith('Monkey')).map((_, index) => ({
    items: input[(index * 7) + 1].replace('Starting items: ', '').split(', ').map(x => Number(x)),
    op: input[(index * 7) + 2].replace('Operation: new = ', '').trim(),
    divBy: parseInt(input[(index * 7) + 3].replace('Test: divisible by ', '')),
    true: parseInt(input[(index * 7) + 4].replace('If true: throw to monkey ', '')),
    false: parseInt(input[(index * 7) + 5].replace('If false: throw to monkey ', '')),
    itemsInspected: 0
}))

const runGame = (monkeys, rounds, divideWorry = true) => {
    let round = 1

    // Aaaaah, the Chinese Remainder Theorem...
    const cycleLength = monkeys.reduce((prev, current) => {
        return prev * current.divBy
    }, 1)

    while (round <= rounds) {
        monkeys.forEach((monkey, index) => {
            // console.log(`Monkey ${index}`)
            while (monkey.items.filter(x => !!x).length > 0) {
                let worry = monkey.items.shift()
                worry = worry % cycleLength
                // console.log(`  Monkey inspects an item with a worry level of ${worry}.`)
                monkey.itemsInspected += 1
                const [_, op, amount] = monkey.op.split(' ')
                worry = op === '+' ? worry + parseInt(amount) : amount === 'old' ? worry * worry : worry * parseInt(amount)
                // console.log(`    Worry level is ${op === '*' ? 'multiplied' : 'increased'} by ${amount === 'old' ? 'itself' : amount} to ${worry}.`)
                if (divideWorry) {
                    worry = Math.floor(worry / 3)
                }
                // console.log(`    Monkey gets bored with item. Worry level is divided by 3 to ${worry}.`)
                let testWorry = worry
                if (!!cycleLength) {
                    testWorry = testWorry % cycleLength
                }
                const div = testWorry % monkey.divBy === 0
                // console.log(`    Current worry level is ${!div ? 'not' : ''} divisible by ${monkey.divBy}.`)
                const targetMonkey = div ? monkey.true : monkey.false
                // console.log(`    Item with worry level ${worry} is thrown to monkey ${targetMonkey}.`)
                monkeys[targetMonkey].items.push(worry)
            }
        })

        // console.log(`After round ${round}, the monkeys are holding items with these worry levels:`)
        // monkeys.forEach((monkey, index) => {
        //     console.log(`Monkey ${index}: ${monkey.items.join(', ')}`)
        // })

        // if (round === 1 || round === 20 || round % 1000 === 0) {
        //     console.log(`== After round ${round} ==`)
        //     monkeys.forEach((monkey, index) => {
        //         console.log(`Monkey ${index} inspected items ${monkey.itemsInspected} times.`)
        //     })
        //     console.log(' ')
        // }

        round += 1
    }
}

const part1 = input => {
    const monkeys = parseInput(input)

    runGame(monkeys, 20)

    const sortedActiveMonkeys = monkeys.map(x => x.itemsInspected).sort((a, b) => b - a)

    return sortedActiveMonkeys[0] * sortedActiveMonkeys[1]
}

const part2 = input => {
    const monkeys = parseInput(input)

    runGame(monkeys, 10000, false)

    const sortedActiveMonkeys = monkeys.map(x => x.itemsInspected).sort((a, b) => b - a)

    return sortedActiveMonkeys[0] * sortedActiveMonkeys[1]
}

module.exports = {
    part1,
    part2
}
