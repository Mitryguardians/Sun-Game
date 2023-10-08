export class plateform {
    constructor(position) {
      this.position = position;
      this.height = 20;
      this.width = 30;
    }
  
    draw(ctx) {
      ctx.fillStyle = 'black';
      ctx.fillRect(
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  
    // Fonction pour détecter la collision avec un joueur donné
    checkCollisionWithPlayer(player) {
        // Vérifier la collision du haut et du bas
        if (
          player.position.x + player.width / 2 > this.position.x &&
          player.position.x - player.width / 2 < this.position.x + this.width &&
          player.position.y + player.height / 2 > this.position.y &&
          player.position.y - player.height / 2 < this.position.y + this.height
        ) {
          player.velocity.y = 0;
          player.isJumping = false;
          player.position.y = this.position.y - player.height / 2 - 1;
        }

      }
  }
  