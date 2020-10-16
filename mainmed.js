//Nome
firebase.auth().onAuthStateChanged(user => {
    if (user) {
          document.getElementById("nomeUser").innerHTML = user.displayName;      
    };
  });


//Lista de pacientes
/*function pacientes(){
  const user = firebase.auth().currentUser;
  let pacientes = [];
    firebase.firestore().collection('consultas').where("M_ID", "==", user.uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          pacientes.push({...doc.data(), id: doc.id});
        });
        let html = '';
        pacientes.forEach(paciente => {
          html += `<li id= ${paciente.P_ID}>`;
          html += `<h5> ${paciente.nomeP}</h5>`;
          html += `<h5> ${paciente.idadeP}</h5>`;
          html += `</li>`
        });
        document.getElementById('pacientes').innerHTML = html;

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}*/


//Consultas
//Futuramente fazer os scripts de consultas passadas e seguintes
function consultas(){
  const user = firebase.auth().currentUser;
  let consultas = [];
    firebase.firestore().collection('consultas').where("M_ID", "==", user.uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          consultas.push({...doc.data(), id: doc.id});
        });
        let html = '';
        consultas.forEach(consulta => {
          html += `<li id= ${consulta.id}>`;
          html += `<h5> ${consulta.dia} / ${consulta.mes}</h5>`;
          html += `<h5> ${consulta.horario}</h5>`;
          html += `<h5> ${consulta.paciente}</h5>`;
          html += `</li>`
        });
        document.getElementById('Mconsultas').innerHTML = html;

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
};