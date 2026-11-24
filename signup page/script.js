// Select DOM elements
const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');

// Handle form submission
signupForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent page reload

  // Clear previous messages
  nameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';
  successMessage.textContent = '';

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let isValid = true;

  // Validate Name
  if (name === '') {
    nameError.textContent = 'Name is required.';
    isValid = false;
  }

  // Validate Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    emailError.textContent = 'Email is required.';
    isValid = false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  // Validate Password
  if (password.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters.';
    isValid = false;
  }

  // If valid, save to localStorage
  if (isValid) {
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      emailError.textContent = 'This email is already registered.';
      return;
    }

    // Create new user object
    const newUser = {
      name: name,
      email: email,
      password: password
    };

    // Add to array and save back to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message and reset form
    successMessage.textContent = 'Signup successful!';
    signupForm.reset();
  }
});