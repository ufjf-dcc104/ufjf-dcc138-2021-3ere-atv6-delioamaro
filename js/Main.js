import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js";
import CenaJogo2 from "./CenaJogo2.js";
import CenaJogo3 from "./CenaJogo3.js";
import CenaVitoria from "./CenaVitoria.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);



assets.carregaImagem("guerreiro", "assets/guerreiro.png");
assets.carregaImagem("parede", "assets/parede.png");
assets.carregaImagem("piso", "assets/piso.png");
assets.carregaImagem("chave", "assets/key.png");
assets.carregaImagem("bau", "assets/bau.png");
assets.carregaAudio("chave", "assets/chave.wav");
assets.carregaAudio("bau", "assets/bau.wav");


const canvas = document.querySelector("canvas");
canvas.width = 21*32;
canvas.height = 16*32

input.configurarTeclado({
    ArrowLeft: "MOVE_ESQUERDA",
    ArrowRight: "MOVE_DIREITA",
    ArrowUp: "MOVE_CIMA",
    ArrowDown: "MOVE_BAIXO",
    " ": "PROXIMA_CENA"
});

const game = new Game(canvas, assets, input);

const cena0 = new CenaCarregando();
const cena1 = new CenaJogo();
const cena2 = new CenaJogo2();
const cena3 = new CenaJogo3();
const cena4 = new CenaVitoria();
const cena5 = new CenaFim();
game.adicionarCena("carregando", cena0);
game.adicionarCena("jogo", cena1);
game.adicionarCena("fase2", cena2);
game.adicionarCena("fase3", cena3);
game.adicionarCena("vitoria", cena4);
game.adicionarCena("fim", cena5);

game.iniciar();

/*document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "i":
            cena1.iniciar();
            break;
        case "p":
            cena1.parar();
            break;
        case "c":
            assets.play("moeda");
            break;
        case "b":
            assets.play("boom");
            break;
    }
})*/