
const tarefaInput = document.querySelector('#tarefa-input');
const adicionarTarefaBtn = document.querySelector('#adicionar-tarefa-btn');
const listaTarefas = document.querySelector('#lista-tarefas');

let tarefas = [];

adicionarTarefaBtn.addEventListener('click', () => {
    verificarTarefaInput(tarefaInput.value);
});

tarefaInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        verificarTarefaInput(tarefaInput.value);
    }
});

function verificarTarefaInput() {
    if (!tarefaInput.value.trim()) {
        alert('Digite uma tarefa para adicionar!');
        return;
    } else if (tarefas.includes(tarefaInput.value.trim())) {
        alert('Essa tarefa já existe!');
        return;
    }
    adicionarTarefa(tarefaInput.value);
};

function adicionarTarefa(tarefa) {
    const li = criarLi();
    li.innerText = tarefa;
    listaTarefas.appendChild(li);

    salvarTarefas(tarefa);
    criarBtnApagar(li);
    tarefaInput.value = '';
    tarefaInput.focus();
};

function criarLi() {
    const li = document.createElement('li');
    return li;
};

function criarBtnApagar(li) {
    li.innerText += ' ';
    const btnApagar = document.createElement('button');
    btnApagar.innerText = 'Apagar';
    btnApagar.setAttribute('class', 'btn-apagar');
    li.appendChild(btnApagar);
};

document.addEventListener('click', (event) => {
    tarefaBtnApagar = event.target
    if (event.target.classList.contains('btn-apagar')) {
        tarefaBtnApagar.parentElement.remove();
        salvarTarefas();
    };
});

function salvarTarefas(tarefa) {
    const liTarefas = listaTarefas.querySelectorAll('li');
    tarefas = [];
    
    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefas.push(tarefaTexto.replace(' Apagar', ''.trim()));
    };
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(element => {
        adicionarTarefa(element);
    });
}

carregarTarefas();
