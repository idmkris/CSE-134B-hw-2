const form = document.getElementById("contactForm");
const email = document.getElementById("email");
const inputname = document.getElementById("name");
const comments = document.getElementById("message");
const error = email.nextElementSibling;
const infoOutput = document.getElementById("infoOutput");

const nameRegExp = /^[A-Za-z]+$/;
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Character limit for comments
const maxCharacters = 200;

inputname.addEventListener("input", () => {
  if (!nameRegExp.test(inputname.value)) {
    inputname.setCustomValidity("Please Enter Correct Format");
  } else {
    inputname.setCustomValidity("");
  }
});

email.addEventListener("input", () => {
  const isValid = email.value.length === 0 || emailRegExp.test(email.value);
  if (isValid) {
    email.className = "valid";
    error.textContent = "";
    error.className = "error";
  } else {
    email.className = "invalid";
  }
});

comments.addEventListener("input", () => {
  const remainingCharacters = maxCharacters - comments.value.length;

  
  infoOutput.textContent = `Characters remaining: ${remainingCharacters}`;

  
  if (remainingCharacters < 20) {
    infoOutput.style.color = "orange"; 
  }

  if (remainingCharacters < 10) {
    infoOutput.style.color = "red"; 
  }

  if (remainingCharacters >= 20) {
    infoOutput.style.color = "black";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isValidEmail = email.value.length !== 0 && emailRegExp.test(email.value);
  const isValidComments = comments.value.length <= maxCharacters;

  if (!isValidEmail || !isValidComments) {
    if (!isValidEmail) {
      email.className = "invalid";
    }

    if (!isValidComments) {
      infoOutput.textContent = "Please enter valid comments within the character limit.";
      infoOutput.style.color = "red";
    }

    error.textContent = "Please enter correct email address";
    error.className = "error active";

    setTimeout(() => {
      error.textContent = "";
      error.className = "error";
    }, 3000);
  } else {
    email.className = "valid";
    error.textContent = "";
    error.className = "error";

    submit();
  }
});

function submit() {
  var errorOutput = document.getElementById("errorOutput");

  var url = 'https://httpbin.org/post';

  var formData = new FormData(form);

  fetch(url, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Log the response to the console
      console.log('Form submitted successfully! Response:', data);

      infoOutput.textContent = 'Form submitted successfully!';
      infoOutput.style.color = "green";
    })
    .catch(error => {
      console.error('Error submitting the form:', error);

      // Display the error in the errorOutput area
      errorOutput.textContent = 'Error submitting the form: ' + error.message;
      errorOutput.style.color = "red";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
  
    // Check the saved theme preference from localStorage
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      body.classList.add(currentTheme);
    }
  
    // Toggle between light and dark mode
    darkModeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
  
      // Save the current theme preference to localStorage
      const isDarkMode = body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDarkMode ? "dark-mode" : "");
    });
  });
  
    



