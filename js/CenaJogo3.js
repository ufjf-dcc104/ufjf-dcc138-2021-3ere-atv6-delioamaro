import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js"

export default class CenaJogo3 extends Cena {

    quandoColidir(a, b) {
        if(a.tags.has("pc") && b.tags.has("enemy")) {
            this.contaChave++;
            this.aRemover.push(b);
            this.assets.play("chave");
        }
        if(a.tags.has("pc") && b.tags.has("bau") && this.contaChave === 1) {
            this.assets.play("bau");
            this.game.selecionaCena("vitoria");
        }
    }
    
    passo(dt) {
        this.fase = 3;
        if(this.assets.acabou()) {
            for (const sprite of this.sprites) {
                sprite.passo(dt);
            }
        } 
        if(this.tempo > 90) {
            this.game.selecionaCena("fim");
        }   
    }

    preparar() {
        super.preparar();
        const mapa1 = new Mapa(10, 14, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        const pc = new Sprite({x:620, y:50, w:20, h:30, tag: "guerreiro", assets:this.assets});
        pc.tags.add("pc");
        const cena = this;
        pc.controlar = function(dt){
            if(cena.input.comandos.get("MOVE_ESQUERDA")){
                this.MOVE_ESQUERDA = true;
                this.vx = -95;
            } 
            else if(cena.input.comandos.get("MOVE_DIREITA")){
                this.MOVE_DIREITA = true;
                this.vx = +95;
            } 
            else{
                this.MOVE_ESQUERDA = false;
                this.MOVE_DIREITA = false;
                this.vx = 0;
            }

            if(cena.input.comandos.get("MOVE_CIMA")){
                this.MOVE_CIMA = true;
                this.vy = -95;
            } 
            else if(cena.input.comandos.get("MOVE_BAIXO")){
                this.MOVE_BAIXO = true;
                this.vy = +95;
            } 
            else{
                this.MOVE_CIMA = false;
                this.MOVE_BAIXO = false;
                this.vy = 0;
            }
        }
        this.adicionar(pc);

        /*function perseguePC(dt) {
            this.vx = 25 * Math.sign(pc.x - this.x);
            this.vy = 50 * Math.sign(pc.y - this.y)
        }*/
        const chave = new Sprite({x:300, y:50, tag:"chave", assets:this.assets, tags:["enemy"]});
        this.adicionar(chave);
        const chave2 = new Sprite({x:110, y:350, tag:"chave", assets:this.assets, tags:["enemy"]});
        this.adicionar(chave2);
        const chave3 = new Sprite({x:620, y:120, tag:"chave", assets:this.assets, tags:["enemy"]});
        this.adicionar(chave3);
        const bau = new Sprite({x:620, y:300, tag:"bau", assets:this.assets, tags:["bau"]});
        this.adicionar(bau);
        /*this.adicionar(new Sprite({x:115, y:70, vy:10, color:"red", controlar:perseguePC, tags:["enemy"]}));
        this.adicionar(new Sprite({x:115, y:160, vy:-10, color:"red", controlar:perseguePC, tags:["enemy"]}));*/
    }
}