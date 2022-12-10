const part1 = input => {
    let sumPriorities = 0

    input.forEach(line => {
        const firstCompartment = Array.from(line.slice(0, line.length/2))
        const secondCompartment = Array.from(line.slice(line.length/2))
        const [item] = firstCompartment.filter(x => secondCompartment.includes(x))

        let value = item.toLowerCase().charCodeAt(0) - 96
        if (item.toLowerCase() !== item) {
            value += 26
        }
        sumPriorities += value
    })

    return sumPriorities
}
const part2 = input => {}

module.exports = {
    part1,
    part2
}
