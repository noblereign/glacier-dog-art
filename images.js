function loadImages() {
	const xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const fileList = this.responseText.split('\n'); // Split by lines
			let currentFolder = '';

			const filePaths = fileList
				.map(f => { // Build correct path for each file
					let filePath = '';

					if (f) {
						if (f[0] === '.') {
							currentFolder = f.replace('.', '').replace(':', '/');
						}
						else if (f[f.length - 1] !== '/') {
							filePath = `${location.href}${currentFolder}${f}`;
						}
					}
		  
					return filePath;
				})
				.filter(f => f); // Remove empty lines
	  
			const imagesContainer = document.getElementById('images');
	  
			filePaths.map(f => { // Create and put images to the DOM
				const img = document.createElement('IMG');
				img.src = f;
				imagesContainer.appendChild(img);
			});
		}
	};

	xhttp.open("GET", "images.txt", true);
	xhttp.send();
}

loadImages();