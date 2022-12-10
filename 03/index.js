const getValue = character => {
    let value = character.toLowerCase().charCodeAt(0) - 96
    if (character.toLowerCase() !== character) {
        value += 26
    }
    return value
}

const part1 = input => {
    let sumPriorities = 0

    input.forEach(line => {
        const firstCompartment = Array.from(line.slice(0, line.length/2))
        const secondCompartment = Array.from(line.slice(line.length/2))
        const [item] = firstCompartment.filter(x => secondCompartment.includes(x))

        sumPriorities += getValue(item)
    })

    return sumPriorities
}
const part2 = input => {
    let sumPriorities = 0

    for (let i = 0; i < input.length; i = i + 3) {
        const line1 = Array.from(input[i])
        const line2 = Array.from(input[i + 1])
        const line3 = Array.from(input[i + 2])

        const [item] = line1.filter(x => line2.includes(x)).filter(x => line3.includes(x))

        sumPriorities += getValue(item)
    }

    return sumPriorities
}

module.exports = {
    part1,
    part2
}
