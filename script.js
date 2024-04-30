const box = document.getElementById('box');
    const container = document.getElementById('container');
    const separator1 = document.getElementById('separator1');
    const separator2 = document.getElementById('separator2');
    const parts = document.querySelectorAll('.part');

    let isDragging = false;
    let initialX;
    let initialY;

    // Set initial position of the box to be in the middle of the container
    box.style.left = container.offsetWidth / 2 - box.offsetWidth / 2 + 'px';
    box.style.top = container.offsetHeight / 2 - box.offsetHeight / 2 + 'px';

    box.addEventListener('mousedown', (e) => {
      isDragging = true;
      initialX = e.clientX - box.getBoundingClientRect().left;
      initialY = e.clientY - box.getBoundingClientRect().top;

      // Disable separator dragging while dragging the box
      separator1.style.pointerEvents = 'none';
      separator2.style.pointerEvents = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      let newX = e.clientX - initialX - container.getBoundingClientRect().left;
      let newY = e.clientY - initialY - container.getBoundingClientRect().top;

      box.style.left = newX + 'px';
      box.style.top = newY + 'px';
    });

    document.addEventListener('mouseup', (e) => {
      isDragging = false;
      snapToPart();

      // Re-enable separator dragging after releasing the box
      separator1.style.pointerEvents = 'auto';
      separator2.style.pointerEvents = 'auto';
    });

    separator1.addEventListener('mousedown', (e) => {
      isDragging = true;
      initialY = e.clientY - separator1.getBoundingClientRect().top;
    });

    separator1.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      let newY = e.clientY - initialY - container.getBoundingClientRect().top;
      container.style.height = newY + 'px';

      updatePartPositions();
      snapToPart();
    });

    separator1.addEventListener('mouseup', () => {
      isDragging = false;
    });

    separator2.addEventListener('mousedown', (e) => {
      isDragging = true;
      initialX = e.clientX - separator2.getBoundingClientRect().left;
    });

    separator2.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      let newX = e.clientX - initialX - container.getBoundingClientRect().left;
      container.style.width = newX + 'px';

      updatePartPositions();
      snapToPart();
    });

    separator2.addEventListener('mouseup', () => {
      isDragging = false;
    });

    function updatePartPositions() {
      let containerRect = container.getBoundingClientRect();
      let separator1Rect = separator1.getBoundingClientRect();
      let separator2Rect = separator2.getBoundingClientRect();

      let partAWidth = separator2Rect.left - containerRect.left;
      let partBWidth = containerRect.width - partAWidth;
      let partCHeight = separator1Rect.top - containerRect.top;
      let partDHeight = containerRect.height - partCHeight;

      document.getElementById('partA').style.width = partAWidth + 'px';
      document.getElementById('partB').style.width = partBWidth + 'px';
      document.getElementById('partC').style.height = partCHeight + 'px';
      document.getElementById('partD').style.height = partDHeight + 'px';
    }

    function snapToPart() {
  let boxRect = box.getBoundingClientRect();
  let containerRect = container.getBoundingClientRect();
  
  let newX, newY;

  if (boxRect.top <= containerRect.top + containerRect.height / 2) {
    if (boxRect.left <= containerRect.left + containerRect.width / 2) {
      newX = containerRect.left;
      newY = containerRect.top;
    } else {
      newX = containerRect.right - boxRect.width;
      newY = containerRect.top;
    }
  } else {
    if (boxRect.left <= containerRect.left + containerRect.width / 2) {
      newX = containerRect.left;
      newY = containerRect.bottom - boxRect.height;
    } else {
      newX = containerRect.right - boxRect.width;
      newY = containerRect.bottom - boxRect.height;
    }
  }

  if (Math.abs(boxRect.left + boxRect.width / 2 - containerRect.left - containerRect.width / 2) < 10 &&
      Math.abs(boxRect.top + boxRect.height / 2 - containerRect.top - containerRect.height / 2) < 10) {
    newX = containerRect.left + (containerRect.width - boxRect.width) / 2;
    newY = containerRect.top + (containerRect.height - boxRect.height) / 2;
  }

  box.style.left = newX - containerRect.left + 'px';
  box.style.top = newY - containerRect.top + 'px';
}
