// Here placed JS-script of Canvas
//--------------------------------------------------------------------------------------------------------------------------------------------
// Make Scene
var scene = new THREE.Scene(); // Make scene
scene.background = new THREE.Color(0x3333ff); 		// Scene color
// MakeCamera
var camera = new THREE.PerspectiveCamera(75, CanvasFrame.clientWidth/CanvasFrame.clientHeight, 0.1, 150000);
camera.position.set(0, 30000, -75000 );				// Set camera position
scene.add(camera);									// Append camerea to scene
// Make Render
var renderer = new THREE.WebGLRenderer( { canvas: Scene3D, antialias: true } );
// Add controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxDistance = 95000;						// Assign the upper limit of zooming 
// Add Stats frame into Scale_container (if stats add to CanvasFrame - after scaling stats vanish from scene)
var stats = new Stats();
stats.domElement.style.cssText = 'position:absolute;bottom:4px;right:4px;';
Scale_container.appendChild(stats.domElement);
//--------------------------------------------------------------------------------------------------------------------------------------------
// Add Ambient Light
var light = new THREE.AmbientLight( 0x404040 , 1.5); // soft white light
scene.add( light );
//-------------------------------------------------------------------------------------------------------------------------------------------- 

//--------------------------------------------------------------------------------------------------------------------------------------------
// Add Direct Light
var directionalLight = new THREE.DirectionalLight( 0xffeedd );
camera.add(directionalLight);		// Fix direction ligth from camera to objectsd
//--------------------------------------------------------------------------------------------------------------------------------------------

// Add RayCaster Part
// Add RayCaster variables
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersects, INTERSECTED, newItem, textnode;
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
	intersects = raycaster.intersectObjects( scene.children, true );		// calculate objects intersecting the picking ray
	if (intersects.length > 0) {											// Check intersections scene.children objects	
		document.body.style.cursor = 'pointer';								// Change style pointer cursor hover on the mesh/object
		write_fastdata(Fast_Target_Inform, intersects[0].object.name);
		if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED){
            	material = INTERSECTED.material;
	        	if(material.emissive){
	                material.emissive.setHex(INTERSECTED.currentHex);
	            }
	            else{
	            	material.color.setHex(INTERSECTED.currentHex);
	            }
	        }	
            INTERSECTED = intersects[0].object;
            material = INTERSECTED.material;
            if(material.emissive){
	         	INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
	            material.emissive.setHex(0xff0000);
	        }
	        else{
	         	INTERSECTED.currentHex = material.color.getHex();
	            material.color.setHex(0xff0000);
	        }
            //console.log(INTERSECTED.position);
			//console.log(intersects[0].object);
        }
    } 
	else {
        if (INTERSECTED){
        	material = INTERSECTED.material;
			if(material.emissive){
            	material.emissive.setHex(INTERSECTED.currentHex);
        	}
        	else{
        		material.color.setHex(INTERSECTED.currentHex);
        	}
        }
        INTERSECTED = null;
		document.body.style.cursor = 'auto';								// Change style pointer cursor not hover on the mesh/object to standart view
	}
	
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
//--------------------------------------------------------------------------------------------------------------------------------------------
//Append my personal functions

function write_fastdata(a,b) {
	console.log(a);
	if (a.length >= 20) {
		a.removeChild(a.childNodes[19]);
		}
	newItem = document.createElement("LI");
	textNode = document.createTextNode(b);
	newItem.appendChild(textNode);
	a.insertBefore(newItem, a.childNodes[0]);
}