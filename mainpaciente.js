//Nome
firebase.auth().onAuthStateChanged(user => {
    if (user) {
          document.getElementById("nomeUser").innerHTML = user.displayName;      
    };
  });


//Exibe a lista de médicos
function exibir(id){
    let medicos = [];
    var valor = id;

    switch (valor) {
        case "psicologo":
            var pesquisa = firebase.firestore().collection('users').where("especialidade", "==", "psicologo");
          break;
        case "dermatologista":
            var pesquisa = firebase.firestore().collection('users').where("especialidade", "==", "dermatologista");
          break;
        default:
            var pesquisa = firebase.firestore().collection('users').where("tipo", "==", "medico");
      }
    
    pesquisa.get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            medicos.push({...doc.data(), id: doc.id});
          });
          let html = '';
          medicos.forEach(med => {
            html += `<li id= ${med.id}>`;
            html += `<h5> ${med.nome}</h5>`;
            html += `<h5> ${med.especialidade}</h5>`;
            html += `</li>`
          });
          document.getElementById('meds"').innerHTML = html;
  
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    };


//Consultas

//Futuramente fazer os scripts de consultas passadas e seguintes
function consultas(){
    const user = firebase.auth().currentUser;
    let consultas = [];
      firebase.firestore().collection('users').where("P_ID", "==", user.uid)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            consultas.push({...doc.data(), id: doc.id});
          });
          let html = '';
          consultas.forEach(consulta => {
            html += `<li id= ${consulta.id}>`;
            html += `<h5> ${consulta.data}</h5>`;
            html += `<h5> ${consulta.médico}</h5>`;
            html += `</li>`
          });
          document.getElementById('Pconsultas').innerHTML = html;
  
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
}
