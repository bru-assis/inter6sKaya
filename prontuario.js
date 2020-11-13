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
});

var diagnostico = document.getElementById('diagnostico');

var refs = firebase.firestore().collection('consultas').where("P_ID", "==", valor).where("aconteceu", "==", "n")
.orderBy('dia', 'desc').orderBy('mes', 'desc').limit(1);

refs.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var tratamento = doc.data().medicamento;
      document.getElementById('tratamento').setAttribute("data-id" , tratamento);
      var consulta = firebase.firestore().collection('consultas').doc(doc.id);
      document.getElementById('selectMed').setAttribute("data-id" , doc.id);

      consulta.update({
        aconteceu: "s",
        diagnostico: diagnostico.value,
      }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
});
}).catch(function(error) {
    console.log("Error getting documents: ", error);
});

function selectMed(self){
    var tratamento = self.getAttribute("data-id");
    location.assign("selectMed.html#" + tratamento); 
};

var medId = document.getElementById('tratamento').getAttribute("data-id");

firebase.firestore().collection('meds').doc(medId).onSnapshot(snapshot =>{
    var nome = snapshot.data().nomeMed;
    var formula = snapshot.data().formula;
    var imagem = snapshot.data().imgURL;
    document.getElementById('nomeMed').innerHTML = nome;
    document.getElementById('formula').innerHTML = formula;
    document.getElementById('imgMed').style = "background-image: url('"+ imagem +"')";
})