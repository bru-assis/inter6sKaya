//Página do chat/ enviar e exibir mensagens
var valor = location.hash.split("#")[1];

var db = firebase.firestore().collection('chat').doc(valor);

//Informações para teste
     db.onSnapshot(snapshot =>{
                  var med = snapshot.data().medico;
                  var pac = snapshot.data().paciente;
                  document.getElementById('infoP').innerHTML = pac;
                  document.getElementById('infoM').innerHTML = med;
                });


//Enviar mensagem
var btnEnviar = document.getElementById('enviar');

btnEnviar.addEventListener('click', e=>{
    var msg = document.getElementById('msg');
    
    db.collection('mensagens').doc().set({
        text: msg.value,
        horario: firebase.firestore.FieldValue.serverTimestamp()
    });  
});


//Exibir mensagens
var refs = db.collection('mensagens');
let msgs = [];
            refs.get().then(function(querySnapshot){
              querySnapshot.forEach(function(doc){
                msgs.push({...doc.data(), id:doc.id});
                let html = '';
                msgs.forEach(msg =>{
                  html += `<div data-id = ${msg.id}>`;
                  html += `<h4>${msg.text} </h4>`;
                  html += `<p>${msg.horario} </p>`;
                  html += `</div>`;

                banco = db.collection('mensagens').doc(msg.id);

                  banco.onSnapshot(snapshot =>{
                    var oid =firebase.auth().currentUser;
                    var userid = oid.uid;
                    var usuario = snapshot.data().user;
                    var msg = snapshot.data().id;
                    if(userid == usuario){
                     document.getElementById(msg).style = "background-color: blue;";
                        };
                  });
                });
                document.getElementById('mensagens').innerHTML = html;
              });
            });