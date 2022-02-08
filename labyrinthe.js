////////////////////////////////////////////////////////////////////////////////
/*Auteurs: Hani Berchan et Lucky Khounvongsa
  Date: 11/03/2020
  TP1
  
  Description du code
  Ce programme a pour but de generer un labyrinthe aleatoire base sur une 
  grille rectangulaire.
*/
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//                              Fonctions de base                             //
////////////////////////////////////////////////////////////////////////////////

/* parametres les plus utilises dans cette section
 * nx: nombre de murs horizontaux
 * ny: nombre de murs verticaux
 * x: coordonnee x de la cellule
 * y: coordonnee y de la cellule
 */


/* La fonction iota retourne un tableau de longueur n(entier non-negatif) 
 * comprenant les valeurs entieres de 0 a n-1 inclusivement.
 */

var iota = function (n){
    var tab = [];                   // Creer un tableau de longueur n
        for( var i = 0; i<n; i++){
            tab[i] = i;             // Ajoute les valeurs de 0 a n-1
        }                           // dans le tableau 
    return tab;
};

/* La fonction coord affiche les coordonnees (x,y) de chaque
 * cellule de la grille. 
 */

var coord = function(nx,ny){
    var grille = [];
    for (var j=0; j < ny; j++){
        for( var i=0; i < nx; i++){
            var cell = {"x":i,"y":j};
          grille.push(cell);
        }
    }
    return grille;
};

/* Fonction contient retourne un booleen indiquant si un nombre x est contenu
 * dans le tableau tab
 */
var contient = function(tab,x){
    for ( var i = 0; i<tab.length; i++){
        if(tab[i] == x){
            return true;      // x est contenu dans tab
        }
    }
    return false;             // x n'est pas contenu dans tab 
};

/* La fonction ajouter retourne un nouveau tableau avec 
 * le meme contenu que tab sauf que x est ajoute a la ﬁn 
 * s’il n’est pas deja compris dans tab. 
 */

var ajouter = function(tab,x){
    if(contient(tab,x)==false){
        tab.push(x);
    }
    return tab;
};

/*  La fonction retirer retourne un nouveau tableau avec le 
 *  meme contenu que tab sauf que x est retire du tableau.
 */

var retirer = function(tab,x){
    var garder = [];      
    if(contient(tab,x)== true){
        for(var i=0; i<tab.length; i++){
            if(tab[i] != x){
                garder.push(tab[i]); // concatener valeur non egale a x
            }
        }
    }else{
        return tab;
    }
    return garder;
};

/* La fonction voisins prend la coordonnee x et y de la cellule, 
 * le nombre de murs horizontaux et verticaux et retourne le
 * numero des cellules voisines
 */

var voisins = function(x,y,nx,ny){
    var CellVoisin = [];
    var coordonnee = coord(nx,ny);
    var n = iota(coordonnee.length);   // nombre de cellules
    var i = x+y*nx;                    // mur Nord

    // condition if pour les cellules qui ne sont pas sur la 1ere ligne 
     if(coordonnee[i].y != 0){
        var vN = n[i-nx];              // Voisin Nord
        CellVoisin.push(vN);
     }
   // condition if pour les cellules qui ne sont pas sur la 1ere colonne
     if(coordonnee[i].x != 0){
        var vO = n[i-1];               // Voisin Ouest
        CellVoisin.push(vO);
     }
   // condition if pour les cellules qui ne sont pas sur la derniere ligne
      if(coordonnee[i].y != ny-1){
        var vS = n[i+nx];              // Voisin Sud
        CellVoisin.push(vS); 
      }  
   // condition if pour les cellules qui ne sont pas sur la derniere colonne
      if(coordonnee[i].x != nx-1){
        var vE = n[i+1];               // Voisin Est
        CellVoisin.push(vE);
      }
    
    return  CellVoisin;
};


/* la fonction repere prend les coordonnees x et y d'une cellule, 
 * le nombre de mur horizontaux et retourne les murs Nord, Sud, 
 * Est et Ouest d'une cellule. 
 */
var repere = function(x,y,nx){
    var nord = x + y*nx;                //Mur Nord
    var est = 1 + x + y*(nx+1);         //Mur Est
    var sud = x + (y+1)*nx;             //Mur Sud  
    var ouest = x + y*(nx+1);           //Mur Ouest 
    return {"N":nord,"O":ouest,"S":sud,"E":est};  
};

////////////////////////////////////////////////////////////////////////////////
//                      Labyrinthe sous forme de tableau                      //
////////////////////////////////////////////////////////////////////////////////

// La fonction prodMurs retourne tous les murs horizontaux et verticaux
var prodMurs = function(nx,ny){
    var h = iota(nx*(ny+1));       //murs horizontaux
    var v = iota((nx+1)*ny);       //murs verticaux
    return {"h":h,"v":v};
};

/* La fonction choixcellule permet de choisir au hasard le numero d'une 
 * cellule (le mur Nord) en fonction de la dimension de la grille
 */

var choixcellule = function (nx,ny,coordonnee){
    var nouvcoord = coordonnee;
    var choixcoord = nouvcoord[Math.floor(Math.random()*nouvcoord.length)];
 
    return [repere(choixcoord.x,choixcoord.y,nx).N];
 };

/* La fonction cellulevoisine retourne la cellule avec la cavite et les 
 * cellules voisines.
 * numeroCellule: numero de la cellule (ou mur Nord)
 */
var cellulevoisine = function(nx,ny,numeroCellule){
    var nouvcoord = coord(nx,ny);             // coordonnees (x,y)
    var cave = nouvcoord[numeroCellule];      // numero de la cellule choisie
    var front = [];
    var voisin = voisins(cave.x,cave.y,nx,ny);
    for (var i = 0; i<voisin.length;i++){
        front.push(nouvcoord[voisin[i]]);     // numero de cellules voisines
    }
   
    return {"Cave": cave, "Voisin": front}
};

/* La fonction frontiere retourne les cellules a la frontiere de la 
 * cellule choisie.
 * numeroCellule: numero de la cellule (ou mur Nord)
 */
  var frontiere = function(nx,ny,numeroCellule){
    var front = [];
    var frontiere = cellulevoisine(nx,ny,numeroCellule).Voisin;
    for (var i =0; i<frontiere.length;i++){
        front.push(repere(frontiere[i].x,frontiere[i].y,nx).N);
    }
    return front;
};

// La fonction frontiereAleatoire retourne une frontiere aleatoire 
var frontiereAleatoire = function (front){
    return front[Math.floor(Math.random()*front.length)];
};


// La fonction supEntreeSortie supprime le mur horizontal de 
// l'entree et de la sortie
var supEntreeSortie = function (murs) {
    return {h: murs.h.slice(1, murs.h.length - 1), v: murs.v};
};

/* La fonction supMurHouV supprime un mur horizontal ou vertical.
 * le mur supprime depend de la cellule et son voisin.
 * nouvCell: cellule choisie.
 * nouvVoisin: cellule voisin.
 */
var supMurHouV = function(nx,nouvCell,nouvVoisin,murs,coordonnee){
    var c = coordonnee;              // coordonnees {x,y} de chaque cellule
    
    var mursH = murs.h;              // murs horizontaux
    var mursV = murs.v;              // murs verticaux

    var caviteX = c[nouvCell].x;     // coordonnee x de la cellule
    var caviteY = c[nouvCell].y;     // coordonnee y de la cellule
    
    var caviteXv = c[nouvVoisin].x;  // coordonnee x de la cellule voisine
    var caviteYv = c[nouvVoisin].y;  // coordonnee y de la cellule voisine
    
    // supprime le mur commun entre la cellule et le voisin
    var nouvRepere = repere(caviteX,caviteY,nx);     
    if(caviteX == caviteXv){
        if(caviteY < caviteYv){
           var murHretirer = nouvRepere.S;          // supprimer mur Sud
               mursH = retirer(mursH, murHretirer);
        }else{
           var murHretirer = nouvRepere.N;          // supprimer mur Nord
               mursH = retirer(mursH, murHretirer);
        }
    }else{
        if(caviteX < caviteXv){
           var murVretirer = nouvRepere.E;          // supprimer mur Est
               mursV = retirer(mursV, murVretirer);
        }else{
           var murVretirer = nouvRepere.O;          // supprimer mur Ouest
               mursV = retirer(mursV, murVretirer);
        }
    }
    return {"h": mursH, "v": mursV};      // afficher tous les murs sauf celui                                
};                                        // qui est supprime

/* La fonction nouveauFrontiere retourne la cavite voisine choisie 
 * aleatoirement, et les cellules voisines qui ne sont pas dans la cavite. 
 * Cette fonction verifie si les cellules sont dans le tableau cave.
 * Si les tableaux ne sont pas dans le tableau cave, elle ajoute la cellule 
 * dans le tableau frontV.
 * frontV: tableau des cellules voisins qui ne sont pas encore dans la cavite
 * caveV: tableau des cellules voisines qui sont deja dans la cavite
 */
var nouveauFrontiere = function(cavite,nx,ny,cave,coordonnee){
  var frontV = [];       
  var caveV = [];       
    // cellule voisine de la nouvelle cellule cavite
  var celluleVo = voisins(coordonnee[cavite].x,coordonnee[cavite].y,nx,ny);
   
  for( var i = 0;i<celluleVo.length;i++){
    if (contient(cave, celluleVo[i])== true) {
        caveV.push(celluleVo[i]);
    }
    else {
        frontV.push(celluleVo[i]);
    }
  }
// choisir aleatoirement entre la cellule voisine et la nouvelle cellule dans
// la cavite (les deux sont dans le tableau cave)
  var  caveVrandom = caveV[Math.floor(Math.random()*caveV.length)]; 
  return {cave: caveVrandom, front: frontV}
};


// La fonction prodLaby retourne un tableau qui contient les murs horizontaux
// et les murs verticaux a dessiner.
var prodLaby = function(nx,ny){
    
    var coordonnee = coord(nx,ny);           // coordonnee (x,y)
    
    var murs = prodMurs(nx,ny);              // murs horizontaux et verticaux
    // cave: 1ere cellule choisie aleatoirement
    var cave = choixcellule(nx,ny,coordonnee); 
    // front: tous les voisins de la cellule choisie
    var front = frontiere(nx,ny,cave);        
    
    // fin de la boucle lorsque toutes les cellules sont ajoutees dans cave  
    while (front.length != 0) {     
        
       var nouvellecavite = frontiereAleatoire(front); // choix d'un voisin
       // verifier les cellules voisines dans le tableau cavite et front
       var voisins = nouveauFrontiere(nouvellecavite,nx,ny,cave,coordonnee);
       // supprimer le mur (horizontal ou vertical)    
        
       var murs = supMurHouV(nx,nouvellecavite,voisins.cave,murs,coordonnee);
       // ajouter le mur supprime dans cave
       cave = ajouter(cave,nouvellecavite);  
        
       var nouvelleFront = retirer(front, nouvellecavite); 
       for (var i = 0; i < voisins.front.length; i++) {
           // ajoute les cellules qui ne sont pas dans cave
           nouvelleFront = ajouter(nouvelleFront, voisins.front[i]); 
       }
       front = nouvelleFront;
    }
    // supprimer le mur entree et sortie   
    murs = supEntreeSortie(murs,nx,ny);
    return murs;
};
////////////////////////////////////////////////////////////////////////////////
//                       Dessin des murs et Labyrinthe                        //
////////////////////////////////////////////////////////////////////////////////

/* parametres utilises pour dessiner les murs et le labyrinthe
 * nx: nombre de murs horizontaux
 * ny: nombre de murs verticaux
 * dx: distance entre le centre du labyrinthe et la position en x
 * dy: distance entre le centre du labyrinthe et la position en y
 * pas: la longueur de nx et de ny
 * murV: mur vertical
 * murH: mur horizontal
 */

// Tracer mur vertical
var tracerMurV = function(nx,ny,pas,murV){
  var dx = murV % (nx + 1)* pas - nx*pas/ 2;
  var dy = ny*pas/2 - Math.floor(murV/(nx+1))*pas;
  pu(); mv(dx,dy); pd(); mv(dx, dy -pas);
};

// Tracer mur horizontal
var tracerMurH = function(nx,ny,pas,murH){
  var dx = murH % nx * pas - nx*pas/ 2;
  var dy = ny*pas/2 - Math.floor(murH/nx)*pas;
  pu(); mv(dx,dy); pd(); mv(dx+pas, dy);
};

// Tracer des murs horizontaux et verticaux
var tracerMurs = function (murs,pas, nx, ny) {
    for (var i = 0; i < murs.v.length; i++) { 
        tracerMurV(nx, ny, pas,murs.v[i]);
    }
    for (var i = 0; i < murs.h.length; i++) { 
        tracerMurH(nx, ny, pas,murs.h[i]);
    }
};

// La fonction deplace la tortue a l'entree 
var entreeLaby = function(nx,ny,pas){
    // nx-1.5 permet de positionner la tortue au milieu du mur 0
    pu(); fd(ny*pas,(nx-1.5)*pas);rt(180);pd();
};

/* La fonction laby trace le labyrinthe en fonction du nombre 
 * de murs horizontaux et verticaux, ainsi que la longueur des 
 * murs
 */
var laby = function (nx, ny, pas) {
    tracerMurs(prodLaby(nx, ny, pas), pas, nx, ny);
    entreeLaby(nx,ny,pas);
};

// Afficher le labyrinthe
print(laby(10,9,20));

////////////////////////////////////////////////////////////////////////////////
//                              Tests unitaires                               //
////////////////////////////////////////////////////////////////////////////////

// La fonction iota
var testiota = function(){
    assert ( iota(5) == '0,1,2,3,4' );
    assert ( iota(0) == '' );
    assert ( iota(1) == '0')
    assert ( iota(-4) == '' );
    assert ( iota(10) =='0,1,2,3,4,5,6,7,8,9');
};

testiota();

// La fonction coord (coordonnee)
var testcoord = function(){
    assert ( coord(8,4)[0].x == 0 );
    assert ( coord(8,4)[12].y == 1 );
    assert ( coord(8,4).length == 32 );
    assert ( coord(8,4)[31].x == 7 );
    assert ( coord(8,4)[25].y == 3 );
};

testcoord();

// La fonction contient
var testcontient = function(){
  assert ( contient([9,2,5],2) == true );
  assert ( contient([9,2,5],4) == false );
  assert ( contient([4],4) == true );
  assert ( contient([],4) == false );
  assert ( contient([2,3,7],11) == false);
};

testcontient();

// La fonction ajouter
var testajouter = function(){
  assert ( ajouter([9,2,5],2) == '9,2,5');
  assert ( ajouter([9,2,5],4) == '9,2,5,4');
  assert ( ajouter([],4) == '4');
  assert ( ajouter([2,3,7],7) == '2,3,7');
  assert ( ajouter([2,3,7],11) == '2,3,7,11');
};

testajouter();

// La fonction retirer
var testretirer = function(){
  assert ( retirer([9,2,5],2) == '9,5');
  assert ( retirer([9,2,5],4) == '9,2,5');
  assert ( retirer([],4) == '');
  assert ( retirer([2,3,7],4) == '2,3,7');
  assert ( retirer([2,3,7],2) == '3,7');
};

testretirer();

// La fonction voisins
var testVoisins = function(){
  assert ( voisins(7,2,8,4) == '15,22,31');
  assert ( voisins(1,1,8,4) == '1,8,17,10');
  assert ( voisins(0,0,8,4) == '8,1');
  assert ( voisins(7,3,8,4) == '23,30');
  assert ( voisins(3,3,8,4) == '19,26,28');  
};
testVoisins();

// La fonction repere
var testrepere = function(){
    assert ( repere(0,0,8).N == 0); 
    assert ( repere(0,1,8).S == 16); 
    assert ( repere(7,3,8).O == 34);
    assert ( repere(7,1,8).E == 17);
};
testrepere();

// La fonction produire mur (prodMurs)
var testprodMurs = function(){
    assert ( prodMurs(8,4).h[2] == 2);
    assert ( prodMurs(8,4).v[35] == 35);
};
testprodMurs();

// La fonction choixcellule (aleatoire: pas de test unitaire)

// La fonction cellulevoisine
// test unitaire pour la cellule numero 5 (x:5, y:0)
var testcellulevoisine = function(){
    assert ( cellulevoisine(8,4,5).Cave.x == 5);
    assert ( cellulevoisine(8,4,5).Cave.y == 0);
    assert ( cellulevoisine(8,4,5).Voisin[0].x == 4);
    assert ( cellulevoisine(8,4,5).Voisin[0].y == 0);
    assert ( cellulevoisine(8,4,5).Voisin[1].x == 5);
    assert ( cellulevoisine(8,4,5).Voisin[1].y == 1);
    assert ( cellulevoisine(8,4,5).Voisin[2].x == 6);
    assert ( cellulevoisine(8,4,5).Voisin[2].y == 0);
};
testcellulevoisine();

// La fonction frontiere
var testfrontiere = function(){
    assert ( frontiere(8,4,2) == '1,10,3');
    assert ( frontiere(8,4,10) == '2,9,18,11');
};
testfrontiere();

// La fonction nouvellefrontiere
// la valeur de la nouvelle cave est aleatoire, pas de test unitaire
var testnouvelleFrontiere = function(){
  assert ( nouveauFrontiere(20,8,4,[12,17,26,28,14],coord(8,4)).front
          == '19,21');
  assert ( nouveauFrontiere(5, 8, 4, [4,12,13,14,6],coord(8,4)).front == '');
  assert ( nouveauFrontiere(5, 8, 4, [4,12,13,14],coord(8,4)).front == '6');
};

testnouvelleFrontiere();

// La fonction prodLaby (aleatoire: pas de test unitaire)





