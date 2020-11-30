function loadImages() {
	const xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const fileList = this.responseText.split('\n'); // Split by lines
			let currentFolder = '';
			
			const filePaths = fileList
			.map(f => { // Build correct path for each file
				let filePath = '';
				let artistName = '';
				
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
	  
			const imagesContainer = document.getElementById('glaciers');
	  
			filePaths.map(f => { // Create and put images to the DOM
				let artistName = f.replace('https://frostbite.glacier.dog//imgs/', '').split('/')[0];
				const img = document.createElement('IMG');
				img.setAttribute('class', "materialboxed");
				img.setAttribute('data-caption', "Has anybody ever told you how cute your generic, nondescript features are?");
				img.setAttribute('width', "350");
				img.setAttribute('artist', artistName);
				img.src = f;
				imagesContainer.appendChild(img);
				$(img).materialbox()
			});
		}
	};

	xhttp.open("GET", "images.txt", true);
	xhttp.send();
}

function populateDescriptions() {
	const xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const fileList = this.responseText.split('\n'); // Split by lines
			let message = '';
			let artistName = '';
			
			const filePaths = fileList
			.map(f => { // Build correct path for each file

				if (f) {
					message = f
				}
	  
				return message;
			})
			.filter(f => f); // Remove empty lines
	  
			filePaths.map(f => { // Create and put images to the DOM
				var strs = f.split('{');
				message = strs[1];
				artistName = strs[0];
				const images = document.querySelectorAll('[artist="' + artistName + '"]');
				images.forEach(function (arrayItem) {
					arrayItem.setAttribute('data-caption', message);
				});
			});
		}
	};

	xhttp.open("GET", "descs.txt", true);
	xhttp.send();
}

loadImages();
sleep(1000)
populateDescriptions();