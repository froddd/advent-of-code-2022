const part1 = input => {
    const monkeys = []

    input.filter(x => x.startsWith('Monkey')).forEach((_, index) => {
        monkeys.push({
            items: input[(index * 7) + 1].replace('Starting items: ', '').split(', ').map(x => Number(x)),
            op: input[(index * 7) + 2].replace('Operation: new = ', '').trim(),
            divBy: parseInt(input[(index * 7) + 3].replace('Test: divisible by ', '')),
            true: parseInt(input[(index * 7) + 4].replace('If true: throw to monkey ', '')),
            false: parseInt(input[(index * 7) + 5].replace('If false: throw to monkey ', '')),
            itemsInspected: 0
        })
    })

    let round = 1

    while (round <= 20) {
        monkeys.forEach((monkey, index) => {
            // console.log(`Monkey ${index}`)
            while (monkey.items.length > 0) {
                let worry = monkey.items.shift()
                // console.log(`  Monkey inspects an item with a worry level of ${worry}.`)
                monkey.itemsInspected += 1
                const [_, op, amount] = monkey.op.split(' ')
                worry = op === '+' ? worry + parseInt(amount) : amount === 'old' ? worry * worry : worry * parseInt(amount)
                // console.log(`    Worry level is ${op === '*' ? 'multiplied' : 'increased'} by ${amount === 'old' ? 'itself' : amount} to ${worry}.`)
                worry = Math.floor(worry / 3)
                // console.log(`    Monkey gets bored with item. Worry level is divided by 3 to ${worry}.`)
                const div = worry % monkey.divBy === 0
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

        round += 1
    }

    // monkeys.forEach((monkey, index) => {
    //     console.log(`Monkey ${index} inspected items ${monkey.itemsInspected} times.`)
    // })

    const sortedActiveMonkeys = monkeys.map(x => x.itemsInspected).sort((a, b) => b - a)

    return sortedActiveMonkeys[0] * sortedActiveMonkeys[1]
}

const part2 = input => {}

module.exports = {
    part1,
    part2
}
