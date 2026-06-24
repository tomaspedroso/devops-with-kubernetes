const loadTodos = async () => {
  const res = await fetch('/todos');
  const todos = await res.json();
  const list = document.getElementById('todo-list');
  list.innerHTML = todos.map(todo => `<li>${todo}</li>`).join('');
}

const createTodo = async (text) => {
  await fetch('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
}

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  await createTodo(input.value);
  input.value = '';
  await loadTodos();
});

loadTodos();