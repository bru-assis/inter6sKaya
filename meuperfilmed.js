const user = firebase.auth().currentUser;

var db = firebase.firestore().collection('users').doc(user);

//add rating

db.onSnapshot(snapshot =>{
    var med = snapshot.data().nome;
    var especialidade = snapshot.data().especialidade;
    var crm= snapshot.data().crm;
    var estado = snapshot.data().estado;
    var rating = snapshot.data().rate;
    var telemed = snapshot.data().telemedicina;
    var bio = snapshot.data().bio;

    document.getElementById('medico').innerHTML = med;
    document.getElementById('especialidade').innerHTML = especialidade;
    document.getElementById('crm').innerHTML = crm;
    document.getElementById('uf').innerHTML = estado;
    document.getElementById('bio').innerHTML = bio;

    if(telemed == "n"){
        document.getElementById('telemed').style = "display:none";
    };
})

//endereços
var refs = db.collection('enderecos');
let ends = [];
            refs.get().then(function(querySnapshot){
              querySnapshot.forEach(function(doc){
                ends.push({...doc.data(), id:doc.id});
                let html = '';
                ends.forEach(end =>{
                  html += `<div>`
                  html += `<p>${end.endereco}</p>`;
                  html += `<a data-value="${end.endereco}" onclick="googlemaps(this)"> Ver no mapa</a>`;

                  var dt = new Date();
                  var d = dt.getDate();
                  var m = dt.getMonth() +1;
                  var refs = firebase.firestore().collection('consultas').where("endereco", "==", end.endereco).where("dia",">",d)
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
                  html += `</div>`;

                  //adicionar as datas no html
                });
                document.getElementById('endereco').innerHTML = html;
              });
            });
        });
    });


            function googlemaps(self){
                var end = self.getAttribute("data-value");
                var codificar = encodeURIComponent(end);
                var googlemaps = "https://maps.google.com.br/maps?q="
                 +codificar+"&z=17";
                
                location.assign(googlemaps);
                 };   

//publicações
 var refs2 = db.collection('publicacoes').where("mId","==", user.uid);
              let publi = [];
            refs2.get().then(function(querySnapshot){
              querySnapshot.forEach(function(doc){
                publi.push({...doc.data(), id:doc.id});
                let html = '';
                publi.forEach(publi =>{
                  html += `<div>`
                  html += `<h5>${publi.titulo}</h5>`;
                  html += `<h5>${publi.text}</h5>`;
                  html += `</div>`;
                });
                document.getElementById('publicacoes').innerHTML = html;
              });
            });