import fastify from "fastify"
import fetch from "node-fetch"

const server = fastify({ logger: true })

const firstApi = "http://test1.infra.getlenses.co.uk/"
const secondApi = "http://test2.infra.getlenses.co.uk/"
const thirdApi = "http://test3.infra.getlenses.co.uk/"

const normalize = (dataSet) =>
    dataSet.map((data) => Object.fromEntries(Object.entries(data).map(([k, v]) => [k.toLowerCase(), v])))

const aggregateData = async ({ toSort }) => {
    const firstData = await getData(firstApi)
    const secondData = await getData(secondApi)
    const thirdData = await getData(thirdApi)
    const aggregatedData = [...normalize(firstData), ...normalize(secondData), ...normalize(thirdData)]
    if (toSort === "priority") {
        return [...aggregatedData].sort((a, b) => Number(a.priority) - Number(b.priority))
    }
    if (toSort === "category") {
        return [...aggregatedData].sort((a, b) => a.category.localeCompare(b.category))
    }
    return aggregatedData
}

const getData = async (url) => {
    const response = await fetch(url)
    return response.json()
}

const getSortingOrder = (query) => {
    if (query.sortBy.toLowerCase() === "priority") return "priority"
    if (query.sortBy.toLowerCase() === "category") return "category"
    return null
}

server.get("/", async (request, reply) => {
    const { query } = request
    const toSort = getSortingOrder(query)
    const data = await aggregateData({ toSort })
    await reply.send(data)
})

// Run the server!
server.listen(3000, function (err, address) {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
    server.log.info(`server listening on ${address}`)
})
