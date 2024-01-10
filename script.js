const currentTime = dayjs().format('dddd MMMM D YYYY');
$("#currentDay").text(currentTime);


$(document).ready(function () {
  const businessHours = Array.from({ length: 9 }, (_, i) => i + 9); // 9 AM to 5 PM
  const container = $('#time-block-container');

  businessHours.forEach(hour => {
    const timeBlock = $(`.time-block[data-hour="${hour}"]`);
    
    // Directly select the event and saveBtn
    const eventDiv = timeBlock.closest('.row').find('.event');
    const saveButton = timeBlock.closest('.row').find('.saveBtn');

    // Add classes dynamically based on past, present, or future
    const currentHour = dayjs().hour();
    const blockHour = dayjs().hour(hour).minute(0).second(0);

    if (blockHour.isBefore(dayjs(), 'hour')) {
      eventDiv.addClass('past');
    } else if (blockHour.isSame(dayjs(), 'hour')) {
      eventDiv.addClass('present');
    } else {
      eventDiv.addClass('future');
    }

   // Event handling for save buttons
saveButton.on('click', function () {
  const eventHTML = eventDiv.html();
  localStorage.setItem(`event-${hour}`, eventHTML);
});

// Load events from local storage on page load
const savedEventHTML = localStorage.getItem(`event-${hour}`);
if (savedEventHTML) {
  eventDiv.html(savedEventHTML);
}
});
});

