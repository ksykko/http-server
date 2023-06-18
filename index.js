const http = require('http')

const PORT = 3000

const server = http.createServer()

const friends = [{
    id: 0,
    name: 'John Smith',
}, {
    id: 1,
    name: 'John Doe',
}, {
    id: 2,
    name: 'Jane Doe',
}]

server.on('request', (req, res) => {
    const items = req.url.split('/')

    if (req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
            const friend = data.toString()
            console.log('Request:', friend)

            friends.push(JSON.parse(friend))
        })
        req.pipe(res) // this line makes it writeable stream

    } else if (req.method === 'GET' && items[1] === 'friends') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')

        if (items.length === 3) {
            const friendIndex = Number(items[2])

            res.end(JSON.stringify(friends[friendIndex]))
        } else {
            res.end(JSON.stringify(friends))
        }
    } else if (req.method === 'GET' && items[1] === 'messages') {
        res.write('<html>')
        res.write('<body>')
        res.write('<ul>')
        res.write('<li>Message 1</li>')
        res.write('<li>Message 2</li>')
        res.write('<li>Message 3</li>')
        res.write('</ul>')
        res.write('</body>')
        res.write('</html>')
        res.end()
    } else {
        res.statusCode = 404
        res.end()
    }

})

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})