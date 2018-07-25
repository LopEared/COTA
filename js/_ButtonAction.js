// Here placed JS-script of buttons embeds into scene that have Canvas
//__________________________________________________________________________________________________________

// Make flags for designe position of buttons
var FlagMaxScreen = false;
var FlagDefaultPosition = false;
var FlagFullDisplay = false;

// Function of button Maximize screen
function MaxScreen() {
	if (!FlagMaxScreen){
		document.body.appendChild(CanvasFrame.removeChild(Scale_container));
		watch_table_scene.style.visibility="visible";
	}
	else{
		CanvasFrame.appendChild(document.body.removeChild(Scale_container));
		watch_table_scene.style.visibility="hidden";
	}
	FlagMaxScreen = !FlagMaxScreen;
}

// Function of button scene Default Position
function DefaultPosition() {
// sat.rotation.x = sat.rotation.x - Math.PI / 4 ;	
//camera.position.set( 0, 4500, -75000 );  // this code is nit necsessary here
controls.update();
controls.reset();
}

// Function of button FullDisplay mode
function FullDisplay() {
	if (!FlagFullDisplay){
		if(document.documentElement.requestFullScreen) {
				document.documentElement.requestFullScreen();
					} 
		else if(document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
					}
		else if(document.documentElement.webkitRequestFullScreen) {
			document.documentElement.webkitRequestFullScreen();
				}
		}
	else{
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
			} 
		else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
			} 
		else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
			}
		}
		FlagFullDisplay = !FlagFullDisplay;
}
// Чисто остатки кода что были неправильными либо не использовались
//var defposit = document.getElementById('Frame_LoadBar');
