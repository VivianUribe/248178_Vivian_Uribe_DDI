// CLASE BASE
class Figura {

    constructor(posiciones, config) {

        this.inicio = { ...posiciones.inicio };
        this.fin = { ...posiciones.fin };

        this.colorLinea = config.colorLinea;
        this.colorRelleno = config.colorRelleno;
        this.grosor = config.grosor;
        this.opacidad = config.opacidad;

        this.soloBorde = config.soloBorde;
        this.soloRelleno = config.soloRelleno;
    }
}

// CUADRADO
export class Cuadrado extends Figura {

    constructor(posiciones, config) {

        super(posiciones, config);

        this.x = Math.min(this.inicio.x, this.fin.x);
        this.y = Math.min(this.inicio.y, this.fin.y);

        this.ancho = Math.abs(this.fin.x - this.inicio.x);
        this.alto = Math.abs(this.fin.y - this.inicio.y);
    }

    Dibujar(ctx) {

        ctx.globalAlpha = this.opacidad;

        if (!this.soloBorde) {

            ctx.fillStyle = this.colorRelleno;

            ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        }

        if (!this.soloRelleno) {

            ctx.strokeStyle = this.colorLinea;

            ctx.lineWidth = this.grosor;

            ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
        }

        ctx.globalAlpha = 1;
    }
}

// CIRCULO
export class Circulo extends Figura {

    constructor(posiciones, config) {

        super(posiciones, config);

        this.radio = Math.sqrt(
            (this.fin.x - this.inicio.x) ** 2 +
            (this.fin.y - this.inicio.y) ** 2
        );
    }

    Dibujar(ctx) {

        ctx.beginPath();

        ctx.globalAlpha = this.opacidad;

        ctx.arc(this.inicio.x, this.inicio.y, this.radio, 0, Math.PI * 2);

        if (!this.soloBorde) {

            ctx.fillStyle = this.colorRelleno;

            ctx.fill();
        }

        if (!this.soloRelleno) {

            ctx.strokeStyle = this.colorLinea;

            ctx.lineWidth = this.grosor;

            ctx.stroke();
        }

        ctx.globalAlpha = 1;
    }
}

//  ESTRELLA
export class Estrella extends Figura {

    constructor(posiciones, config) {

        super(posiciones, config);

        this.radio = Math.sqrt(
            (this.fin.x - this.inicio.x) ** 2 +
            (this.fin.y - this.inicio.y) ** 2
        );
    }

    Dibujar(ctx) {

        let rot = Math.PI / 2 * 3;
        let x = this.inicio.x;
        let y = this.inicio.y;
        let spikes = 5;
        let outerRadius = this.radio;
        let innerRadius = this.radio / 2;

        ctx.beginPath();

        ctx.moveTo(x, y - outerRadius);

        for (let i = 0; i < spikes; i++) {

            ctx.lineTo(
                x + Math.cos(rot) * outerRadius,
                y + Math.sin(rot) * outerRadius
            );

            rot += Math.PI / spikes;

            ctx.lineTo(
                x + Math.cos(rot) * innerRadius,
                y + Math.sin(rot) * innerRadius
            );

            rot += Math.PI / spikes;
        }

        ctx.lineTo(x, y - outerRadius);

        ctx.closePath();

        ctx.globalAlpha = this.opacidad;

        if (!this.soloBorde) {

            ctx.fillStyle = this.colorRelleno;

            ctx.fill();
        }

        if (!this.soloRelleno) {

            ctx.strokeStyle = this.colorLinea;

            ctx.lineWidth = this.grosor;

            ctx.stroke();
        }

        ctx.globalAlpha = 1;
    }
}

// LINEA
export class Linea {

    constructor(posiciones, color, grosor, opacidad) {

        this.inicio = { ...posiciones.inicio };
        this.fin = { ...posiciones.fin };

        this.color = color;
        this.grosor = grosor;
        this.opacidad = opacidad;
    }

    Dibujar(ctx) {

        ctx.beginPath();

        ctx.globalAlpha = this.opacidad;

        ctx.strokeStyle = this.color;

        ctx.lineWidth = this.grosor;

        ctx.lineCap = "round";

        ctx.moveTo(this.inicio.x, this.inicio.y);

        ctx.lineTo(this.fin.x, this.fin.y);

        ctx.stroke();

        ctx.globalAlpha = 1;
    }
}

// BORRADOR 
export class Borrador {

    constructor(posiciones, grosor) {

        this.inicio = { ...posiciones.inicio };
        this.fin = { ...posiciones.fin };

        this.grosor = grosor;
    }

    Dibujar(ctx) {

        ctx.save();

        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();

        ctx.lineWidth = this.grosor;

        ctx.lineCap = "round";

        ctx.moveTo(this.inicio.x, this.inicio.y);

        ctx.lineTo(this.fin.x, this.fin.y);

        ctx.stroke();

        ctx.restore();
    }
}

// STICKER
export class Sticker {

    constructor(posiciones, url) {

        this.inicio = { ...posiciones.inicio };
        this.fin = { ...posiciones.fin };

        this.img = new Image();

        this.img.src = url;
    }

    Dibujar(ctx) {

        const ancho = this.fin.x - this.inicio.x;

        const alto = this.fin.y - this.inicio.y;

        ctx.drawImage(
            this.img,
            this.inicio.x,
            this.inicio.y,
            ancho,
            alto
        );
    }
}