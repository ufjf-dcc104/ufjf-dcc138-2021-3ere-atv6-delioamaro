export default class Sprite {
    //responsavel por modelar algo que se move na tela

    constructor({x=100, vx=0,  y=100, vy=0, w=20, h=20, tag, assets, controlar=()=>{}, tags=[]}={}) {
        this.x = x;
        this.vx = vx;
        this.y = y;
        this.vy = vy;
        this.w = w;
        this.h = h;
        //this.color = color;
        this.tag = tag;
        this.assets = assets;
        this.l = 0;
        this.c = 0;
        this.MOVE_ESQUERDA = false;
        this.MOVE_DIREITA = false;
        this.MOVE_CIMA = false;
        this.MOVE_BAIXO = false;
        this.cena = null;
        this.mx = 0;
        this.my = 0;
        this.controlar = controlar;
        this.tags = new Set();
        tags.forEach((tag) => {this.tags.add(tag);});
        /*for (let i = 0; i < tags.length; i++) {
            this.tags.add(tags[i]);
        };*/

    }

    desenhar(ctx) {
        /*ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
        ctx.strokeStyle = "blue";
        ctx.strokeRect(this.mx * this.cena.mapa.SIZE, this.my * this.cena.mapa.SIZE, this.cena.mapa.SIZE, this.cena.mapa.SIZE);*/
        if(this.tag === "guerreiro"){
            ctx.drawImage(this.assets.img("guerreiro"), Math.floor(this.c)*64, this.l*64, 64, 64, this.x - 22, this.y - 25, 45, 45);
        }
        if(this.tag === "chave"){
            ctx.drawImage(this.assets.img("chave"), 0, 0, 50, 50, this.x -this.w/2, this.y - this.h/2, 25, 25);
        }
        if(this.tag === "bau"){
            ctx.drawImage(this.assets.img("bau"), 0, 0, 32, 32, this.x -this.w/2, this.y - this.h/2, 32, 32);
        }
        
    }

    controlar(dt) {

    }

    mover(dt) {
        this.x = this.x + this.vx*dt;
        this.y = this.y + this.vy*dt;
        this.mx = Math.floor(this.x / this.cena.mapa.SIZE);
        this.my = Math.floor(this.y / this.cena.mapa.SIZE);

    }
    
    passo(dt){
        this.controlar(dt);
        this.mover(dt);
        if(this.MOVE_CIMA){
            this.l = 8;
            this.c += 10 * dt;
            if(this.c >= 8){
                this.c = 0;
                this.l = 8;
            }
        }
        if(this.MOVE_BAIXO){
            this.l = 10;
            this.c += 10 * dt;
            if(this.c >= 8){
                this.c = 0;
                this.l = 10;
            }
        }
        if(this.MOVE_ESQUERDA){
            this.l = 9;
            this.c += 10 * dt;
            if(this.c >= 8){
                this.c = 0;
                this.l = 9;
            }
        }
        if(this.MOVE_DIREITA){
            this.l = 11;
            this.c += 10 * dt;
            if(this.c >= 8){
                this.c = 0;
                this.l = 11;
            }
        }
    }

    colidiuCom(outro) {
        return !(this.x - this.w/2 > outro.x + outro.w/2 || this.x + this.w/2 < outro.x - outro.w/2 || this.y - this.h/2 > outro.y + outro.h/2 || this.y + this.h/2 < outro.y - outro.h/2);
    }

    aplicaRestricoes(dt) {
        const SIZE = this.cena.mapa.SIZE;
        this.aplicaRestricoesDireita(this.mx + 1, this.my - 1);
        this.aplicaRestricoesDireita(this.mx + 1, this.my);
        this.aplicaRestricoesDireita(this.mx + 1, this.my + 1);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my - 1);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1);
        this.aplicaRestricoesBaixo(this.mx - 1, this.my + 1);
        this.aplicaRestricoesBaixo(this.mx, this.my + 1);
        this.aplicaRestricoesBaixo(this.mx + 1, this.my + 1);
        this.aplicaRestricoesCima(this.mx - 1, this.my - 1);
        this.aplicaRestricoesCima(this.mx, this.my - 1);
        this.aplicaRestricoesCima(this.mx + 1, this.my - 1);
    }

    aplicaRestricoesDireita(pmx, pmy) {
        if(this.vx > 0) {
            const SIZE = this.cena.mapa.SIZE;
            if(this.cena.mapa.tiles[pmy][pmx] != 0) {
                const tile = {x:pmx*SIZE + SIZE/2, y:pmy*SIZE + SIZE/2, w:SIZE, h:SIZE}; 
                if(this.colidiuCom(tile)) {
                    this.vx = 0;
                    this.x = tile.x - tile.w/2 - this.w/2 - 1;
                }
            }
        }
    }

    aplicaRestricoesEsquerda(pmx, pmy) {
        if(this.vx < 0) {
            const SIZE = this.cena.mapa.SIZE;
            if(this.cena.mapa.tiles[pmy][pmx] != 0) {
                const tile = {x:pmx*SIZE + SIZE/2, y:pmy*SIZE + SIZE/2, w:SIZE, h:SIZE}; 
                if(this.colidiuCom(tile)) {
                    this.vx = 0;
                    this.x = tile.x + tile.w/2 + this.w/2 + 1;
                }
            }
        }
    }

    aplicaRestricoesBaixo(pmx, pmy) {
        if(this.vy > 0) {
            const SIZE = this.cena.mapa.SIZE;
            if(this.cena.mapa.tiles[pmy][pmx] != 0) {
                const tile = {x:pmx*SIZE + SIZE/2, y:pmy*SIZE + SIZE/2, w:SIZE, h:SIZE}; 
                if(this.colidiuCom(tile)) {
                    this.vy = 0;
                    this.y = tile.y - tile.h/2 - this.h/2 - 1;
                }
            }
        }
    }

    aplicaRestricoesCima(pmx, pmy) {
        if(this.vy < 0) {
            const SIZE = this.cena.mapa.SIZE;
            if(this.cena.mapa.tiles[pmy][pmx] != 0) {
                const tile = {x:pmx*SIZE + SIZE/2, y:pmy*SIZE + SIZE/2, w:SIZE, h:SIZE}; 
                if(this.colidiuCom(tile)) {
                    this.vy = 0;
                    this.y = tile.y + tile.h/2 + this.h/2 + 1;
                }
            }
        }
    }

}