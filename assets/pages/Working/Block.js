function sendToDiscord(ip) {
    const webhookUrl = 'https://discord.com/api/webhooks/1272920222776426516/s8qm5PBe-j1Xe9iTzCNzt_DHIW6L3Fur5IHKuA0c3dOKr9urmfQNQosJPSiib0FUGrBS';  // Replace with your Discord webhook URL

    const payload = {
        content: `User IP: ${ip}`,  // Message content
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        console.log('IP sent to Discord successfully.');
    })
    .catch(error => {
        console.error('Error sending IP to Discord:', error);
    });
}

function checkIp() {
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            const userIp = data.ip;
            console.log(`User IP is: ${userIp}`);  // Display IP in the console

            // Send IP to Discord webhook
            sendToDiscord(userIp);

            // Optionally, handle IP visibility and content display
            const allowedIp = '86.122.2.53';  // Example allowed IP
            if (userIp === allowedIp) {
                document.getElementById('content').style.display = 'block';
            } else {
                document.getElementById('blocked').style.display = 'block';
            }
            document.getElementById('loading').style.display = 'none';
        })
        .catch(error => {
            console.error('Error obtaining IP:', error);
            document.getElementById('loading').textContent = 'Error checking IP.';
        });
}

// Call the function to check the IP and send it to Discord
checkIp();
