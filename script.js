// GLA 5 assignment demo: fetch and display sample user data from JSONPlaceholder.
const usersContainer = document.getElementById("users");
const statusText = document.getElementById("status");
const refreshBtn = document.getElementById("refreshBtn");
const deleteBtn = document.getElementById("deleteBtn");
const deleteIdInput = document.getElementById("deleteId");

function setStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.classList.toggle("error", isError);
}

async function getUsers() {
  try {
    setStatus("Loading users...");
    const response = await fetch("https://jsonplaceholder.typicode.com/users/");

    if (!response.ok) {
      throw new Error(`GET users failed with status ${response.status}`);
    }

    const users = await response.json();
    renderUsers(users);
    setStatus(`Loaded ${users.length} sample users successfully.`);
  } catch (error) {
    setStatus("The user list could not be loaded. Please try again.", true);
    console.error("Could not fetch users:", error);
  }
}

function renderUsers(users) {
  usersContainer.innerHTML = "";

  if (!Array.isArray(users) || users.length === 0) {
    usersContainer.innerHTML = "<p>No users found.</p>";
    return;
  }

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

async function deleteUser(id) {
  if (!id || id < 1) {
    setStatus("Please enter a valid user ID (1 or higher).", true);
    return;
  }

  try {
    setStatus(`Deleting user ${id}...`);
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    });

    if (response.status === 200 || response.status === 204) {
      setStatus(`✓ User ${id} successfully deleted!`);
      console.log(`User ${id} successfully deleted!`);
    } else {
      setStatus(`The DELETE request failed with status ${response.status}.`, true);
      console.error(`Error: User ${id} could not be deleted. Status: ${response.status}`);
    }
  } catch (error) {
    setStatus("The DELETE request could not be completed. Please check your connection.", true);
    console.error("Delete request failed:", error);
  }
}

refreshBtn.addEventListener("click", getUsers);

deleteBtn.addEventListener("click", () => {
  const id = Number(deleteIdInput.value);
  deleteUser(id);
});

getUsers();
