const getDirectorySizes = (input) => {
    let currentPointer = [];
    const directories = {};

    input.forEach(line => {
        if (line !== '$ ls' && !line.startsWith('dir')) {
            if (line === '$ cd ..') {
                currentPointer.pop();
            } else if (line.startsWith('$ cd ')) {
                currentPointer.push(line.split('$ cd ')[1]);
            } else {
                const [fileSize, fileName] = line.split(' ');
                let currentPath = '';
                currentPointer.forEach(pointer => {
                    currentPath += pointer;

                    if (pointer !== '/') {
                        currentPath += '/';
                    }

                    if (!directories[currentPath]) {
                        directories[currentPath] = 0;
                    }
                    directories[currentPath] += Number(fileSize);
                })
            }
        }
    })

    return directories;
}

const part1 = input => {
    const directories = getDirectorySizes(input);

    return Object.values(directories).filter(x => x <= 100000).reduce((total, x) => total + x, 0);
}

const part2 = input => {}

module.exports = {
    part1,
    part2
}
