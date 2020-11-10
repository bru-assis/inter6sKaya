var valor = location.hash.split("#")[1];

var db = firebase.firestore().collection('users').doc(valor);

db.onSnapshot(snapshot =>{
    var paciente = snapshot.data().nome;
    var estado= snapshot.data().estado;
    var cidade = snapshot.data().cidade;
    var dt = snapshot.data().DtNascimento;

    document.getElementById('paciente').innerHTML = paciente;
    document.getElementById('estado').innerHTML = estado;
    document.getElementById('cidade').innerHTML = cidade;
    document.getElementById('dt').innerHTML = dt;

    //buscar as informacoes de historico e tratamento
});

var hist = document.getElementById('hist');
var antecedentes = document.getElementById('antecedentes');
var diagnostico = document.getElementById('diagnostico');

//pesquisar a última consulta e atualizar os campos dela, principalmente o de "aconteceu"