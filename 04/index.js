const part1 = input => {
    const overlaps = input.filter(line => {
        const [[elf1Start, elf1End], [elf2Start, elf2End]] = line.split(',').map(x => x.split('-').map(x => Number(x)));

        return (elf1Start <= elf2Start && elf1End >= elf2End) || (elf2Start <= elf1Start && elf2End >= elf1End);
    });

    return overlaps.length;
}

const part2 = input => {}

module.exports = {
    part1,
    part2
}
