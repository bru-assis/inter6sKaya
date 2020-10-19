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
          html += `<li id= ${paciente.Id_p}>`;
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