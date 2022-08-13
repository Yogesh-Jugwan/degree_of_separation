// preprocess a JSON list of connections to an adjacency list Graph
function connectionsListToGraph(connections) {
    const Graph = {}
    for (let { name, friends } of connections) {
        Graph[name] = friends // allow fast lookup of a given person's friends
    }
    return Graph
}

// return the list of connections between source and target
function getConnections(source, target, connections) {

    const Graph = connectionsListToGraph(connections)
    const connectionPaths = []

    function findConnectionsDFS(source, target, path = [source], visited = {}) {
        // Don't search/visit the same friend twice (to avoid infinite loops)
        if (visited[source]) return;

        // mark that we've searched the current source friend
        visited[source] = true;

        for (let friend of Graph[source]) {
            if (friend === target) {
                connectionPaths.push(path.concat(target));
            } else {
                findConnectionsDFS(friend, target, path.concat(friend), visited)
            }
        }
    }
    findConnectionsDFS(source, target);
    return connectionPaths;
}

let connections = [
    
    {
        "name": "sameer",
        "friends": ["aayushi", "kamalnath"]
    },
    {
        "name": "aayushi",
        "friends": ["bhaskar"]
    },
    {
        "name": "kamalnath",
        "friends": ["shanti"]
    },
    {
        "name": "shanti",
        "friends": ["bhaskar"]
    },
    {
        "name": "bhasker",
        "friends": []
    }
]

console.log('Sameer to Bhaskar:', getConnections('sameer', 'bhaskar', connections))
console.log('Kamalnath to Bhaskar:', getConnections('kamalnath', 'bhaskar', connections))