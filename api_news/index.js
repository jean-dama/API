const PORT = 10000

const express = require('express')//aqui estamos declarando variaveis para as dependencias
const axios = require('axios')//aqui estamos declarando variaveis para as dependencias
const cheerio = require('cheerio')//aqui estamos declarando variaveis para as dependencias
const app = express() // aqui estamos declarando a variavel app e chamando dentro de app

const articles = []

const newsSources = [
    {
        name:'globo',
        address: 'https://oglobo.globo.com/',
        //base:'' se quiser colocar o prefixo do site, caso ele nao fornecer
    },
    {
        name:'cnn',
        address: 'https://www.cnnbrasil.com.br/'
        //base:'' se quiser colocar o prefixo do site, caso ele nao fornecer
    },
    {
        name:'bbc',
        address: 'https://www.bbc.com/portuguese'
        //base:'' se quiser colocar o prefixo do site, caso ele nao fornecer
    },
    {
        name:'bbc',
        address: 'https://www.bbc.com/portuguese'
        //base:'' se quiser colocar o prefixo do site, caso ele nao fornecer
    },
    {
        name:'bbc',
        address: 'https://www.bbc.com/portuguese'
        //base:'' se quiser colocar o prefixo do site, caso ele nao fornecer
    },
    {
        name:'telegraph',
        address: 'https://www.telegraph.co.uk/'
        //base:'' se quiser colocar o prefixo do site, caso ele nao fornecer
    },
    {
        name:'sputnik',
        address: 'https://sputniknewsbrasil.com.br/'
        //base:'' se quiser colocar o prefixo do site, caso ele nao fornecer
    },
    {
        name:'cnn',
        address: 'https://www.cnnbrasil.com.br/'
        //base:'' se quiser colocar o prefixo do site, caso ele nao fornecer
    },
    {
        name:'pais',
        address: 'https://elpais.com/america/'
        //base:'' se quiser colocar o prefixo do site, caso ele nao fornecer
    },
    {
        name:'monde',
        address: 'https://www.lemonde.fr/'
        //base:'' se quiser colocar o prefixo do site, caso ele nao fornecer
    },
]


newsSources.forEach(newSource => { // aqui recebemos a lista das fontes e para cada uma delas coletamos o adress
    axios.get(newSource.address)
        .then(response => { // depois de coletar o adress, ele pega a resposta 
            const html = response.data // o html aqui recebe essa dado resposta
            const $  = cheerio.load(html) // aqui o dolar recebe o load de html 

                $('a:contains("Putin")', html).each(function () { //aqui verificamos se o html recebido acima tem a tag <a> com o conteudo de Putin
                    const title = $(this).text() // obtendo a informacao ele pega o texto e colocar em title
                    const url = $(this).attr('href') // obtendo a informacao ele pega a url do href da tag <a> e insere na variavel url

                        articles.push({ //aqui pegamos o array do articles e inserimos o title, se passar pela avericação, a url e o source
                             title,
                             url,
                             //url: newSource.base + url se caso queira retornar a base que criamos acima, mais o restante do link
                             source: newSource.name
                        })
                })
        })
})

app.get('/noticias',(req,res) => { // aqui setamos a url /noticias como point
   res.json(articles)
})

app.listen(PORT, () => console.log('Teste sobre o servidor')) //app esta escutando a porta e verificando se esta funcional 

app.get('/', (req,res) => {
    res.json('Bem vindo a minha API')// assim tu pode acessa a url http://localhost:10000/ e ver a frase
})

app.get('/noticias/:newsSourceId', async (req,res) => {// aqui setamos a url /noticias/ + a variavel que coleta o source id da fonte de noticias

    const newsSourceId = req.params.newsSourceId // aqui declaramos a variavel que vai reseber o source ID da fonte, como globo, guardian e etc

    const newsSourceAddress = newsSources.filter(newSource => newSource.name === newsSourceId)[0].address //aqui realizamos um friltro sobre o array das fontes e verificamos se o name é identico ao source id, por exemplo globo === blobo
    //const newsSourceBase = newsSources.filter(newSource = > newSource.name === newsSourceId)[0].base caso queria a base da url

        axios.get(newsSourceAddress) //aqui novamente usamos a dependencia do axios para pegar o source adress que verificamos na linha acima
            .then(response => {
                const html = response.data // o html aqui recebe essa dado resposta
                const $ = cheerio.load(html) // aqui o dolar recebe o load de html 
                const unicArticles = [] // aqui declaramos a variavel unicArticles para receber os valores especificos

                    $('a:contains("Putin")', html).each(function () {
                        const title = $(this).text()
                        const url = $(this).attr('href')
                            unicArticles.push({
                                title,
                                //url: newsSourceBase + url
                                source: newsSourceId
                })
            })
        res.json(unicArticles) // aqui retornamos em json os valores especificos
    })
})

//app.get('/noticias',(req,res) => {
    //axios.get('https://oglobo.globo.com/')
      //  .then((response) => {
    //        const html = response.data
  //          const $ = cheerio.load(html)
//
                //$('a:contains("Brazil")', html).each(function () {
                //    const title = $(this).text()
              //      const url = $(this).attr('href')
            //            articles.push({
          //                  title,
        //                    url
      //                  })
    //            })
  //              res.json(articles)
//        })
//})