let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const emailRegex = /^[a-z]+\.[a-z]+(\d{2})?@e-uvt\.ro$/i;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;

  if (!emailRegex.test(email)) {
    alert(
      "Email invalid! Folosește adresa UVT în formatul prenume.nume@e-uvt.ro (opțional 2 cifre după nume, ex: ion.popescu24@e-uvt.ro).",
    );
    return;
  }

  if (!passwordRegex.test(password)) {
    alert(
      "Parolă invalidă! Trebuie să aibă minim 7 caractere, cu litere mari și mici, cifre și un caracter special.",
    );
    return;
  }

  alert("Login reușit!");
  window.location.href = "home.html";
});
