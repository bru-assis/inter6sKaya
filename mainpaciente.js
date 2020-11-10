//Nome
firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var foto = user.photoURL;
      document.getElementById("pfp").style.backgroundImage = 'url('+ foto +')';
          document.getElementById("nomeUser").innerHTML = user.displayName; 

        
//Exibe a lista de médicos
var userdb = firebase.firestore().collection('users').doc(user.uid);
  userdb.onSnapshot(snapshot => {
     var userEstado = snapshot.data().estado;

let medicos = [];
var pesquisa = firebase.firestore().collection('users').where("tipo", "==", "medico").where("estado","==", userEstado);
    pesquisa.get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            medicos.push({...doc.data(), id: doc.id});
          });
          let html = '';
          medicos.forEach(med => {
            html += `<div data-id= ${med.id} onclick="medurl(this)">`;
            html += `<li>`;
            html += `<h5> ${med.nome}</h5>`;
            html += `<h5 id= "${med.id}a"> Conveniado </h5>`;
            html += `<h5 id= "${med.id}b"> Telemedicina </h5>`;
            html += `<h5> ${med.especialidade}</h5>`;
            html += `<h5> Endereço: <span id="endereco"></span> </h5>`;
            html += `<a id="linkMaps" onclick="googlemaps(this)"> Ver no mapa</a>`;
            html += `</li>`;
            html += `<li>`;
            html += `<h5> Dia:<span id="proxdia"></span> <span id="diaM"></span> </h5>`;
            html += `<h5> Horários: </h5>`;
            html += `<span id="hrs"></span>`;
            html += `<p id="mais" onclick="exibir()"> <b>Mais Horários</b></p>`;
            html += `<div id="dats">`;
            html += `<h5><span id="id1"></span></h5>`;
            html += `<span id="hrs1"></h5>`;  
            html += `<h5><span id="id2"></span></h5>`;
            html += `<span id="hrs2"></h5>`; 
            html += `<h5><span id="id3"></span></h5>`;
            html += `<span id="hrs3"></h5>`; 
            html += `</div>`; 
            var dt = new Date();
            var d = dt.getDate();
            var m = dt.getMonth() +1;
            var refs = firebase.firestore().collection('consultas').where("M_ID", "==", med.id).where("dia",">",d)
            .where("mes","==",m).where("status","==","disponível").orderBy("dia").limit(1);

            refs.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var oDia = doc.data().dia;
                    document.getElementById('proxdia').innerHTML = oDia;
                    var oM = doc.data().mesStr;
                    document.getElementById('diaM').innerHTML = oM;
                    var end = doc.data().endereco;
                    document.getElementById('endereco').innerHTML = end;
                    document.getElementById('linkMaps').setAttribute("data-value", end);
                  //horarios da próxima data
                    var refs2 = firebase.firestore().collection('consultas').where("M_ID", "==", med.id).where("dia","==",oDia)
                    .where("mes","==",m).where("status","==","disponível");
                    let horarios = [];
                    refs2.get().then(function(querySnapshot){
                      querySnapshot.forEach(function(doc){
                        horarios.push({...doc.data(), id:doc.id});
                        let html2 = '';
                        horarios.forEach(hor =>{
                          html2 += `<div data-id = ${hor.id} onclick="consultaurl(this)">`;
                          html2 += `<p class="horarios">${hor.horario} </p>`;
                          html2 += `</div>`;
                        });
                        document.getElementById('hrs').innerHTML = html2;
                      });
                    })
                    .catch(function(error) {
                      console.log("Error getting documents: ", error);
                  });
                  
                  //data 1 
                  var db1 = firebase.firestore().collection('consultas').where("M_ID", "==", med.id).where("dia",">",oDia)
                    .where("mes","==",m).where("status","==","disponível").orderBy("dia").limit(1);

                    db1.get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            var Dia1 = doc.data().dia;
                            document.getElementById('id1').innerHTML = Dia1;
                          //horarios da data
                            var refs3 = firebase.firestore().collection('consultas').where("M_ID", "==", med.id).where("dia","==",Dia1)
                            .where("mes","==",m).where("status","==","disponível");
                            let horarios = [];
                            refs3.get().then(function(querySnapshot){
                              querySnapshot.forEach(function(doc){
                                horarios.push({...doc.data(), id:doc.id});
                                let html4 = '';
                                horarios.forEach(hor =>{
                                  html4 += `<p data-id = ${hor.id} onclick="consultaurl(this)" class="horarios">${hor.horario} </p>`;
                                });
                                document.getElementById('hrs1').innerHTML = html4;
                              });
                            });

                  //data2
                  var db2 = firebase.firestore().collection('consultas').where("M_ID", "==", med.id).where("dia",">",Dia1)
                  .where("mes","==",m).where("status","==","disponível").orderBy("dia").limit(1);

                  db2.get()
                  .then(function(querySnapshot) {
                      querySnapshot.forEach(function(doc) {
                          var Dia2 = doc.data().dia;
                          document.getElementById('id2').innerHTML = Dia2;
                        //horarios da data
                          var refs4 = firebase.firestore().collection('consultas').where("M_ID", "==", med.id).where("dia","==",Dia2)
                          .where("mes","==",m).where("status","==","disponível");
                          let horarios = [];
                          refs4.get().then(function(querySnapshot){
                            querySnapshot.forEach(function(doc){
                              horarios.push({...doc.data(), id:doc.id});
                              let html5 = '';
                              horarios.forEach(hor =>{
                                html5 += `<p data-id = ${hor.id} onclick="consultaurl(this)" class="horarios">${hor.horario} </p>`;
                              });
                              document.getElementById('hrs2').innerHTML = html5;
                            });
                          });

                  //data 3 
                  var db3 = firebase.firestore().collection('consultas').where("M_ID", "==", med.id).where("dia",">", Dia2)
                  .where("mes","==",m).where("status","==","disponível").orderBy("dia").limit(1);

                  db3.get()
                  .then(function(querySnapshot) {
                      querySnapshot.forEach(function(doc) {
                          var Dia3 = doc.data().dia;
                          document.getElementById('id3').innerHTML = Dia3;
                        //horarios da data
                          var refs5 = firebase.firestore().collection('consultas').where("M_ID", "==", med.id).where("dia","==",Dia3)
                          .where("mes","==",m).where("status","==","disponível");
                          let horarios = [];
                          refs5.get().then(function(querySnapshot){
                            querySnapshot.forEach(function(doc){
                              horarios.push({...doc.data(), id:doc.id});
                              let html6 = '';
                              horarios.forEach(hor =>{
                                html6 += `<p data-id = ${hor.id} onclick="consultaurl(this)" class="horarios">${hor.horario} </p>`;
                              });
                              document.getElementById('hrs3').innerHTML = html6;
                            });
                          });
                        });
                      })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });//fim data3
                        });
                      })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });//fim data2
                          });
                        })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });//fim data1

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
               document.getElementById(novoID).style = "display: none;";
                  };
              if(telemed == "n"){
              document.getElementById(novoID2).style = "display: none;";
            };
            });
        });
          document.getElementById('meds').innerHTML = html;
  
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

    });
  });

});
    };
  });
function medurl(self){
    var medId = self.getAttribute("data-id");
    location.assign("perfilmed.html#" + medId); 
}

  function consultaurl(self){
    var consultaId = self.getAttribute("data-id");
    location.assign("marcarconsulta.html#" + consultaId);
  };

 function googlemaps(self){
  var end = self.getAttribute("data-value");
  var codificar = encodeURIComponent(end);
  var googlemaps = "https://maps.google.com.br/maps?q="
   +codificar+"&z=17";
  
  location.assign(googlemaps);
   };

   
   function exibir(){
    document.getElementById('dats').style = "visibility: visible;";
  };

      //Pesquisando especialidades 
function search(self){
    const user = firebase.auth().currentUser;
    var userdb = firebase.firestore().collection('users').doc(user.uid);
  userdb.onSnapshot(snapshot => {
     var userEstado = snapshot.data().estado;
     var especialidade = self.getAttribute("data-value");
     let medicos = [];
     var pesquisa = firebase.firestore().collection('users').where("especialidade", "==", especialidade).where("estado","==", userEstado);
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
  });
};

  