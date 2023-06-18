const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const username = "luanmello";
const password = "8eHtalKz4AnrhPXG";
const cluster = "mensagens";
const dbname = "chat";
//`mongodb+srv://luanmello:${password}@chat.ntiv6a2.mongodb.net/?retryWrites=true&w=majority`
//`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
mongoose.connect(
  `mongodb+srv://luanmello:${password}@chat.ntiv6a2.mongodb.net/?retryWrites=true&w=majority`
,
    { useNewUrlParser: true, useUnifiedTopology: true }

);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



// Defina o esquema do documento
const usuarioSchema = new mongoose.Schema({
    nome: String,
    conteudo: String,
});

// Crie o modelo com base no esquema
const Mensagem = mongoose.model('Mensagem', usuarioSchema);

  const novaMensagem = new Mensagem({
        nome: 'Luan',
        conteudo: 'Tudo',
      });
    
    async function salvarUsuario(novaMensagem) {
        try {
            const resultado = await novaMensagem.save();
            console.log('Novo usuário salvo com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao salvar o novo usuário:', err);
        }
    }
    
    async function acharMensagem(){
        const resultado = await Mensagem.find();
        console.log('Resultado', resultado);
        return resultado;
    }
    
    //salvarUsuario();
    acharMensagem();


app.get('/ver', (req, res) => {
        res.sendFile(__dirname + '/public/ver.html');
});


app.get('/envio_chat', async (req, res) => {
        try {
          const resultado = await acharMensagem();
          res.send(resultado);
        } catch (err) {
          console.error('Erro ao buscar mensagens:', err);
     res.status(500).send('Erro ao buscar mensagens');
}
});
      



app.post('/mensagem', (req, res) => {
        console.log(req.body.nome,req.body.conteudo,'hahahahahah')
        res.send(req.body);
        const novaMensagem = new Mensagem({
            nome: req.body.nome,
            conteudo: req.body.conteudo,
          });
        salvarUsuario(novaMensagem);
        console.log('oosidoasdsa')
    });


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html');
});
    
    
    
    
    
app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});
    