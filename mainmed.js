//Nome
firebase.auth().onAuthStateChanged(user => {
    if (user) {
          document.getElementById("nomeUser").innerHTML = user.displayName;
          
   //Pacientes
    let pacientes = [];
    firebase.firestore().collection('chat').where("Id_m", "==", user.uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          pacientes.push({...doc.data(), id: doc.id});
        });
        let html = '';
        pacientes.forEach(paciente => {
          html += `<li id= ${paciente.Id_p}>`;
          html += `<h5> ${paciente.paciente}</h5>`;
          html += `</li>`
        });
        document.getElementById('pacientes').innerHTML = html;

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


    //Chat

    let chat = [];
    firebase.firestore().collection('chat').where("Id_m", "==", user.uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
         chat.push({...doc.data(), id: doc.id});
        });
        let html = '';
        chat.forEach(paciente => {
          html += `<li data-id= ${conversa.id} onclick="chatpg(this)">`;
          html += `<h5> ${paciente.paciente}</h5>`;
          html += `</li>`
        });
        document.getElementById('chat').innerHTML = html;

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


    //Minhas consultas
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
  });

  //Ir para página do chat
  function chatpg(self){
    var consversaId = self.getAttribute("data-id");
    location.assign("http://localhost:5000/chat.html#" + consversaId);
  };


  //Disponibilizar horário
const bttAgendar = document.getElementById('btnConfirm');

bttAgendar.addEventListener('click', e =>{
    var dt = new Date();
    var weekday = dt.getDay();
    var mes = dt.getMonth()+1;
    var dtdia = dt.getDate();
    const user = firebase.auth().currentUser;
    const idM = user.uid;
    const nome = user.displayName;
    const diasem = document.getElementById('DiaSem').value;
    const init = document.getElementById('inicio').value;
    const final = document.getElementById('fim').value;
    const db = firebase.firestore();
    //const end = document.getElementById('endereco').value;
    var soma = weekday - diasem;
    e.preventDefault;
    
    switch (soma) {
        case 0:
            //soma 7 dias
            var x;
            for (x = dtdia + 7; x <= 31; x = x+7) {
                var i;
                for (i = init; i <= final; i++) {
              
                      db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                         // endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes
                      }).then(function() {
                         console.log("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });

              } ;
            };
          break;
        case 6 :
            // 1dia
            var x;
            for (x = dtdia + 1; x <= 31; x = x+7) {
                var i;
                for (i = init; i <= final; i++) {
                   db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                         // endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case -1:
            // 1dia
            var x;
            for (x = dtdia + 1; x <= 31; x = x+7) {
                var i;
                for (i = init; i <= final; i++) {
                   db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                         // endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case 5:
            // 2dia
            var x;
            for (x = dtdia + 2; x < 31; x = x+7) {
                var i;
                for (i = init; i <= final; i++) {
                  
                     db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                         // endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                };
            };
        
          break;
          case -2:
            // 2dia
            var x;
            for (x = dtdia + 2; x < 31; x = x+7) {
                var i;
                for (i = init; i <= final; i++) {
                  
                     db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                         // endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                };
            };
        
          break;
          case 4:
            // 3dia
            var x;
            for (x = dtdia + 3; x <= 31; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                    db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                         // endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case -3:
            // 3dia
            var x;
            for (x = dtdia + 3; x <= 31; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                    db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                         // endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case 3:
            // 4dia
            var x;
            for (x = dtdia + 4; x <= 31; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                      db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                         // endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case -4:
            // 4dia
            var x;
            for (x = dtdia + 4; x <= 31; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                      db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                         // endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case 2:
            // 5dia
            var x;
            for (x = dtdia + 5; x <= 31; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                    db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          //endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case -5:
            // 5dia
            var x;
            for (x = dtdia + 5; x <= 31; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                    db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          //endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case 1:
            // 6dia
            var x;
            for (x = dtdia + 6; x <= 31; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                     db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          //endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case -6:
            // 6dia
            var x;
            for (x = dtdia + 6; x <= 31; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                     db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          //endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
      };
});