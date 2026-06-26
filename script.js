const usersContainer = document.getElementById("users");

async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/");

    if (!response.ok) {
      throw new Error(`GET users failed with status ${response.status}`);
    }

    const users = await response.json();
    renderUsers(users);
  } catch (error) {
    console.error("Could not fetch users:", error);
  }
}

function renderUsers(users) {
  usersContainer.innerHTML = "";

  users.forEach((user) => {
    const card = document.createElement("article");
    card.className = "user-card";

    card.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>City:</strong> ${user.address.city}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
    `;

    usersContainer.appendChild(card);
  });
}

async function deleteUser() {
  const id = 10;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    });

    if (response.status === 200 || response.status === 204) {
      console.log(`User ${id} successfully deleted!`);
    } else {
      console.error(`Delete failed. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Delete request failed:", error);
  }
}

getUsers();
deleteUser();
