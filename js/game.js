class ScenePreguntas extends Phaser.Scene {
    constructor() {
        super({ key: 'ScenePreguntas' });
    }

    preload() {
        this.load.audio('click', 'mp3/click.mp3'); // Sonido de clic
        this.load.image('fondo', 'assets/fondo.jpg'); // Imagen de fondo atractiva
    }

    create() {
        // Tamaño dinámico basado en la resolución
        const { width, height } = this.scale;

        // Añadir fondo escalado
        this.add.image(width / 2, height / 2, 'fondo').setDisplaySize(width, height);

        const preguntas = [
            { pregunta: "¿Cuál es tu color favorito?", respuestas: ["Rojo", "Azul", "Verde"] },
            { pregunta: "¿Cuál es tu comida favorita?", respuestas: ["Pizza", "Sushi", "Hamburguesa"] },
            { pregunta: "¿Cuál es tu animal favorito?", respuestas: ["Perro", "Gato", "Pájaro"] },
            { pregunta: "¿Te gusta la música?", respuestas: ["Sí", "No"] },
            { pregunta: "¿Quieres pololear conmigo?", respuestas: ["Sí", "No"] }
        ];

        let preguntaIndex = 0;
        const clickSound = this.sound.add('click'); // Sonido de clic

        // Texto de la pregunta centrado y adaptado a la pantalla
        const preguntaTexto = this.add.text(width / 2, height / 2, preguntas[preguntaIndex].pregunta, { 
            fontSize: `${Math.round(height * 0.05)}px`, 
            fill: '#ff69b4',
            align: 'center', 
            wordWrap: { width: width * 0.9 } // Ajustar texto a la anchura de la pantalla
        }).setOrigin(0.5);

        // Crear respuestas dinámicamente
        const crearRespuestas = (respuestas) => {
            // Limpiar respuestas previas
            this.children.removeAll();
            this.add.image(width / 2, height / 2, 'fondo').setDisplaySize(width, height); // Añadir fondo de nuevo

            // Mostrar pregunta
            preguntaTexto.setText(preguntas[preguntaIndex].pregunta);

            respuestas.forEach((respuesta, i) => {
                // Botón más estilizado
                const btnGraphics = this.add.graphics();
                btnGraphics.fillStyle(0x008CBA, 1); // Fondo de color
                btnGraphics.fillRoundedRect(width * 0.1, height * (0.3 + i * 0.15), width * 0.8, height * 0.1, 20); // Botón adaptado
                btnGraphics.lineStyle(4, 0xffffff, 1); // Borde blanco más grueso
                btnGraphics.strokeRoundedRect(width * 0.1, height * (0.3 + i * 0.15), width * 0.8, height * 0.1, 20);

                // Texto de respuesta
                const respuestaBtn = this.add.text(width / 2, height * (0.35 + i * 0.15), respuesta, { 
                    fontSize: `${Math.round(height * 0.045)}px`, // Tamaño dinámico del texto
                    fill: '#fff' 
                }).setOrigin(0.5)
                  .setInteractive()
                  .on('pointerdown', () => {
                      clickSound.play(); // Reproduce sonido de clic
                      this.tweens.add({
                          targets: respuestaBtn,
                          scale: { from: 1, to: 0.9 },
                          duration: 100,
                          yoyo: true
                      });

                      // Cambiar escena al final
                      if (preguntaIndex === preguntas.length - 1) {
                          if (respuesta === "Sí") {
                              this.scene.start('SceneCorazones');
                          } else {
                              this.scene.start('SceneTomaComoSi');
                          }
                      } else {
                          preguntaIndex++;
                          crearRespuestas(preguntas[preguntaIndex].respuestas);
                      }
                  })
                  .on('pointerover', () => {
                      respuestaBtn.setStyle({ fill: '#ff69b4' }); // Cambiar color al pasar el ratón o tocar
                  })
                  .on('pointerout', () => {
                      respuestaBtn.setStyle({ fill: '#fff' }); // Regresar al color original
                  });
            });
        };

        // Inicializar con las primeras respuestas
        crearRespuestas(preguntas[preguntaIndex].respuestas);
    }
}

class SceneCorazones extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneCorazones' });
    }

    preload() {
        this.load.image('fondoC', 'assets/fondoCorazones.jpg'); // Fondo de corazones
        this.load.image('corazon', 'assets/corazon.png'); // Cargar imagen de corazón
        this.load.audio('bgMusic', 'mp3/bgMusic.mp3'); // Música de fondo
    }

    create() {
        const { width, height } = this.scale;

        // Añadir fondo de corazones
        this.add.image(width / 2, height / 2, 'fondoC').setDisplaySize(width, height);

        this.add.text(width / 2, height * 0.1, "¡Gracias por aceptar! 💖", { 
            fontSize: `${Math.round(height * 0.04)}px`, 
            fill: '#ff69b4',
            align: 'center' 
        }).setOrigin(0.5);

        // Reproducir música de fondo
        const bgMusic = this.sound.add('bgMusic');
        bgMusic.play({ loop: true, volume: 0.3 });

        // Crear corazones animados que caen desde arriba
        for (let i = 0; i < 10; i++) {
            const corazon = this.add.image(Phaser.Math.Between(width * 0.05, width * 0.95), -50, 'corazon');
            this.tweens.add({
                targets: corazon,
                y: height, // Cae hasta el final de la pantalla
                duration: Phaser.Math.Between(3000, 5000),
                ease: 'Bounce.easeOut',
                repeat: -1,
                delay: Phaser.Math.Between(0, 500)
            });
        }
    }
}

class SceneTomaComoSi extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneTomaComoSi' });
    }

    preload() {
        this.load.image('fondoC', 'assets/fondoCorazones.jpg'); // Fondo de corazones
        this.load.image('corazon', 'assets/corazon.png'); // Cargar imagen de corazón
        this.load.audio('bgMusic', 'mp3/bgMusic.mp3'); // Música de fondo
    }

    create() {
        const { width, height } = this.scale;

        // Añadir fondo de corazones
        this.add.image(width / 2, height / 2, 'fondoC').setDisplaySize(width, height);

        this.add.text(width / 2, height * 0.1, "Tomaré eso como un sí 💖", { 
            fontSize: `${Math.round(height * 0.05)}px`, 
            fill: '#ff69b4',
            align: 'center' 
        }).setOrigin(0.5);

        // Reproducir música de fondo
        const bgMusic = this.sound.add('bgMusic');
        bgMusic.play({ loop: true, volume: 0.3 });

        // Crear corazones animados que caen desde arriba
        for (let i = 0; i < 10; i++) {
            const corazon = this.add.image(Phaser.Math.Between(width * 0.05, width * 0.95), -50, 'corazon');
            this.tweens.add({
                targets: corazon,
                y: height, // Cae hasta el final de la pantalla
                duration: Phaser.Math.Between(3000, 5000),
                ease: 'Bounce.easeOut',
                repeat: -1,
                delay: Phaser.Math.Between(0, 500)
            });
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [ScenePreguntas, SceneCorazones, SceneTomaComoSi],
    backgroundColor: '#000',
    scale: {
        mode: Phaser.Scale.RESIZE, // Escalado dinámico
        autoCenter: Phaser.Scale.CENTER_BOTH // Centrado automático
    }
};

const game = new Phaser.Game(config);
