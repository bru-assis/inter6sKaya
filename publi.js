var valor = location.hash.split("#")[1];

var db = firebase.firestore().collection('publicacoes').doc(valor);

db.onSnapshot(snapshot =>{
    var med = snapshot.data().nome;
    var dataP= snapshot.data().dataP;
    var title = snapshot.data().title;
    var text = snapshot.data().text;

    document.getElementById('medico').innerHTML = med;
    document.getElementById('dataP').innerHTML = dataP;
    document.getElementById('title').innerHTML = title;
    document.getElementById('text').innerHTML = text;
});