// Element Variables
const date = document.getElementById("datePicker");
const ticketAdult = document.getElementById("ticketAdult");
const hiddenTicketAdult = document.getElementById("hiddenTicketAdult");
const ticketKid = document.getElementById("ticketKid");
const hiddenTicketKid = document.getElementById("hiddenTicketKid");
const snacksLunch = document.getElementById("snacksLunch");
const swimKit = document.getElementById("swimKit");
const voucher = document.getElementById("voucher");

const priceDate = document.getElementById("priceDate");
const priceTicketAdult = document.getElementById("priceTicketAdult");
const priceTicketKid = document.getElementById("priceTicketKid");
const priceSnacks = document.getElementById("priceSnacks");
const priceSwimKit = document.getElementById("priceSwimKit");
const voucherInfo = document.getElementById("voucherInfo");
const voucherDiscount = document.getElementById("voucherDiscount");
const totalPrice = document.getElementById("totalPrice");

const listDiscountVoucher = {
  "D10000": 10,
  "D20000": 20,
  "DS50000": 50,
  "DX100000": 100,
  "DM375000": 375,
}

// Handle Discount
let checkDiscount = () => {
  switch (voucher.value) {
    case "D10000":
      voucherInfo.innerHTML = `Code: ${voucher.value}`;
      voucherDiscount.innerHTML = `Discount: Rp10,000`;
      return 10;
      break;
    case "D20000":
      voucherInfo.innerHTML = `Code: ${voucher.value}`;
      voucherDiscount.innerHTML = `Discount: Rp20,000`;
      return 20;
      break;
    case "DS50000":
      voucherInfo.innerHTML = `Code: ${voucher.value}`;
      voucherDiscount.innerHTML = `Discount: Rp50,000`;
      return 50;
      break;
    case "DX100000":
      voucherInfo.innerHTML = `Code: ${voucher.value}`;
      voucherDiscount.innerHTML = `Discount: Rp100,000`;
      return 100;
      break;
    case "DM375000":
      voucherInfo.innerHTML = `Code: ${voucher.value}`;
      voucherDiscount.innerHTML = `Discount: Rp375,000`;
      return 375;
      break;
    default:
      voucherInfo.innerHTML = `Code: -`;
      voucherDiscount.innerHTML = `Discount: Rp0,000`;
      return 0;
      break;
  }
}

// Handle Total Price
const countTotalPrice = () => {
  let countTicketAdult = parseInt(ticketAdult.value);
  let countTicketKid = parseInt(hiddenTicketKid.value);
  let countTicket = countTicketAdult + countTicketKid;
  let discount = checkDiscount();

  let resultTicket = (countTicketAdult * 30) + (countTicketKid * 25) + (snacksLunch.checked ? countTicket * 20 : 0) + (swimKit.checked ? countTicket * 15 : 0);

  let result = resultTicket - discount;
  totalPrice.innerHTML = `Total Price: Rp${result},000`
}

// Handle Ticket
const valueChangedEvent = new Event('valueChanged');

let updateValueTicketAdult = (value) => {
  hiddenTicketAdult.value = value;
  ticketAdult.value = value;
  hiddenTicketAdult.dispatchEvent(valueChangedEvent);
}
let updateValueTicketKid = (value) => {
  hiddenTicketKid.value = value;
  ticketKid.value = value;
  hiddenTicketKid.dispatchEvent(valueChangedEvent);
}

let incrementTicketAdult = () => {
  if (parseInt(hiddenTicketAdult.value) < 10) {
    hiddenTicketAdult.value = parseInt(hiddenTicketAdult.value) + 1;
    updateValueTicketAdult(hiddenTicketAdult.value)
  }
}
let decrementTicketAdult = () => {
  if (parseInt(hiddenTicketAdult.value) !== 0) {
    hiddenTicketAdult.value = parseInt(hiddenTicketAdult.value) - 1;
    updateValueTicketAdult(hiddenTicketAdult.value)
  }
}
let incrementTicketKid = () => {
  if (parseInt(hiddenTicketKid.value) < 10) {
    hiddenTicketKid.value = parseInt(hiddenTicketKid.value) + 1;
    updateValueTicketKid(hiddenTicketKid.value)
  }
}
let decrementTicketKid = () => {
  if (parseInt(hiddenTicketKid.value) !== 0) {
    hiddenTicketKid.value = parseInt(hiddenTicketKid.value) - 1;
    updateValueTicketKid(hiddenTicketKid.value)
  }
}

updateValueTicketAdult(hiddenTicketAdult.value)
updateValueTicketKid(hiddenTicketKid.value)

date.addEventListener('change', function () {
  priceDate.innerHTML = `Reservation Date: ${date.value}`
})
hiddenTicketAdult.addEventListener('valueChanged', function () {
  let countTicketAdult = parseInt(hiddenTicketAdult.value);
  countTotalPrice();

  priceTicketAdult.innerHTML = `Adult: ${countTicketAdult} x Rp30,000 = Rp${countTicketAdult * 30},000`
})
hiddenTicketKid.addEventListener('valueChanged', function () {
  let countTicketKid = parseInt(hiddenTicketKid.value);
  priceTicketKid.innerHTML = `Kid: ${countTicketKid} x Rp25,000 = Rp${countTicketKid * 25},000`;

  countTotalPrice();
})
snacksLunch.addEventListener('change', function () {
  let countTicketAdult = parseInt(ticketAdult.value);
  let countTicketKid = parseInt(hiddenTicketKid.value);
  let countTicket = countTicketAdult + countTicketKid;
  if (snacksLunch.checked) {
    priceSnacks.innerHTML = `Snacks & Lunch: ${countTicket} x Rp20,000 = Rp${countTicket * 20},000`
  } else priceSnacks.innerHTML = "Snacks & Lunch: No"

  countTotalPrice();
})
swimKit.addEventListener('change', function () {
  let countTicketAdult = parseInt(ticketAdult.value);
  let countTicketKid = parseInt(hiddenTicketKid.value);
  let countTicket = countTicketAdult + countTicketKid;
  if (swimKit.checked) {
    priceSwimKit.innerHTML = `Swimming Kit: ${countTicket} x Rp15,000 = Rp${countTicket * 15},000`;
  } else priceSwimKit.innerHTML = "Swimming Kit: No"

  countTotalPrice();
})
voucher.addEventListener('blur', function () {
  if (voucher.value !== "") {
    checkDiscount();
    countTotalPrice();
  }
})
