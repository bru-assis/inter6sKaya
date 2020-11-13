var user = firebase.auth().currentUser;
var dt = new Date();
var d = dt.getDate();
var m = dt.getMonth()+1;

let consultas = [];
        firebase.firestore().collection('consultas').where("M_ID", "==", user.uid).where("dia","==", d).where("mes","==", m)
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