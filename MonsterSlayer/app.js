new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function () {
        this.gameIsRunning =  true;
        this.playerHealth= 100;
        this.monsterHealth= 100;
        this.turns = [];
    },
    attack: function () {
        damage = this.calculateDamage(10,3)
        this.monsterHealth -= damage;
        if(this.checkWinner()){
            return;
        }
        this.turns.unshift({
            isPlayer: true,
            text : "Player hits monster for " +damage
        });

        this.monsterAttack();
    },
    specialAttack: function () {
        this.monsterHealth -= this.calculateDamage(20, 10);
        if (this.checkWinner()) {
            return;
        }
        this.turns.unshift({
          isPlayer: true,
          text: "Player hits monster hard for " + damage
        });
        this.monsterAttack();
    },
    heal: function () {
        if(this.playerHealth <=90) {
            this.playerHealth +=10;
        } else {
            this.playerHealth= 100;
        }
         this.turns.unshift({
           isPlayer: true,
           text: "Player heals for 10"
         });
        this.monsterAttack();
        
    },
    giveUp: function () {
        this.gameIsRunning = false;
    },
    monsterAttack: function () {
        damage = this.calculateDamage(12, 5)
        this.playerHealth -= damage;
        this.checkWinner();
        this.turns.unshift({
            isPlayer: false,
            text : "Monster hits monster for " +damage
        });
    },
    calculateDamage: function (max,min) {
        return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWinner: function () {
        if (this.monsterHealth <= 0) {
            if(confirm("you won!! New Game?")){
                this.startGame();
            } else {
                this.gameIsRunning = false;
            }
        return true;
        } else if (this.playerHealth <= 0) {
            if (confirm("You lost!! New Game?")) {
                this.startGame();
            } else {
                this.gameIsRunning = false;
            }
            return true;
        }
        return false;
    }
}
});