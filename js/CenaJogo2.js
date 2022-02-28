import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js"

export default class CenaJogo extends Cena {

    quandoColidir(a, b) {
        //if(!this.aRemover.includes(a)) {
        //   this.aRemover.push(a);
        //}
        if(!this.aRemover.includes(b)) {
            this.aRemover.push(b);
        }
        if(a.tags.has("pc") && b.tags.has("enemy")) {
            this.assets.play("boom");
            this.game.selecionaCena("fim");
        }
        if(a.tags.has("pc") && b.tags.has("pisoFogo")) {
            this.assets.play("boom");
            this.game.selecionaCena("fim");
        }
    }

    passo(dt) {
        this.fase = 2;
        if(this.assets.acabou()) {
            for (const sprite of this.sprites) {
                sprite.passo(dt);
            }
        } 
        this.frequencia = 70;
        this.timer++;
        if(this.timer === this.frequencia) {
            this.criarFireball();
            console.log(this.criarFireball());
            this.timer = 0;
            if(this.timer >= 2) {
            this.timer--;
            }
        }

        if(this.tempo > 30) {
            this.game.selecionaCena("fase3");
        } 

    }

    preparar() {
        super.preparar();
        const mapa1 = new Mapa(10, 14, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        const pc = new Sprite({x:150, y:150, w:20, h:30, tag: "arqueiro", assets:this.assets});
        pc.tags.add("pc");
        const cena = this;
        pc.controlar = function(dt){
            if(cena.input.comandos.get("MOVE_ESQUERDA")){
                this.MOVE_ESQUERDA = true;
                this.vx = -90;
            } 
            else if(cena.input.comandos.get("MOVE_DIREITA")){
                this.MOVE_DIREITA = true;
                this.vx = +90;
            } 
            else{
                this.MOVE_ESQUERDA = false;
                this.MOVE_DIREITA = false;
                this.vx = 0;
            }

            if(cena.input.comandos.get("MOVE_CIMA")){
                this.MOVE_CIMA = true;
                this.vy = -90;
            } 
            else if(cena.input.comandos.get("MOVE_BAIXO")){
                this.MOVE_BAIXO = true;
                this.vy = +90;
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
        

        //const en1 = new Sprite({x:650, y:100, vx:-50, tag:"fireball", assets:this.assets, tags:["enemy"]});
        //this.adicionar(en1);
        const en2 = new Sprite({x:50, y:50, tag:"pisoFogo", assets:this.assets, tags:["pisoFogo"]});
        this.adicionar(en2);
        const en3 = new Sprite({x:50, y:100, tag:"pisoFogo", assets:this.assets, tags:["pisoFogo"]});
        this.adicionar(en3);
        const en4 = new Sprite({x:50, y:150, tag:"pisoFogo", assets:this.assets, tags:["pisoFogo"]});
        this.adicionar(en4);
        const en5 = new Sprite({x:50, y:200, tag:"pisoFogo", assets:this.assets, tags:["pisoFogo"]});
        this.adicionar(en5);
        const en6 = new Sprite({x:50, y:225, tag:"pisoFogo", assets:this.assets, tags:["pisoFogo"]});
        this.adicionar(en6);
        //const en7 = new Sprite({x:50, y:255, tag:"pisoFogo", assets:this.assets, tags:["pisoFogo"]});
        //this.adicionar(en7);
        /*this.adicionar(new Sprite({x:115, y:70, vy:10, color:"red", controlar:perseguePC, tags:["enemy"]}));
        this.adicionar(new Sprite({x:115, y:160, vy:-10, color:"red", controlar:perseguePC, tags:["enemy"]}));*/
        
    }

    criarFireball(){
        let posicao = Math.floor(Math.random() * (6 - 1) + 1);
        const enemy = new Sprite({x:600, y:posicao*50, vx: -200, tag:"enemy", assets: this.assets});

        enemy.tags.add("enemy");

        this.adicionar(enemy);
    }


}