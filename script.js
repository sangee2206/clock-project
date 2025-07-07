let isDigital = true;

        function updateClock() {
            const now = new Date();
            
            // Get time components
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            
            // Determine AM/PM
            const ampm = hours >= 12 ? 'PM' : 'AM';
            
            // Convert to 12-hour format
            hours = hours % 12;
            hours = hours ? hours : 12; // Handle midnight (0 becomes 12)
            
            // Format with leading zeros
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(seconds).padStart(2, '0');
            
            // Update digital clock display
            document.getElementById('digital-clock').textContent = 
                `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
            
            // Update date display
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
            
            // Update analog clock
            if (!isDigital) {
                const hourDeg = (360 / 12) * (hours + minutes / 60);
                const minuteDeg = (360 / 60) * (minutes + seconds / 60);
                const secondDeg = (360 / 60) * seconds;

                document.querySelector('.hour-hand').style.transform = `rotate(${hourDeg}deg)`;
                document.querySelector('.minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
                document.querySelector('.second-hand').style.transform = `rotate(${secondDeg}deg)`;
            }
        }

        function toggleClock() {
            isDigital = !isDigital;
            document.getElementById('digital-clock').style.display = isDigital ? 'block' : 'none';
            document.getElementById('analog-clock').style.display = isDigital ? 'none' : 'flex';
            document.querySelector('.switch-button').textContent = isDigital ? 'Switch to Analog' : 'Switch to Digital';
        }

        // Update clock immediately and then every second
        updateClock();
        setInterval(updateClock, 1000);