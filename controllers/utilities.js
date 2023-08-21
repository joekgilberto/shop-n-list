module.exports = {
    highestBid
}

async function highestBid(auctions){
    if (auctions.length > 0) {

        auctions.forEach(a=>{
            a.accepted = false
        })

        auctions.sort((a, b) => {
            return b.offer - a.offer
        })

        auctions[0].accepted = true

        auctions.forEach(async (a) => {
            await a.save()
        })
    }
}