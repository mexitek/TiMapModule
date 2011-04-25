// Attach this module to our core
core.registerModule('map',function(sb){
	// =====================
	// = Private Variables =
	// =====================
	
	// Local list of all annotations
	var annotations = [];
	
	// Default Values
	var mapTitle = 'Map';
	var mapDescription = '';
	var win = null;
	var tab = null;
	var view = null;
	
	
	// ====================
	// = Public Interface =
	// ====================
	var pubFace = {
		// Insert a new annotation into the private list
		setAnnotation : function(opts){ 
			
			// Error checking
			if( !opts || typeof opts != 'object' )
			{
				Ti.API.error('core.maplocation.setAnnotation >> was not passed an object respresenting an annotation.');
				return;
			}
			Ti.API.info('Inserting Annotation to Map Module: '+opts.title);
			// Add annotation to the list
			annotations.push( sb.ui.getMapAnnotation(opts) );
		},
		
		// Get a Map View Object containing our annotations
		// Only used when not using getMapWindow();
		getMap : function(opts){
			Ti.API.info('Asking Map Module for Map View.');
			// Prep opts
			opts = opts || {};
			// attach annotations
			opts.annotations = opts.annotations || annotations;
			
			// Set view if this is the first time
			if( !view ) view = sb.ui.getMapView(opts);
			
			// Return Map View
			return view;
		},
		
		// Get a window with current mapview
		getWindow : function(opts){
			Ti.API.info('Asking Map Module for Window.');
			// prep opts
			opts = opts || {title:mapDescription,fullscreen:false};
			
			// Get a core Window
			if( !win ) win = sb.ui.getWindow(opts);
			
			// App our map view
			win.add( pubFace.getMap() );
			
			// Return the window to application
			return win;
		},
		
		// Get a tab that would hold our module
		getTab : function(opts){
			Ti.API.info('Asking Map Module for Tab.');
			// Prep opts
			opts = opts || {};
			// Merge defaults
			opts.mergeSafe({
				title:mapTitle,
				window: pubFace.getWindow()
			});
			
			// If first time
			if( !tab ) tab = sb.ui.getTab(opts);
			
			// Return a tab
			return tab;
		},
		
		// Applies all the annotations to the map
		applyAnnotations : function(){
			//pubFace.getMap().addAnnotations( annotations );
			var mapView = pubFace.getMap();
			// Add them one by one
			for(var i=0; i<annotations.length; i++)
				mapView.addAnnotation( annotations[i] );
		}
	};
	
	// Return interface to the core
	return pubFace;
});