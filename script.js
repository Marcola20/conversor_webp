function convertTo(format) 
{
    const inputFile = document.getElementById('inputFile');         // Obtém o elemento de input file onde o usuário seleciona a imagem WebP.
    const convertedImg = document.getElementById('convertedImg');   // Obtém o elemento de imagem onde será exibida a imagem convertida.

    // Verificando se foi selecionado um arquivo. Caso contrário, exibe um alerta pedindo para selecionar um arquivo WebP.
    if (inputFile.files.length > 0)
    {
        const file = inputFile.files[0];                            // Obtém o arquivo selecionado pelo usuário.
        const reader = new FileReader();                            // Cria um objeto FileReader para ler o conteúdo do arquivo.

        reader.onload = function (event)                            // Define um evento que será acionado quando a leitura do arquivo estiver concluída.
        {                          
            const img = new Image();

            img.onload = function ()                                // Define um evento que será acionado quando a leitura do arquivo estiver concluída.
            {
                const canvas = document.createElement('canvas');    // Cria um elemento canvas para manipulação de imagem.
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');                // Obtém o contexto 2D do canvas para desenhar a imagem.
                ctx.drawImage(img, 0, 0);                           // Desenha a imagem no canvas.

                const link = document.createElement('a');           // Cria um elemento de link <a> para baixar a imagem convertida.
                link.download = `imagem_convertida.${format}`;      // Define o nome do arquivo a ser baixado.
                link.href = canvas.toDataURL(`image/${format}`);    // Converte o conteúdo do canvas para o formato desejado (JPG ou PNG) e define o link de download.
                link.click();                                       // Simula o clique no link de download para baixar a imagem.
                convertedImg.src = link.href;                       // Define a imagem convertida no elemento de imagem para exibição na página.
            };

            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
    // Caso não tenha sido selecionado, é exibido um alerta pedindo para selecionar um arquivo WebP.
    else
    {
        alert('Por favor, selecione um arquivo WebP para converter.');
    }
}


