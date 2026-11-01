function age() {
  const d1 = Number(document.getElementById('date').value.trim());
  const m1 = Number(document.getElementById('month').value.trim());
  const y1 = Number(document.getElementById('year').value.trim());
  const output = document.getElementById('age');

  if (!document.getElementById('date').value.trim() ||
      !document.getElementById('month').value.trim() ||
      !document.getElementById('year').value.trim()) {
    output.textContent = 'অনুগ্রহ করে দিন, মাস ও সাল পূরণ করুন।';
    output.classList.add('show');
    return;
  }

  const today = new Date();
  const birth = new Date(y1, m1 - 1, d1);
  if (!Number.isInteger(d1) || !Number.isInteger(m1) || !Number.isInteger(y1) ||
      y1 < 1 || m1 < 1 || m1 > 12 || d1 < 1 ||
      birth.getFullYear() !== y1 || birth.getMonth() !== m1 - 1 ||
      birth.getDate() !== d1 || birth > today) {
    output.textContent = 'সঠিক জন্মতারিখ দিন।';
    output.classList.add('show');
    return;
  }

  let years = today.getFullYear() - y1;
  let months = today.getMonth() + 1 - m1;
  let days = today.getDate() - d1;

  if (days < 0) {
    const daysInPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += daysInPreviousMonth;
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  output.textContent = 'আপনার বয়সঃ- ' + years + ' বছর ' + months + ' মাস ' + days + ' দিন';
  output.classList.add('show');
}

document.getElementById('calculate').addEventListener('click', age);
document.getElementById('ageForm').addEventListener('submit', function (event) {
  event.preventDefault();
  age();
});
document.querySelectorAll('#date, #month, #year').forEach(function (field) {
  field.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
  field.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      age();
    }
  });
});
