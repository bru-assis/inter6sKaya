  //Minhas consultas
  //Consultas anteriores
  let consultas = [];
  firebase.firestore().collection('consultas').where("P_ID", "==", user.uid).where("aconteceu","==","s")
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        consultas.push({...doc.data(), id: doc.id});
      });
      let html = '';
      consultas.forEach(consulta => {
        html += `<li data-id= ${consulta.id} onclick="consultaurl(this)">`;
        html += `<h5> ${consulta.dia} / ${consulta.mes}</h5>`;
        html += `<h5> ${consulta.horario}</h5>`;
        html += `<h5> ${consulta.medico}</h5>`;
        html += `</li>`;

        banco = firebase.firestore().collection('consultas').doc(consulta.id);

        banco.onSnapshot(snapshot =>{
          var telemed = snapshot.data().telemedicina;
          if(telemed == "s"){
          document.getElementById(consulta.id).style = "background-color: orange;";
        }else{
            document.getElementById(consulta.id).style = "background-color: blue;";
        };
        });
      });
      document.getElementById('Cprox').innerHTML = html;

    })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
    }); 
    
    //Consultas seguintes
    let consultas2 = [];
  firebase.firestore().collection('consultas').where("P_ID", "==", user.uid).where("aconteceu","==","n")
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        consultas2.push({...doc.data(), id: doc.id});
      });
      let html = '';
      consultas2.forEach(consulta => {
        html += `<li data-id= ${consulta.id} onclick="consultaurl(this)">`;
        html += `<h5> ${consulta.dia} / ${consulta.mes}</h5>`;
        html += `<h5> ${consulta.horario}</h5>`;
        html += `<h5> ${consulta.medico}</h5>`;
        html += `<a data-value="${consulta.endereco}" onclick="googlemaps(this)"> Ver no mapa</a>`;
        html += `</li>`;

        banco = firebase.firestore().collection('consultas').doc(consulta.id);

        banco.onSnapshot(snapshot =>{
          var telemed = snapshot.data().telemedicina;
          if(telemed == "s"){
          document.getElementById(consulta.id).style = "background-color: orange;";
        }else{
            document.getElementById(consulta.id).style = "background-color: blue;";
        };
        });
      });
      document.getElementById('Canteriores').innerHTML = html;

    })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
    });  

    
    function googlemaps(self){
        var end = self.getAttribute("data-value");
        var codificar = encodeURIComponent(end);
        var googlemaps = "https://maps.google.com.br/maps?q="
         +codificar+"&z=17";
        
        location.assign(googlemaps);
         };   

         function consultaurl(self){
            var consultaId = self.getAttribute("data-id");
            location.assign("marcarconsulta.html#" + consultaId);
          };

          //fazer o rating