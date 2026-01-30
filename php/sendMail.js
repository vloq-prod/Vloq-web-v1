document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  if (!form) {
    console.error("Contact form not found");
    return;
  }

  form.addEventListener("submit", SendMail);

  async function SendMail(e) {
    e.preventDefault();

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("contact-email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    try {
      const response = await fetch(
        "https://staging-api.furnixcrm.com/api/public/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Message sent successfully ✅");
        form.reset();
      } else {
        alert("Submission failed ❌");
        console.error("API Response:", result);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Server connection failed");
    }
  }
});