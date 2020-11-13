var user = firebase.auth().currentUser;
var medNome = user.displayName;
var meuId = user.uid;
var title = document.getElementById('titulo');
var text = document.getElementById('texto');
var subtitulo = document.getElementById('sub');
var dt = new Date();
var d = dt.getDay();
var m = dt.getMonth()+1;
var a = dt.getFullYear();
var dataStr = d + "/" + m + "/" + a;
var db = firebase.firestore().collection('users').doc(meuId);

db.collection('publicacoes').doc().set({
    nome: medNome,
    mId: meuId,
    dataP: dataStr,
    title: title.value,
    text: text.value,
    sub: subtitulo.value
}).catch(function(error) {
    console.log("Error getting documents: ", error);
});

