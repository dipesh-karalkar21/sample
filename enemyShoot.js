AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });
            console.log(position)

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            //Three.js Vector Variables
            var posEnemy = new THREE.Vector3()
            var posPlayer = new THREE.Vector3()


            //Get enemey and player position using Three.js methods
            var Enemy = els[i].object3D()
            var Player = document.querySelector("#weapon").object3D()
            
            Player.getWorldPosition(posPlayer)
            Enemy.getWorldPosition(posEnemy)

            //set the velocity and it's direction
            var direct = new THREE.Vector3()
            direct.subVectors(posPlayer,posEnemy).normalize()

            enemyBullet.setAttribute("velocity",direct.multiplyScalar(10))
            
            //Set dynamic-body attribute
            enemyBullet.setAttribute("dynamic-body",{
                mass : "0",
                shape : "sphere",
                radius : "0.1"
            })         
            

            //Get text attribute
            var life = document.querySelector("#countLife")
            var playerLife = parseInt(life.getAttribute("text").value)

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {
                    if(playerLife > 0){
                        playerLife-=1
                        life.setAttribute("text",{
                            value : playerLife,
                        })
                    }
                    if(playerLife <=0){
                        var gameOver = document.querySelector("#over")
                        gameOver.setAttribute("visible",true)
                        
                        scene.removeChild(els[i])
                    }
                }
            });

        }
    },

});