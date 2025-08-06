const form = document.getElementById("contactForm");
const resultDiv = document.getElementById("result");

// Google Apps Script の WebアプリURL に書き換えてください
const GAS_URL = "https://script.google.com/macros/s/AKfycbynnyBObXpXbZnEYbKDehSBdljCBRHkhVdHYBW-1M0tyLUsuhNOSR55SFxLy94IWxAo/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

  resultDiv.textContent = "送信中…";

  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.status === "success") {
      resultDiv.textContent = "送信が完了しました！";
      resultDiv.style.color = "green";
      form.reset();
    } else {
      resultDiv.textContent = "送信に失敗しました。";
      resultDiv.style.color = "red";
    }
  } catch (error) {
    resultDiv.textContent = "エラーが発生しました。";
    resultDiv.style.color = "red";
  }
});