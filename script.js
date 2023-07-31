const navbarHeight = document.querySelector('nav').offsetHeight;
    const backgroundDiv = document.querySelector('.background');

    // Function to update the height of .background
    const updateBackgroundHeight = () => {
      const contentHeight = backgroundDiv.scrollHeight;
      const viewportHeight = window.innerHeight;
      const remainingHeight = viewportHeight - navbarHeight;
      backgroundDiv.style.height = `calc(min(${remainingHeight}px, ${contentHeight}px))`;
    };

    // Initial update of the height
    updateBackgroundHeight();

    // To update the height when the window is resized
    window.addEventListener('resize', updateBackgroundHeight);
 

document.querySelector('.btn').addEventListener('click', async function(e) {
    e.preventDefault();
    let value = document.querySelector('#train_input').value;
    const url = 'https://trains.p.rapidapi.com/';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '7334762bc4msha0b261ac3772160p1f6ccdjsnd50b2bf5f509',
            'X-RapidAPI-Host': 'trains.p.rapidapi.com'
        },
        body: JSON.stringify({ search: value })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        // Call the function to display the train information
        displayTrainInfo(result);
    } catch (error) {
        console.error(error);
    }
});

// Function to display the train information
function displayTrainInfo(trainData) {
    const trainInfoContainer = document.querySelector('.train-info');

    // Create the HTML to display the train information
    const html = `
        <h2>Train Information</h2>
        <p><strong>Train Number:</strong> ${trainData[0].train_num}</p>
        <p><strong>Name:</strong> ${trainData[0].name}</p>
        <p><strong>From:</strong> ${trainData[0].train_from}</p>
        <p><strong>To:</strong> ${trainData[0].train_to}</p>
        <p><strong>Arrival Time:</strong> ${trainData[0].data.arriveTime}</p>
        <p><strong>Departure Time:</strong> ${trainData[0].data.departTime}</p>
        <p><strong>Classes:</strong> ${trainData[0].data.classes.join(', ')}</p>
    `;

    // Insert the HTML into the container
    trainInfoContainer.innerHTML = html;
}
