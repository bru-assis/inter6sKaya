const bttAgendar = document.getElementById('btnConfirm');

bttAgendar.addEventListener('click', e =>{
    const monthsBR = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    const end;
    var radios = document.getElementsByName("end");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            end = radios[i].value;
        };
    };
    var dt = new Date();
    var weekday = dt.getDay();
    var mes = dt.getMonth()+1;
    var dtdia = dt.getDate();
    const user = firebase.auth().currentUser;
    const idM = user.uid;
    const nome = user.displayName;
    const diasem = document.getElementById('DiaSem').value;
    const init = document.getElementById('inicio').value;
    const final = document.getElementById('fim').value;
    const db = firebase.firestore();
    const mesStr = monthsBR[mes];
    var soma = weekday - diasem;
    e.preventDefault;
    
    switch (soma) {
        case 0:
            //soma 7 dias
            var x;
            for (x = dtdia + 7; x <= 30; x = x+7) {
                var i;
                for (i = init; i <= final; i++) {
              
                      db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes,
                          mesStr: mesStr
                      }).then(function() {
                         console.log("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });

              } ;
            };
          break;
        case 6 :
            // 1dia
            var x;
            for (x = dtdia + 1; x <= 30; x = x+7) {
                var i;
                for (i = init; i <= final; i++) {
                   db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes,
                          mesStr: mesStr
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case -1:
            // 1dia
            var x;
            for (x = dtdia + 1; x <= 30; x = x+7) {
                var i;
                for (i = init; i <= final; i++) {
                   db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes,
                          mesStr: mesStr
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case 5:
            // 2dia
            var x;
            for (x = dtdia + 2; x < 30; x = x+7) {
                var i;
                for (i = init; i <= final; i++) {
                  
                     db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes,
                          mesStr: mesStr
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                };
            };
        
          break;
          case -2:
            // 2dia
            var x;
            for (x = dtdia + 2; x < 30; x = x+7) {
                var i;
                for (i = init; i <= final; i++) {
                  
                     db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes,
                          mesStr: mesStr
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                };
            };
        
          break;
          case 4:
            // 3dia
            var x;
            for (x = dtdia + 3; x <= 30; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                    db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes,
                          mesStr: mesStr
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case -3:
            // 3dia
            var x;
            for (x = dtdia + 3; x <= 30; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                    db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes,
                          mesStr: mesStr
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case 3:
            // 4dia
            var x;
            for (x = dtdia + 4; x <= 30; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                      db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes,
                          mesStr: mesStr
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case -4:
            // 4dia
            var x;
            for (x = dtdia + 4; x <= 30; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                      db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes,
                          mesStr: mesStr
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case 2:
            // 5dia
            var x;
            for (x = dtdia + 5; x <= 30; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                    db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes,
                          mesStr: mesStr
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case -5:
            // 5dia
            var x;
            for (x = dtdia + 5; x <= 30; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                    db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes,
                          mesStr: mesStr
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case 1:
            // 6dia
            var x;
            for (x = dtdia + 6; x <= 30; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                     db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes,
                          mesStr: mesStr
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
          case -6:
            // 6dia
            var x;
            for (x = dtdia + 6; x <= 30; x = x + 7) {
                var i;
                for (i = init; i <= final; i++) {
                     db.collection('consultas').add({
                          M_ID : idM,
                          nomeM : nome,
                          endereco : end,
                          status :'disponível',
                          aconteceu : "n",
                          dia : x,
                          horario: i,
                          mes: mes,
                          mesStr: mesStr
                      }).then(function() {
                        alert("Cadastrado com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              } ;
            };
          break;
      };
});