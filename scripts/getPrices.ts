import axios from 'axios'
import fs from 'fs'
import path from 'path'

const ITAD_API_KEY = '1ba426956f1fba899440b9e452a1a68f9b6b0c1d'
const plainsPath = path.join(__dirname, 'plains.json')
const outputPath = path.join(__dirname, 'prices.json')

const plainsData: Record<string, string> = JSON.parse(fs.readFileSync(plainsPath, 'utf-8'))

async function fetchDeals(plain: string) {
  try {
    const url = `https://api.isthereanydeal.com/v02/game/deals/?key=${ITAD_API_KEY}&plains=${plain}&region=us&country=US`
    const res = await axios.get(url)
    return res.data?.data?.deals || []
  } catch (error) {
    console.warn(`⚠️ Error buscando deals para plain: ${plain}`)
    return []
  }
}

async function buildDealMap(plains: Record<string, string>) {
  const dealMap: Record<string, any[]> = {}

  for (const [title, plain] of Object.entries(plains)) {
    console.log(`💰 Buscando deals para: ${title} (${plain})`)
    const deals = await fetchDeals(plain)
    if (deals.length > 0) {
      dealMap[title] = deals.map((deal: any) => ({
        store: deal.shop.name,
        price: deal.price.amount,
        regular: deal.regular.amount,
        cut: deal.cut,
        currency: deal.price.currency,
        url: deal.url,
        expiry: deal.expiry,
        platforms: deal.platforms?.map((p: any) => p.name) || []
      }))
      console.log(`✅ ${title} => ${dealMap[title].length} ofertas encontradas`)
    } else {
      console.log(`❌ Sin deals para: ${title}`)
    }
    await new Promise(r => setTimeout(r, 300))
  }

  fs.writeFileSync(outputPath, JSON.stringify(dealMap, null, 2))
  console.log(`📝 prices.json guardado en ${outputPath}`)
}

buildDealMap(plainsData) 