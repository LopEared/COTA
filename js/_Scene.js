// Here placed JS-script of Canvas
//--------------------------------------------------------------------------------------------------------------------------------------------
// Make Scene
var scene = new THREE.Scene(); // Make scene
scene.background = new THREE.Color(0x3333ff); // Scene color
// MakeCamera
var camera = new THREE.PerspectiveCamera(75, CanvasFrame.clientWidth/CanvasFrame.clientHeight, 0.1, 150000);
camera.position.set(-55000, 3500, 0 ); // Set camera position
// Make Render
var renderer = new THREE.WebGLRenderer( { canvas: Scene3D, antialias: true } );
// Add controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
// Add Stats frame into Scale_container (if stats add to CanvasFrame - after scaling stats vanish from scene)
var stats = new Stats();
stats.domElement.style.cssText = 'position:absolute;bottom:4px;right:4px;';
Scale_container.appendChild(stats.domElement);
//--------------------------------------------------------------------------------------------------------------------------------------------
// Add Ambient Light
var light = new THREE.AmbientLight( 0x404040 , 1.5); // soft white light
scene.add( light );
//-------------------------------------------------------------------------------------------------------------------------------------------- 
// Add Spot Light
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -45000, 0, 0 );
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );
//--------------------------------------------------------------------------------------------------------------------------------------------
// Add RayCaster Part
// Add RayCaster variables
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersects;
// Add RayCaster function
function onMouseMove( event ) {
	mouse.x = ( event.offsetX / Scene3D.clientWidth ) * 2 - 1;				// calculate mouse position in normalized device coordinates
	mouse.y = - ( event.offsetY / Scene3D.clientHeight ) * 2 + 1;			// (-1 to +1) for both components
}
function DelMesh( event ) {
	intersects[ 0 ].object.visible = false;
	console.log("Привет! Тут был двойной клик")
}
function PaintMesh( event ) {
	intersects[ 0 ].object.material.color.setHex( 0xff3333 );
	console.log("Привет! Тут был клик")
}
Scene3D.addEventListener( 'mousemove', onMouseMove, false );				// Part of RayCaster: Check mouse move
Scene3D.addEventListener( 'dblclick', DelMesh, false );						// Part of RayCaster: Check mouse dblclick
Scene3D.addEventListener( 'click', PaintMesh, false );						// Part of RayCaster: Check mouse click
//--------------------------------------------------------------------------------------------------------------------------------------------
animate(); 																	// Main animation function
//--------------------------------------------------------------------------------------------------------------------------------------------
function animate() {
	// Part of RayCaster
	//----------------------------------------------------------------------------------------------------------------------------------------
	raycaster.setFromCamera( mouse, camera );								// update the picking ray with the camera and mouse position
	intersects = raycaster.intersectObjects( scene.children, true );	// calculate objects intersecting the picking ray
		
	// Check intersections scene.children objects	
	if ( intersects.length > 0 ) {
           	document.body.style.cursor = 'pointer';
			//intersects[ 0 ].object.visible = false;
			console.log(intersects[ 0 ].object);
			Fast_Target_Inform.innerHTML = "/n Hello,world!";
			Fast_Target_Inform.innerHTML = intersects[0].object.name;
        }
	else	document.body.style.cursor = 'auto';
	//----------------------------------------------------------------------------------------------------------------------------------------
	resizeCanvasToDisplaySize();
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	stats.update();
}
//--------------------------------------------------------------------------------------------------------------------------------------------
function resizeCanvasToDisplaySize(force) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (force || canvas.width !== width ||canvas.height !== height) {
	// you must pass false here or three.js sadly fights the browser
	renderer.setSize(width, height, false);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	// set render target sizes here
	}
}