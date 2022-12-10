const maxCalories = (input) => {
    const elves = input.reduce((elves, calories) => {
        if (!calories) {
            elves.push(0)
        } else {
            elves[elves.length-1] += Number(calories)
        }
        return elves
    }, [0])
    return Math.max(...elves)
}

module.exports = {
    part1: maxCalories
}
