//Nome
firebase.auth().onAuthStateChanged(user => {
    if (user) {
          document.getElementById("nomeUser").innerHTML = user.displayName;      
    };
  });

  //Minhas consultas
  let consultas = [];
  firebase.firestore().collection('consultas').where("P_ID", "==", user.uid)
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
        html += `<h5> ${consulta.medico}</h5>`;
        html += `</li>`;
      });
      document.getElementById('Pconsultas').innerHTML = html;

  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });     
};
});


//Exibe a lista de médicos

/*function exibir(id){
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
    };*/

  var pesquisa = firebase.firestore().collection('users').where("tipo", "==", "medico");

  let medicos = [];
    
    pesquisa.get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            medicos.push({...doc.data(), id: doc.id});
          });
          let html = '';
          medicos.forEach(med => {
            html += `<div id= ${med.id}>`;
            html += `<li>`;
            html += `<h5> ${med.nome}</h5>`;
            html += `<h5 id= "${med.id}a"> Conveniado </h5>`;
            html += `<h5 id= "${med.id}b"> Telemedicina </h5>`;
            html += `<h5> ${med.especialidade}</h5>`;
            html += `</li>`;
            html += `<li>`;
            html += `<h5> Horários: </h5>`;
            html += `<span id="hrs"></span>`;

            refs = firebase.firestore().collection('consultas').where("M_ID", "==", med.id);
            let horarios = [];
            refs.get().then(function(querySnapshot){
              querySnapshot.forEach(function(doc){
                horarios.push({...doc.data(), id:doc.id});
                let html2 = '';
                horarios.forEach(hor =>{
                  html2 += `<div data-id = ${hor.id} onclick="agendar(this)">`;
                  html2 += `<p>Dia: ${hor.dia} /${hor.mes} </p>`;
                  html2 += `<p>Hora: ${hor.horario} </p>`;
                  html2 += `</div>`;
                });
                document.getElementById('hrs').innerHTML = html2;
              });
            });

            html += `</li>`;
            html += `</div>`;

            banco = firebase.firestore().collection('users').doc(med.id);

            banco.onSnapshot(snapshot =>{
              var oid = med.id ;
              var novoID = oid + "a";
              var novoID2 = oid + "b";
  
              var convenio = snapshot.data().convenio;
              var telemed = snapshot.data().telemedicina;
              if(convenio == "n"){
               document.getElementById(novoID).style = "visibility: hidden;";
                  };
              if(telemed == "n"){
              document.getElementById(novoID2).style = "visibility: hidden;";
            };
            });

        });
          document.getElementById('meds').innerHTML = html;
  
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });


//agendar consultas
    function agendar(self){
        var consultaId = self.getAttribute("data-id");
        const user = firebase.auth().currentUser;
        const idP = user.uid
        const info = firebase.firestore().collection('users').doc(user.uid);
        const consultaM = firebase.firestore().collection('consultas').doc(consultaId);
    
        info.onSnapshot(snapshot =>{
            var nome = snapshot.data().nome;
    
            consultaM.update({
                P_ID : idP,
                paciente : nome,
                status : 'indisponível'
            });
        });
    };


//Futuramente fazer os scripts de consultas passadas e seguintes



