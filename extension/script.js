document.getElementById("send-to-backend").addEventListener("click", () => {
    const rows = document.querySelectorAll("#attendance-body tr");
    const attendanceData = [];
  
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      attendanceData.push({
        name: cells[0].textContent,
        enter: cells[1].textContent,
        exit: cells[2].textContent,
        duration: cells[3].textContent,
      });
  
      // Reset status to pending
      cells[4].textContent = "⏳";
    });
  
    // Send data to backend
    fetch("https://your-backend-url.com/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceData),
    })
      .then((res) => res.json())
      .then((response) => {
        const verified = response.verified;
        verified.forEach((student, index) => {
          const statusCell = rows[index].querySelectorAll("td")[4];
          if (student.verified) {
            statusCell.textContent = "✅";
          } else {
            statusCell.textContent = "❌ " + (student.issue || "");
          }
        });
  
        // Optional: Show transcript summary from backend
        if (response.transcript_summary) {
          document.getElementById("transcript-summary").innerText = response.transcript_summary;
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Failed to connect to backend");
      });
  });
  