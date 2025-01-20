const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/'); // Salva as imagens na pasta 'assets'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
    }
});
const upload = multer({ storage });

app.use(express.json());
app.use(express.static(__dirname));

let produtos = [
    { id: 1, nome: 'Espresso', preco: 8.0, imagem: 'assets/espresso.jpg' },
    { id: 2, nome: 'Capuccino', preco: 10.0, imagem: 'assets/capuccino.jpg' },
    { id: 3, nome: 'Chocolate Quente', preco: 12.0, imagem: 'assets/hot chocolate.jpg' },
    { id: 4, nome: 'Chá Matcha', preco: 15.0, imagem: 'assets/matcha green tea.jpg' },
    { id: 5, nome: 'Cookies', preco: 8.0, imagem: 'assets/cookies.jpg' },
    { id: 6, nome: 'Croissant', preco: 10.0, imagem: 'assets/croissant.jpg' },
    { id: 7, nome: 'Torrada Gourmet', preco: 12.0, imagem: 'assets/toast.jpg' },
    { id: 8, nome: 'Bolo de Morango', preco: 15.0, imagem: 'assets/strawberry cake.jpg' },
    { id: 9, nome: 'Panquecas Americanas', preco: 20.0, imagem: 'assets/pancakes.jpg' },
];

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.post('/produtos', upload.single('imagem'), (req, res) => {
    const novoProduto = {
        id: produtos.length + 1,
        nome: req.body.nome,
        preco: parseFloat(req.body.preco),
        imagem: req.file.path,
    };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    produtos = produtos.filter(produto => produto.id !== id);
    res.json({ message: 'Produto removido!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});