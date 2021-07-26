const imgElement = document.querySelector('#image');
const nextButton = document.querySelector('#next')
const categoryElement = document.querySelector('#categories')
const hentaiElement = document.querySelector('#hentai')
const loadElement = document.querySelector('#loading')

const normalOptionsHtml = `
  <option value="waifu">Waifu</option>
  <option value="neko">Neko</option>
  <option value="shinobu">Shinobu</option>
  <option value="megumin">Megumin</option>
  <option value="bully">Bully</option>
  <option value="cuddle">Cuddle</option>
  <option value="cry">Cry</option>
  <option value="hug">Hug</option>
  <option value="awoo">Awoo</option>
  <option value="kiss">Kiss</option>
  <option value="lick">Lick</option>
  <option value="pat">Pat</option>
  <option value="smug">Smug</option>
  <option value="bonk">Bonk</option>
  <option value="yeet">Yeet</option>
  <option value="blush">Blush</option>
  <option value="smile">Smile</option>
  <option value="wave">Wave</option>
  <option value="highfive">Highfive</option>
  <option value="handhold">Handhold</option>
  <option value="nom">Nom</option>
  <option value="bite">Bite</option>
  <option value="glomp">Glomp</option>
  <option value="slap">Slap</option>
  <option value="kill">Kill</option>
  <option value="kick">Kick</option>
  <option value="happy">Happy</option>
  <option value="wink">Wink</option>
  <option value="poke">Poke</option>
  <option value="dance">Dance</option>
  <option value="cringe">Cringe</option>
`
const hentaiOptionsHtml = `
  <option value="waifu">Waifu</option>
  <option value="neko">Neko</option>
  <option value="trap">Trap</option>
  <option value="blowjob">Blowjob</option>
`

let category = 'waifu'
let type = 'sfw'
let isHentai = false;

const types = {
  normal: 'sfw',
  hentai: 'nsfw'
}

const returnUrl = (category, type) => `https://api.waifu.pics/${type}/${category}` 

const request = async () => {
  const response = await fetch(returnUrl(category, type))
  const data = await response.json()
  return data
}

const loadImage = async () => {
  const { url } = await request()
  imgElement.src = url
}

const setCategory = (isHentai) => {
  categoryElement.innerHTML = isHentai ? normalOptionsHtml : hentaiOptionsHtml
  category = 'waifu'
}

const setDelay = async (delay) => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(), delay)
  })
}

const setLoad = (delay = 3000) => {
  loadElement.classList.add('show')
  return async () => {
    await loadImage()
    await setDelay(delay)
    loadElement.classList.remove('show')
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  categoryElement.innerHTML = normalOptionsHtml
  await loadImage()
})

nextButton.addEventListener('click', async () => {
  await setLoad()()
})

categoryElement.addEventListener('change', async () => {
  category = categoryElement.value
  await setLoad()()
})

hentaiElement.addEventListener('change', async () => {
  type = isHentai ? types.normal : types.hentai
  setCategory(isHentai)
  isHentai = !isHentai
  await setLoad()()
})
