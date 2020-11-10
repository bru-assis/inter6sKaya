var valor = location.hash.split("#")[1];

var db = firebase.firestore().collection('consultas').doc(valor);

db.onSnapshot(snapshot =>{
    var med = snapshot.data().nomeM;
    var especialidade= snapshot.data().especialidade;
    var dia = snapshot.data().dia;
    var mes = snapshot.data().mesStr;
    var horario = snapshot.data().horario;
    var telemedicina = snapshot.data().telemedicina;
    var aconteceu = snapshot.data().aconteceu;
    var diagnostico = snapshot.data().diagnostico;
    var medicamento = snapshot.data().medicamento;
    var end = snapshot.data().endereco;
    var rating = snapshot.data().rate;
    document.getElementById('placeHolderImg').style = "display:none;";

    document.getElementById('medico').innerHTML = med;
    document.getElementById('especialidade').innerHTML = especialidade;
    document.getElementById('dia').innerHTML = dia;
    document.getElementById('mes').innerHTML = mes;
    document.getElementById('horario').innerHTML = horario;

    if(telemedicina == "s"){
        document.getElementById('consulta').style = "backgound-color:orange;";
    }else{
        document.getElementById('telemedTag').style = "display:none;";
        document.getElementById('consulta').style = "backgound-color:blue;";
    }

    if(aconteceu == "s"){
        document.getElementById('end').style = "display:none;";
        document.getElementById('btnDesmarcar').style = "display:none;";
        document.getElementById('diagnostico').innerHTML = diagnostico;

        firebase.firestore().collection('meds').doc(medicamento).onSnapshot(snapshot =>{
          var nome = snapshot.data().nomeMed;
          var formula = snapshot.data().formula;
          var imagem = snapshot.data().imgURL;
          var loja = snapshot.data().nomeLoja;
          var linkCompra = snapshot.data().lojaLink;
          var preco = snapshot.data().preco;
          var lojaImg = snapshot.data().lojaImg;
          document.getElementById('nomeMed').innerHTML = nome;
          document.getElementById('formula').innerHTML = formula;
          document.getElementById('loja').innerHTML = loja;
          document.getElementById('preco').innerHTML = preco;
          document.getElementById('comprar').setAttribute("href", linkCompra); 
          document.getElementById('imgMed').style = "background-image: url('"+ imagem +"')";
          document.getElementById('imgLoja').style = "background-image: url('"+ lojaImg +"')";
        })

    }else{
        document.getElementById('tratamento').style = "display:none;";
        document.getElementById('avaliar').style = "display:none;";
        document.getElementById('end').innerHTML = end;
    }
});

function googlemaps(){
    var end = document.getElementById('end').value;
      var codificar = encodeURIComponent(end);
      var googlemaps = "https://maps.google.com.br/maps?q="
       +codificar+"&z=17";
      
      location.assign(googlemaps);
       };

       //desmarcar consulta
       btnDesmarcar.addEventListener('click', e =>{
        db.update({
        P_ID : "",
        paciente : "",
        status : 'disponível'
       });
      });