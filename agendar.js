

//Agendar consulta (paciente)
function agendar(self){
    var consultaId = self.getAttribute("data-id");
    const user = firebase.auth().currentUser;
    const idP = user.uid
    const info = db.collection('users').doc(user.uid);
    const consultaM = db.collection('consultas').doc(consultaId);

    info.onSnapshot(snapshot =>{
        var nome = snapshot.data().nome;
        var idade = snapshot.data().idade;

        consultaM.update({
            P_ID = idP,
            nomeP = nome,
            idadeP = idade,
            status = 'indisponível'
        });
    });
};

// Gravar consulta (médico)
const bttAgendar = document.getElementById('btnConfirm');

bttAgendar.addEventListener('click', e =>{
    const user = firebase.auth().currentUser;
    const idM = user.uid
    const info = db.collection('users').doc(user.uid);
    const dia = document.getElementById('dia');
    const hora = document.getElementById('hora');
    const data_hora = "Dia:" + dia + "Hora:" + hora;

    info.onSnapshot(snapshot =>{
        var nome = snapshot.data().nome;
        var end = snapshot.data().endereco;

        return db.collection('consultas').add({
            M_ID = idM,
            nomeM = nome,
            endereco = end,
            status = 'disponível',
            horário = data_hora
        });
    });
});