    const form = document.getElementById('recForm');
    const recommendationList = document.getElementById('recommendationList');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const message = document.getElementById('message').value.trim();

      if (name && message) {
        const newRec = document.createElement('div');
        newRec.className = 'recommendation';
        newRec.textContent = `“${message}” — ${name}`;
        recommendationList.appendChild(newRec);

        alert('✅ Thank you for your recommendation!');
        form.reset();
      }
    });