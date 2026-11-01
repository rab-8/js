const products = [
  { name: "চাল", base: 10.230 },
  { name: "আটা", base: 8.523 },
  { name: "তেল", base: 2.540 },
  { name: "চিনি", base: 1.700 },
  { name: "ডাল", base: 1.700 }
];

const bnDigits = s =>
  String(s).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);

const fmtQty = n =>
  bnDigits(
    Number(n.toFixed(3)).toLocaleString("en-US", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    })
  );

const fmtMoney = n =>
  "৳ " + bnDigits(Math.round(n).toLocaleString("en-US"));

const tbody = document.getElementById("items");

products.forEach((p, i) => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${p.name}</td>
    <td>
      <input
        class="qty"
        aria-label="${p.name} পরিমাণ"
        readonly
        tabindex="-1"
      >
    </td>
    <td>
      <input
        class="price"
        type="number"
        min="0"
        step="any"
        aria-label="${p.name} একক মূল্য"
        value="0"
      >
    </td>
    <td>
      <div class="amount" id="amount-${i}">৳ ০</div>
    </td>
  `;

  tbody.appendChild(tr);
});

function calculate() {
  const days = Math.max(
    0,
    Number(document.getElementById("days").value) || 0
  );

  const units = Math.max(
    0,
    Number(document.getElementById("units").value) || 0
  );

  const family =
    document.getElementById("unitType").value === "family";

  let grand = 0;

  products.forEach((p, i) => {
    let effectiveUnits = units;
    let quantity;

    if (family) {
      if (i !== 4) {
        effectiveUnits =
          units === 0
            ? (days > 0 ? 1 : 0)
            : units + 1;
      }

      // ডাল (i === 4): শুধু ইউনিট অনুযায়ী হিসাব হবে।
      // অন্যান্য পারিবারিক পণ্যের আগের হিসাব অপরিবর্তিত।
      if (i === 4) {
        quantity = p.base * units;
      } else {
        quantity = p.base * effectiveUnits * (days / 30);
      }
    } else {
      // একক রেশনে সব পণ্য ইউনিট অনুযায়ী হিসাব হবে।
      quantity = p.base * units;
    }

    tbody.rows[i].querySelector(".qty").value =
      fmtQty(quantity);

    const price = Math.max(
      0,
      Number(tbody.rows[i].querySelector(".price").value) || 0
    );

    const amount = quantity * price;

    document.getElementById(`amount-${i}`).textContent =
      fmtMoney(amount);

    grand += amount;
  });

  document.getElementById("grandTotal").textContent =
    fmtMoney(grand);
}

["days", "units", "unitType"].forEach(id => {
  document.getElementById(id).addEventListener(
    id === "unitType" ? "change" : "input",
    calculate
  );
});

tbody.querySelectorAll(".price").forEach(el => {
  el.addEventListener("input", calculate);
});

calculate();
