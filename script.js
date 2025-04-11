document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const teamSize = parseInt(document.getElementById('teamSizeInput').value);
  const oooDays = parseInt(document.getElementById('removeDaysInput').value || 0);
  const holidays = parseInt(document.getElementById('addHolidaysInput').value || 0);
  const velocity = parseInt(document.getElementById('velocityInput').value);

  const sprints = 6;
  const hoursPerDay = 6;
  const hoursPerSprintPerPerson = 60;

  const totalHoursPerSprint = teamSize * hoursPerSprintPerPerson;
  const totalAvailableHours = totalHoursPerSprint * sprints - (oooDays + holidays) * hoursPerDay;
  const avgHoursPerPoint = (velocity > 0) ? totalAvailableHours / (velocity * sprints) : 0;

  const maxQuarterCapacity = (avgHoursPerPoint > 0)
    ? (totalHoursPerSprint * sprints) / avgHoursPerPoint
    : 0;

  const adjustedQuarterCapacity = (avgHoursPerPoint > 0)
    ? totalAvailableHours / avgHoursPerPoint
    : 0;

  const maxWithVariance = maxQuarterCapacity * 0.8;
  const adjustedWithVariance = adjustedQuarterCapacity * 0.8;

  document.getElementById('maxQuarterCapacity').textContent = `Max Capacity: ${Math.round(maxQuarterCapacity)} points`;
  document.getElementById('adjustedCapacity').textContent = `Max Available Capacity: ${Math.round(adjustedQuarterCapacity)} points`;
  //document.getElementById('maxWithVariance').textContent = `Max Capacity with Reserve: ${Math.round(maxWithVariance)} points`;
  document.getElementById('adjustedWithVariance').textContent = `Capacity with Reserve: ${Math.round(adjustedWithVariance)} points`;
});

