//			Here will place all objects for ThreeJS scene into Canvas
//	Add simple ground
	var ground = new THREE.Mesh( new THREE.PlaneGeometry(120000, 120000, 10, 10), new THREE.MeshLambertMaterial({color:0x999999, side: THREE.DoubleSide }) );
	ground.receiveShadow = true;
	ground.position.set(0, -15000, 0);
	ground.rotation.x = -Math.PI / 2;
	scene.add(ground);
//	Add Eartg (SphereGeometry)
	var geometry = new THREE.SphereGeometry( 7000, 32, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	var sphere = new THREE.Mesh( geometry, material );
	sphere.position.set(35000, 0, 0);
	sphere.receiveShadow = true;
	scene.add( sphere );	
//	Add Cube just for fun Cube
	var geometry = new THREE.BoxGeometry( 3000, 3000, 3000 );
	var material = new THREE.MeshBasicMaterial( { color: 0xcc0066 } );
	var cube = new THREE.Mesh( geometry, material );
	cube.position.set(12000, -13500, 5000);
	cube.receiveShadow = true;
	scene.add( cube );
//	Add Cube2 just for fun Cube
	var geometry = new THREE.BoxGeometry( 5000, 5000, 5000 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ccff } );
	var cube2 = new THREE.Mesh( geometry, material );
	cube2.position.set(-12000, -12300, -5000);
	cube2.receiveShadow = true;
	scene.add( cube2 );
//	Add Cube3 just for fun Cube
	var geometry = new THREE.BoxGeometry( 7000, 7000, 7000 );
	var material = new THREE.MeshBasicMaterial( { color: 0xff33cc } );
	var cube3 = new THREE.Mesh( geometry, material );
	cube3.position.set(-17000, -12300, -50000);
	cube3.receiveShadow = true;
	scene.add( cube3 );
	
// Add satellite model
			
	// Prepare loader and load the model
	var oLoader = new THREE.OBJLoader();
//	oLoader.load('http://127.0.0.1:8887/models/MotorCycle.obj', function(object, materials) {
	
	oLoader.load('https://rawgit.com/LopEared/COTA/master/models/MotorCycle.obj', function(object, materials) {
		object.traverse( function(child) {
			if (child instanceof THREE.Mesh) {
			  // apply custom material for each meshes in our model
			  child.material = new THREE.MeshStandardMaterial({color: 0x00ff00, roughness: 0, metalness:0.4, fog:true, skinning:true});
			  // enable casting shadows
			  child.castShadow = true;
			  child.receiveShadow = true;
			  }
		});

	var sat  = object;
	sat.position.set(0, -15000, 0);
	sat.scale.set(1, 1, 1);
	sat.rotation.x = -Math.PI / 2 ;
	sat.rotation.z = Math.PI / 2 ;	
	sat.rotation.y = Math.PI / 2 ;	
	scene.add(sat);
	Frame_LoadBar.style.visibility="hidden"; // Turn off progress bar after loading model
	}, 
	// Called during  while loader function load 3d-file/write % of loaded
	function ( xhr ) {
		console.log( xhr.loaded / xhr.total * 100 + '% loaded' );
		var bar = document.getElementById('LoadBar').ldBar;
		bar.set(xhr.loaded / xhr.total * 100);
		},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
		alert( "Привет, приехали. Запускайте с сервера" );
		}
	);

	
