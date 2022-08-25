const states = {
  "Andaman and Nicobar Islands": 0.79,
  "Andhra Pradesh": 0.91,
  "Arunachal Pradesh": 0.11,
  Assam: 1.21,
  Bihar: 2.1,
  Chandigarh: 1.3,
  Chhattisgarh: 1.37,
  "Dadra and Nagar Haveli": 0.84,
  "Daman and Diu": 0.9,
  Delhi: 1.05,
  Goa: 0.71,
  Gujarat: 1.02,
  Haryana: 1.27,
  "Himachal Pradesh": 0.26,
  "Jammu and Kashmir": 0.81,
  Jharkhand: 1.68,
  Karnataka: 0.7,
  Kerala: 0.13,
  Lakshadweep: 1.33,
  "Madhya Pradesh": 1.68,
  Maharashtra: 1.26,
  Manipur: 1.56,
  Meghalaya: 0.42,
  Mizoram: 0.65,
  Nagaland: 1.41,
  Odisha: 0.88,
  Puducherry: 0.96,
  Punjab: 0.97,
  Rajasthan: 1.21,
  Sikkim: 1.04,
  "Tamil Nadu": 1.13,
  Telangana: 0.91,
  Tripura: 1.69,
  "Uttar Pradesh": 1.61,
  Uttarakhand: 0.12,
  "West Bengal": 1.29,
};

const emissionFactor = {
  electricity: states,
  fuel: 2.32,
  lpg: 1.8,
  waste: 0.44,
};
const usage = {};

const emission = {};

const select_state = document.getElementById("select-state");
const form_container = document.getElementById("form-container")
const result_container = document.getElementById("result-container");
const result_output = document.getElementById("result-output")
const success = document.getElementById("success");
const danger = document.getElementById("danger");
const electricity_output = document.getElementById("electricity-output");
const electricity_result = document.getElementById("electricity-result");
const fuel_output = document.getElementById("fuel-output");
const fuel_result = document.getElementById("fuel-result");
const lpg_output = document.getElementById("lpg-output");
const lpg_result = document.getElementById("lpg-result");
const waste_output = document.getElementById("waste-output");
const waste_result = document.getElementById("waste-result");
const members_input = document.getElementById("members-input");
let state_input = 0;
let totalEmission =0 ;

//adding opptions to the select-state using js
for (const state in states) {
  let newOption = new Option(state, state);
  select_state.add(newOption, undefined);
}

//onclcick
function onSubmition() {
  store();
  calculate();
  display()
}

// storing values selected by user in object
function store() {
  usage.electricity = document.getElementById("electricity-input").value * 12;

  usage.fuel =
    (document.getElementById("distance-input").value /
      document.getElementById("mileage-input").value) *
    365;

  usage.lpg = document.getElementById("lpg-input").value * 24;

  usage.waste = document.getElementById("waste-input").value * 52;

  state_input = select_state.options[select_state.selectedIndex].value;

  //    for (const use in usage) {
  //     console.log(`${use} : ${usage[use]}`);
  //   }
  //    console.log(state_input)
}

//calculating emission
function calculate() {
    console.log(state_input)
  emission.electricity = usage.electricity * states[state_input];

  emission.fuel = usage.fuel * emissionFactor["fuel"];

  emission.lpg = usage.lpg * emissionFactor["lpg"];

  emission.waste = usage.waste * emissionFactor["waste"];

  for(const emit in emission){
      totalEmission += emission[emit] / members_input.value 
  }
}


//display
function display(){
    result_container.style.display = "block"
    form_container.style.display = "none"

    result_output.innerText = Math.round((totalEmission/1000) * 100) / 100 
    electricity_result.innerText =  Math.round((emission.electricity/members_input.value) * 100) / 100
    fuel_result.innerText = Math.round((emission.fuel/members_input.value) * 100) / 100
    lpg_result.innerText = Math.round((emission.lpg/members_input.value)* 100) / 100
    waste_result.innerText = Math.round((emission.waste/members_input.value)* 100) / 100
    if(totalEmission<=2000){
        success.style.display = "block"
    }
    else{
        danger.style.display = "block"
        if ((emission.electricity / members_input.value  )<= 1100 ? false:true) {
           electricity_output.style.display = "block"
          }
          if ((emission.fuel / members_input.value ) <= 400 ? false:true) {
            fuel_output.style.display = "block"
          }
          if ((emission.lpg / members_input.value ) <= 100 ? false:true) {
            lpg_output.style.display = "block"
          }
          if ((emission.waste / members_input.value ) <= 400 ? false:true) {
            waste_output.style.display = "block"
            
          }
    }

}