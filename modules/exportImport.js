// Handles export and import logic for the sizing tool
export function exportProgress(factorCount) {
  const data = {};
  for (let i = 1; i <= factorCount; i++) {
    data['weight-' + i] = document.getElementById('weight-' + i)?.value;
    data['required-' + i] = document.getElementById('required-' + i)?.checked;
  }
  [
    'basePersonDays', 'dailyRate', 'workDaysPerMonth', 'hoursPerDay',
    'xsThreshold', 'sThreshold', 'mThreshold', 'lThreshold', 'xlThreshold',
    'appName', 'vendor', 'purpose', 'location', 'totalUsers', 'migrationType',
    'notes'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) data[id] = el.value;
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  let appName = (data['appName'] || '').trim();
  if (!appName) appName = 'migration-tool';
  appName = appName.replace(/[^a-z0-9\-_]+/gi, '_');
  a.download = appName + '-size-estimate.json';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

export function importProgressFromFile(file, factorCount) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      for (let i = 1; i <= factorCount; i++) {
        if (data['weight-' + i] !== undefined) document.getElementById('weight-' + i).value = data['weight-' + i];
        if (data['required-' + i] !== undefined) document.getElementById('required-' + i).checked = data['required-' + i];
      }
      [
        'basePersonDays', 'dailyRate', 'workDaysPerMonth', 'hoursPerDay',
        'xsThreshold', 'sThreshold', 'mThreshold', 'lThreshold', 'xlThreshold',
        'appName', 'vendor', 'purpose', 'location', 'totalUsers', 'migrationType',
        'notes'
      ].forEach(id => {
        if (data[id] !== undefined) {
          const el = document.getElementById(id);
          if (el) el.value = data[id];
        }
      });
      alert('Progress imported successfully!');
    } catch (err) {
      alert('Failed to import: ' + err.message);
    }
  };
  reader.readAsText(file);
}
