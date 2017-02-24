<h1>Interactive Computing</h1>

<h3>My Interactive Computing class developed my ability to code alternative projects by teaching me basic video game logic, color, motion, and facial tracking, Augmented Reality, and Virtual Reality. These skills have a myriad of uses and I am excited to continue to experiment with and expand upon the knowledge I gained here.</h3>

<p>In this class we created projects in a new language called P5. P5 is a new Javascript language that takes the best of Processing and utilizes central functions from Processing to make it accessable. What sets P5 apart from Processing is the fact that it was created for web use and sketches are easily included in any site. P5 is still in beta, but it felt much more comfortable and easy to use than Processing in Java.</p>

<h2>Some of the projects I worked on which are included in this repository are:</h2>
<ul>
	<li>Crash Bandicoot Escape Game</li>
	<li>VR Castle Exploration</li>
	<li>Color Tracking Painting Program</li>
	<li>Election Vote Catching Game</li>
</ul>

<ol>
<li>
<h3>Crash Bandicoot Escape Game</h3>

<p>One of the first topics covered in Interactive Computing was video game logic. Each week we were tasked with creating a simple game based on the skills we learned that week. The Crash game was created as a program which required a user controlled character and multiple autonomous computer controlled objects.</p>

<h3>Game Description</h3>
<p>Crash Bandicoot is on the run! To escape he needs to avoid the obstacles for long enough to get away. The longer he runs though, the faster the obstacles get! Crash has 3 lives to survive with and needs to survive 60 seconds in order to win. Control Crash with the arrow keys or WASD to get him safely to the end! On web it is recommended to use WASD because the arrow keys often are used by the browser to scroll. Choose the starting speed of the obstacles by picking easy, medium, or hard in the menu.  <br><br>
The game features the original soundtrack from the first Crash Bandicoot game. The soundtrack can be toggled on and off with the sound menu. There is also a cheat menu that can be used to remove 1 or 2 obstacles depending on how hard the player wants the game to be.<br><br>
Crash starts on the left side of the screen and can move in each direction. The character can also wrap around the screen from top to bottom and vice versa. <br><br>
The obstacles move across the screen towards Crash at slowly incrementing speeds. Each time an obstacle hits the left end of the screen, it starts again on the right side with a random height between 50 and 150 pixels, in a random location between 0 and 400 pixels from the top of the canvas.
</p>
</li>

<li>
<h3>VR Castle Exploration</h3>

<p>While exploring Virtual Reality coding we were able to create our own world. I learned the proper uses for using object arrays, different 3D shapes, equirectangular images, repeating and disappearing objects, and 3D models.</p>

<h3>Project Description</h3>

<p>In the deep recesses of space there is a castle! You got there flying on your "lego" rocket ship and now it's time to explore this multicolored wonder! <br>
The VR world was created with a few driver files that create the castle and some of it's main aspects. </p>
<ul>
	<li>castle.js
		<p>Castle.js is a file that builds the castle that is the main focus of the VR world. It utilizes a number of functions that create different 3D shapes, both free standing, and in columns and rows. Within castle.js is a column creator function to make castle walls, a cone creator function and cylander creator function to make the towers, and a fountain creator function. Castle.js also includes the 2 doors and their associated code.</p>
	</li>
	<li>Booster
		<p>This folder contains the "lego" spaceship that appears in the world in web browsers. The rocket is a 3D model created from <a href="mecabricks.com/en">mecabricks.com</a>.</p>
	</li>	
</ul>
<p>Fly around the castle by "clicking" or holding down the action button on your VR headset to move and explore.<br>
Make sure to click on the castle doors for a special easter-egg!
</p>
</li>

<li>
<h3>Color Tracking Painting Program</h3>

<p>A big emphasis was put on motion detection, simple gesture control, brightness & color tracking for the latter part of our semester. We explored different tactics and implementations for each of these technologies which utilize cameras and created our own programs based off of these discussions.</p>

<h3>Project description</h3>

<p>The color tracking painting program can be used in two ways: with live video capture, and still images. The current way you use the program can be chosen with the dropdown menu. When the program begins the canvas with the video is in the top left corner. By clicking anywhere in the canvas, you can capture the color of whatever you click on. Lighting is important when using the camera, as low light will make it harder to capture the correct color.</p>
<ul>
<li>In video capture mode, whenever the mouse goes out of the canvas, you will begin to paint in a number of shapes that can be chosen with the drop down menu for shapes. You can choose to paint in circles, squares, or triangles. To save your sketch press 'X'.</li>

<li>In still capture mode, the program works similarly to video capture mode, however, you can draw over the canvas. To capture a new still click 'C'. You can draw with the same shapes as in video capture mode and save your image the same way.</li>
</ul>

</li>

<li>
<h3>Election Vote Capture Game</h3>




</li>


</ul>

















