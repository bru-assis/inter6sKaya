var valor = location.hash.split("#")[1];

var db = firebase.firestore().collection('consultas').doc(valor);
var btnAgendar = document.getElementById('btnAgendar');

db.onSnapshot(snapshot =>{
    var medId = snapshot.data().M_ID;
    var med = snapshot.data().nomeM;
    var especialidade = snapshot.data().especialidade;
    var dia = snapshot.data().dia;
    var mes = snapshot.data().mesStr;
    var ano = snapshot.data().ano;
    var end = snapshot.data().endereco;
    var hora = snapshot.data().horario;

    document.getElementById('medico').innerHTML = med;
    document.getElementById('especialidade').innerHTML = especialidade;
    document.getElementById('dia').innerHTML = dia;
    document.getElementById('mes').innerHTML = mes;
    document.getElementById('ano').innerHTML = ano;
    document.getElementById('end').innerHTML = end;
    document.getElementById('hora').innerHTML = hora;

 const med = firebase.firestore().collection('users').doc(medId);
 med.get().then(function(){
var conveniado = snapshot.data().convenio;
var telemed = snapshot.data().telemedicina;

if(conveniado, "==", "n"){
  document.getElementById('selectConvenio').style = "display: none;";
};

if(telemed, "==", "n"){
    document.getElementById('selectTelemed').style = "display: none;";
  };
  });
  });

  function googlemaps(){
    var end = document.getElementById('end').value;
      var codificar = encodeURIComponent(end);
      var googlemaps = "https://maps.google.com.br/maps?q="
       +codificar+"&z=17";
      
      location.assign(googlemaps);
       };

       btnAgendar.addEventListener('click',e=>{
        const convenio;
        const checkC = document.getElementById('sConvenio');
        if(checkC.checked){
            convenio = "-";
        };

        const telemed;
        var radios = document.getElementsByName("telemed");
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                telemed = radios[i].value;
            };
        };
        const user = firebase.auth().currentUser;
        const idP = user.uid;
        const nome = document.getElementById('txtnome');
        const convenio = document.getElementById('selectConvenio');
           db.update({
            P_ID : idP,
            paciente : nome.value,
            convenio: convenio.value,
            telemedicina: telemed,
            status : 'indisponível'
           }).then(function(){

            //cria chat
            const consultaM = firebase.firestore().collection('consultas').doc(valor);
            consultaM.onSnapshot(snapshot =>{
              var medId = snapshot.data().M_ID;
              var pId = snapshot.data().P_ID;
              var paciente = snapshot.data().paciente;
              var med = snapshot.data().nomeM;
              var idDoc = medId + pId;
              const saladechat = firebase.firestore().collection('chat').doc(idDoc);
             saladechat.get().then(function(doc){
               if(doc.exists){
                console.log("Document data:", doc.data());
               }else{
                firebase.firestore().collection('chat').doc(idDoc).set({
                  medico: med,
                  paciente: paciente,
                  Id_p: pId,
                  Id_m: medId
                });
               };
              });
        });
       })
