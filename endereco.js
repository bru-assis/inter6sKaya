const btnEnd = document.getElementById('btnSaveEndereco');

    btnEnd.addEventListener('click', e =>{
    var user = firebase.auth().currentUser;
    var end = document.getElementById('end');
    var num = document.getElementById('numero');
    var comp = document.getElementById('comp');
    var bairro = document.getElementById('bairro');
    var cidade = document.getElementById('cidade');
    var endCompleto = end.value + "," + num.value + "," + comp.value + "-" + bairro.value + "-" + cidade.value;
    var db = firebase.firestore().collection('users').doc(user.uid);
    e.preventDefault();

    db.collection('enderecos').doc().set({
      endereco: endCompleto
    })
    .then(
          alert('Cadastro completo!'));
    
}); 

//se clicar em novo endereço ele cria um novo form, ai criar a função quando tiver o front, a criação do form vem no "then"