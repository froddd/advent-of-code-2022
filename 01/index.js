const addUpCalories = (input) => input.reduce((elves, calories) => {
    if (!calories) {
        elves.push(0)
    } else {
        elves[elves.length-1] += Number(calories)
    }
    return elves
}, [0])

const maxCalories = (input) => Math.max(...addUpCalories(input))

const top3MaxCalories = (input) => addUpCalories(input).sort((a, b) => b - a).slice(0, 3).reduce((sum, x) => sum + x, 0)

module.exports = {
    part1: maxCalories,
    part2: top3MaxCalories
}
