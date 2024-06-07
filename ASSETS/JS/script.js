// script.js

document.addEventListener('DOMContentLoaded', function () {
    const cadastroForm = document.getElementById('cadastroForm');
    const consultaForm = document.getElementById('consultaForm');
    const listaViagens = document.getElementById('listaViagens');
    const resultadosConsulta = document.getElementById('resultadosConsulta');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const viagem = {
                nome: cadastroForm.nome.value,
                email: cadastroForm.email.value,
                data: cadastroForm.data.value,
                partida: cadastroForm.partida.value,
                destino: cadastroForm.destino.value,
                proposito: cadastroForm.proposito.value,
                descricao: cadastroForm.descricao.value,
            };

            if (validarFormulario(viagem)) {
                salvarViagem(viagem);
                cadastroForm.reset();
                exibirViagens();
            } else {
                alert('Preencha todos os campos corretamente.');
            }
        });

        function validarFormulario(viagem) {
            return Object.values(viagem).every(value => value.trim() !== '');
        }

        function salvarViagem(viagem) {
            const viagens = JSON.parse(localStorage.getItem('viagens')) || [];
            viagens.push(viagem);
            localStorage.setItem('viagens', JSON.stringify(viagens));
        }

        function excluirViagem(index) {
            const viagens = JSON.parse(localStorage.getItem('viagens')) || [];
            viagens.splice(index, 1);
            localStorage.setItem('viagens', JSON.stringify(viagens));
            exibirViagens();
        }

        function exibirViagens() {
            const viagens = JSON.parse(localStorage.getItem('viagens')) || [];
            listaViagens.innerHTML = '';
            viagens.forEach((viagem, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${viagem.nome}</strong> - ${viagem.email} - ${viagem.data} - ${viagem.partida} - ${viagem.destino} - ${viagem.proposito} - ${viagem.descricao}
                    <button onclick="excluirViagem(${index})">Excluir</button>
                `;
                listaViagens.appendChild(li);
            });
        }

        window.excluirViagem = excluirViagem;

        exibirViagens();
    }

    if (consultaForm) {
        consultaForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const nome = consultaForm['consulta-nome'].value.trim().toLowerCase();
            const data = consultaForm['consulta-data'].value;

            const viagens = JSON.parse(localStorage.getItem('viagens')) || [];
            const resultados = viagens.filter(viagem => 
                (nome === '' || viagem.nome.toLowerCase().includes(nome)) &&
                (data === '' || viagem.data === data)
            );

            exibirResultados(resultados);
        });

        function exibirResultados(viagens) {
            resultadosConsulta.innerHTML = '';
            if (viagens.length === 0) {
                resultadosConsulta.innerHTML = '<li>Nenhuma viagem encontrada.</li>';
            } else {
                viagens.forEach(viagem => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>${viagem.nome}</strong> - ${viagem.email} - ${viagem.data} - ${viagem.partida} - ${viagem.destino} - ${viagem.proposito} - ${viagem.descricao}
                    `;
                    resultadosConsulta.appendChild(li);
                });
            }
        }
    }
});
