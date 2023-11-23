const apiKey = "8hoNJVE6kMcILPPenpn_brczhp_UawhxAUArVp7sTJQ";//key para conectar a api, key gerada pela plataforma da api
const formElement = document.querySelector("form");//aqui estamos coletando o form
const formInput = document.getElementById("search-input");//aqui coletando o valor do input pelo seu id
const searchResult = document.querySelector(".container");//aqui estamos coletando os elementos dentro da classe respectiva
const showMore = document.getElementById("show-more");//aqui estamos coletando o show more 

let inputData = "";//aqui estamos reportando que esta variavel sera vazia
let page = 1;//aqui estamos estipulando o valor da page como 1

async function Search () {//aqui declaramos a funcao como assincrona
    inputData = formInput.value;//aqui estamos recebendo o valor do input

        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;//aqui estamos informando a url que a api vai consultar, como tambem algumas informacoes, como a pagina, o valor do input e a key da api
        const response = await fetch(url);//aqui estamos coletando a resposta da solicitacao a url 
        const data = await response.json();//aqui estamos informando que o valor recebido pelo response da url, vai ser convertido em json e inserido na variavel data
        console.log(data);
        const results = data.results;///aqui estamos informando os resultados da pesquisa para a variavel results

        if(page === 1) {//aqui estamos verificando se a pagina esta igual a 1
            searchResult.innerHTML="";//se não, vai ser vazio
        }

        results.map((result) => {//aqui estamos pegando o resultado da variavel results e usando a funcao default do javascript para mapear o resultado e criar um template com o conteudo
            const Image = document.createElement('div');
            Image.classList.add("search-result")
            const imagem = document.createElement('img');
            imagem.src = result.urls.small
            imagem.alt = result.alt_description
            const LinkImagem = document.createElement('a');
            LinkImagem.href = result.links.html
            LinkImagem.target = "_blank"
            LinkImagem.textContent = result.alt_description
            Image.appendChild(imagem);
            Image.appendChild(LinkImagem);
            searchResult.appendChild(Image);
        })

        page++ 

        if(page > 1) {//aqui estamos verificando o valor da variavel page, se maior, o show more vai receber o display block
            showMore.style.display = "block";
        }
}

formElement.addEventListener("submit",(event) => {//aqui estamos criando uma funcao para estutar o evento do submit
    event.preventDefault()
    page = 1;//esse e o numero inicial recebido pela variavel
    Search();//aqui chamamos a funcao 
})
showMore.addEventListener("click",(event) => {//aqui é a funcao dde click sobre a busca
    Search();
})