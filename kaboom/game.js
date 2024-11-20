kaboom({
    global: true,      // Permet d'utiliser les fonctions de Kaboom directement
    fullscreen: true,  // Affiche le jeu en plein écran
    scale: 2,          // Facteur de mise à l'échelle
    debug: true,       // Affiche des outils de débogage
    clearColor: [0, 0, 0, 1], // Couleur de fond : noir
});
kaboom(); // Initialisation de Kaboom . js
scene("game", () => {
    layers(["bg", "obj", "ui"], "obj"); // Définir les couches de
    jeu
    // D’autres configurations du jeu
});
start("game"); // Démarrer la scène  "game"
const mario = add([
    sprite("mario"),
    pos(100, 100),
    body(),
]);
keyDown("left", () => {
    mario.move(-120, 0);
});
keyDown("right", () => {
    mario.move(120, 0);
});
keyPress("space", () => {
    if (mario.grounded()) {
        mario.jump(400);
    }
});
const enemy = add ([
    sprite ("enemy") ,
    pos (300 , 100) ,
    body () ,
    { dir : -1 }
    ]) ;
    enemy . action (() => {
    enemy . move ( enemy . dir * 50 , 0) ;
    if ( enemy . pos . x <= 0 || enemy . pos . x >= width () ) {
    enemy . dir *= -1;
    }
    }) ;
    mario . collides ("enemy" , () => {
    go ("gameover") ; // Si Mario touche un ennemi , fin du jeu
    }) ;
    const coin = add ([
        sprite ("coin") ,
        pos (150 , 120) ,
        area () ,
        "coin"
        ]) ;
        mario . collides ("coin" , ( c ) => {
        destroy ( c ) ; // Détruire la pièce
        score += 1; // Incrémenter le score
        }) ;
        const level = [
            "====================",
            "=                  =",
            "=     ==   ==      =",
            "=       ==         =",
            "=     ==   ==      =",
            "=                  =",
            "===================="
        ];
        const map = addLevel ( level , {
            width : 32 ,
            height : 32 ,
            pos : vec2 (0 , 0) ,
            "=": () => [
            sprite ("block") ,
            solid () ,
            { is_block : true }
            ] ,
            }) ;
            let score = 0;
const scoreLabel = add ([
text ( score ) ,
pos (12 , 12) ,
layer ("ui") ,
{ value : score }
]) ;
action ("coin" , ( c ) => {
scoreLabel . text = score ;
}) ;
mario . action (() => {
    if ( mario . grounded () ) {
    mario . jump (400) ;
    }
    }) ;
    scene ("gameover" , () => {
        add ([ text ("Game Over") , pos (120 , 120) ]) ;
        keyPress (" space " , () => {
        go ("game") ; // Recommencer le jeu
        }) ;
        }) ;
        mario . play ("run") ;
sound ("jump" , { volume : 0.5 }) ;
const bat = add ([
    sprite (" bat ") ,
    pos (200 , 100) ,
    body () ,
    { dir : 1 }
    ]) ;
    bat . action (() => {
    bat . move ( bat . dir * 40 , 0) ;
    if ( bat . pos . x <= 0 || bat . pos . x >= width () ) {
    bat . dir *= -1;
    }
    }) ;
    const portal = add ([
        sprite ("portal") ,
        pos (350 , 200) ,
        area () ,
        "portal"
        ]) ;
        mario . collides ("portal" , () => {
        go ("next_level") ; // Passer au niveau suivant
        }) ;
        const mushroom = add ([
            sprite ("mushroom") ,
            pos (250 , 150) ,
            area () ,
            "mushroom"
            ]) ;
            mario . collides ("mushroom" , ( m ) => {
            destroy ( m ) ;
            mario . bigger () ; // Mario devient plus grand
            }) ;
            let timeLeft = 30;
const timerLabel = add ([
text ( timeLeft ) ,
pos (400 , 12) ,
layer ("ui") ,
]) ;
loop (1 , () => {
timeLeft -= 1;
timerLabel . text = timeLeft ;
if ( timeLeft <= 0) {
go ("gameover") ;
}
}) ;
const background = add ([
    sprite ("background") ,
    layer ("bg") ,
    pos (0 , 0) ,
    ]) ;
    const boss = add ([
        sprite ("boss") ,
        pos (400 , 50) ,
        health (10) ,
        ]) ;
        boss . action (() => {
        // Déplacez le boss et gérez ses actions
        }) ;
        scene ("next_level" , () => {
            // Chargez un nouveau niveau
            go ("game" , { level : 2 }) ;
            }) ;
            localStorage . setItem ("score" , score ) ;
            scene ("main_menu" , () => {
                add ([ text ("Press Enter to Start") , pos (100 , 100) ]) ;
                keyPress (" enter " , () => {
                go ("game") ;
                }) ;
                }) ;
                debug . log ("Game started !") ;