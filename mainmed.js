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
          html += `<li data-id= ${paciente.Id_p} onclick="pacienteurl(this)">`;
          html += `<h5> ${paciente.paciente}</h5>`;
          html += `<p id= "novo">Novo Paciente</p>`;
          html += `<h5>Próxima consulta: </h5><span id="proxC"> </span>`;
          html += `<h5 id="ultima">Última consulta: </h5><span id="lastC"> </span>`;
          //campo "Próxima/Última consulta" 
          var dt = new Date();
          var d = dt.getDate();
          var m = dt.getMonth()+1;
          var refs = firebase.firestore().collection('consultas').where("P_ID", "==", paciente.Id_p).orderBy('dia', 'desc')
          .orderBy('mes', 'desc').limit(1);

          refs.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  
                    var oDia = doc.data().dia;
                    var oMes = doc.data().mes;
                    var oHor = doc.data().horario;
                    var Horario = oDia + "/" + oMes + "-" + oHor;
                    document.getElementById('proxC').innerHTML = Horario;

                    if(oDia < d && oMes == m || oMes < m){
                     document.getElementById('proxC').innerHTML = "em aberto";
                   };                    
                   if(oDia > d && oMes == m || oMes > m){
                     document.getElementById('proxC').innerHTML = Horario;
                   };
                    
                   var refs2 = firebase.firestore().collection('consultas').where("P_ID", "==", paciente.Id_p).where("aconteceu", "==", "s")
                   .orderBy('dia', 'desc').orderBy('mes', 'desc').limit(1);

                       
                refs2.get().then(function(querySnapshot) {
                 querySnapshot.forEach(function(doc) {
                     var oDia2 = doc.data().dia;
                     var oMes2 = doc.data().mes;
                     var oHor2 = doc.data().horario;
                     var Horario2 = oDia2 + "/" + oMes2 + "-" + oHor2;
 
                     if(oDia2 < d && oMes2 == m || oMes2 < m){
                       document.getElementById('lastC').innerHTML = Horario2;
                       document.getElementById('novo').style = "display: none;";
                     }else{
                       document.getElementById('ultima').style = "display: none;";
                     };
                     
                   });
                 });
                  });
                });
          html += `</li>`
        });
        document.getElementById('pacientes').innerHTML = html;

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    };
  });

 function pacienteurl(self){
    var pId = self.getAttribute("data-id");
    location.assign("paciente.html#" + pId); 
  };