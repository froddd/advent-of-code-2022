const addUpCalories = (input) => input.reduce((elves, calories) => {
    if (!calories) {
        elves.push(0)
    } else {
        elves[elves.length-1] += Number(calories)
    }
    return elves
}, [0])

const part1 = (input) => Math.max(...addUpCalories(input))

const part2 = (input) => addUpCalories(input).sort((a, b) => b - a).slice(0, 3).reduce((sum, x) => sum + x, 0)

module.exports = {
    part1,
    part2
}
