var valor = location.hash.split("#")[1];

var db = firebase.firestore().collection('consultas').doc(valor);

var ref = firebase.firestore().collection('meds');

let medicamento = [];
ref.get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      medicamento.push({...doc.data(), id: doc.id});
    });
    let html = '';
    medicamento.forEach(medicamento => {
      html += `<li>`;
      html += `<h5> ${medicamento.nomeMed}</h5>`;
      html += `<h5> ${medicamento.formula}</h5>`;
      html += `<div id = "imgMed"></div>`;
      html += `</li>`;

      var foto = medicamento.imgURL;
      document.getElementById('imgMed').style = "background-image: url('"+ foto +"')";
    });
    document.getElementById('meds').innerHTML = html;

})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});