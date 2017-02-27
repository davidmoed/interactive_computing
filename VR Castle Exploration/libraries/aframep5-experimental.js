function FallingSensor(w) {
	// create a tag for the sensor
	this.tag = document.createElement('a-entity');
	this.world = w;
	
	// set position to face down
	this.container = new Container3D();
	this.geo = new Ring({x:0, y:0, z:-0.1, radiusInner: 0.04, radiusOuter: 0.05, side: 'double', red:0, green:0, blue:255, shader:'flat', opacity: 0.5});
	this.geo.tag.setAttribute('raycaster', 'objects: .solid');
	this.container.addChild( this.geo );
	this.container.rotateX(-90);
	
	// listen for intersections
	this.fallSpeed = 0;
	var _this = this;
	this.geo.tag.addEventListener('raycaster-intersection', function(els) {
		
		if (!_this.world.slideMode.enabled) {
			var closest = 1000;
			var closestPos;
			var e;
			var p = _this.world.getUserPosition();
			for (var i = 0; i < els.detail.intersections.length; i++) {
				if (els.detail.intersections[0].distance < closest) {
					closest = els.detail.intersections[0].distance;
					closestPos = els.detail.intersections[0].object.position;
					e = els.detail.intersections[0];
				}
			}
			
			if (closest > 2) {
				_this.fallSpeed += 0.008;
				_this.fallSpeed = constrain(_this.fallSpeed, 0, 1);
				_this.world.setUserPosition(p.x, p.y-_this.fallSpeed, p.z);
			}
			else {
				_this.fallSpeed = 0;
			}
		}
	});
	
	// add the tag into the world
	this.world.camera.holder.appendChild(this.container.tag);
}