// Handles calculation and scoring logic for the sizing tool
export const factorCount = 43;

export function getNumber(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const v = parseFloat(el.value);
  return isNaN(v) ? 0 : v;
}

export function setBadgeClass(bucket) {
  const el = document.getElementById('sizeBucket');
  el.className = 'pill';
  if (bucket === 'XS') el.classList.add('badge-xs');
  else if (bucket === 'S') el.classList.add('badge-s');
  else if (bucket === 'M') el.classList.add('badge-m');
  else if (bucket === 'L') el.classList.add('badge-l');
  else if (bucket === 'XL') el.classList.add('badge-xl');
  else if (bucket === 'XXL') el.classList.add('badge-xxl');
  else if (bucket === 'XXXL') el.classList.add('badge-xxxl');
}

export function calculate() {
  let totalScore = 0;
  for (let i = 1; i <= factorCount; i++) {
    const weight = getNumber('weight-' + i);
    const required = document.getElementById('required-' + i).checked;
    if (required) {
      totalScore += weight;
    }
  }

  document.getElementById('totalScore').textContent = totalScore.toFixed(1);

  const xsThreshold  = getNumber('xsThreshold');
  const sThreshold   = getNumber('sThreshold');
  const mThreshold   = getNumber('mThreshold');
  const lThreshold   = getNumber('lThreshold');
  const xlThreshold  = getNumber('xlThreshold');
  const xxlThreshold = getNumber('xxlThreshold');

  let bucket = '–';
  if (totalScore > 0) {
    if (totalScore < xsThreshold) bucket = 'XS';
    else if (totalScore < sThreshold) bucket = 'S';
    else if (totalScore < mThreshold) bucket = 'M';
    else if (totalScore < lThreshold) bucket = 'L';
    else if (totalScore < xlThreshold) bucket = 'XL';
    else if (totalScore < xxlThreshold) bucket = 'XXL';
    else bucket = 'XXXL';
  }
  document.getElementById('sizeBucket').textContent = bucket;
  setBadgeClass(bucket);

  const basePersonDays = getNumber('basePersonDays');
  const dailyRate      = getNumber('dailyRate');
  const hoursPerDay    = getNumber('hoursPerDay');
  const sprintHours    = getNumber('sprintHours');
  const teamMembers    = getNumber('teamMembers');

  const personDays = totalScore * basePersonDays;
  const totalHours = personDays * hoursPerDay;
  const cost       = personDays * dailyRate;

  let personSprints = 0;
  if (sprintHours > 0) {
    personSprints = totalHours / sprintHours;
  }

  let calendarSprints = 0;
  if (teamMembers > 0) {
    calendarSprints = personSprints / teamMembers;
  }

  document.getElementById('estimatedPersonDays').textContent = personDays.toFixed(1);
  document.getElementById('totalHours').textContent          = totalHours.toFixed(1);
  document.getElementById('personSprints').textContent       = personSprints.toFixed(2);
  document.getElementById('calendarSprints').textContent     = calendarSprints.toFixed(2);
  document.getElementById('estimatedCost').textContent =
    isNaN(cost) ? '$0' : '$' + Math.round(cost).toLocaleString();

  // ...Service Packages & Team Recommendation logic can be modularized further...
}

export function hookInputs() {
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(el => {
    el.addEventListener('change', calculate);
    el.addEventListener('keyup', calculate);
  });
}

export function resetDefaults(defaultWeights, defaultModel) {
  for (let i = 1; i <= factorCount; i++) {
    const w = document.getElementById('weight-' + i);
    if (w) w.value = defaultWeights[i - 1];
  }
  document.getElementById('basePersonDays').value   = defaultModel.basePersonDays;
  document.getElementById('dailyRate').value        = defaultModel.dailyRate;
  document.getElementById('workDaysPerMonth').value = defaultModel.workDaysPerMonth;
  document.getElementById('hoursPerDay').value      = defaultModel.hoursPerDay;
  document.getElementById('sprintHours').value      = defaultModel.sprintHours;
  document.getElementById('teamMembers').value      = defaultModel.teamMembers;
  document.getElementById('xsThreshold').value      = defaultModel.xsThreshold;
  document.getElementById('sThreshold').value       = defaultModel.sThreshold;
  document.getElementById('mThreshold').value       = defaultModel.mThreshold;
  document.getElementById('lThreshold').value       = defaultModel.lThreshold;
  document.getElementById('xlThreshold').value      = defaultModel.xlThreshold;
  document.getElementById('xxlThreshold').value     = defaultModel.xxlThreshold;
  document.getElementById('missionCriticality').value = '3';
  document.getElementById('migrationType').value = '';
  document.getElementById('deliverySpeed').value = 'Standard';
  calculate();
}
