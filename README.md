Kyle Smith - GA-WDI-CC-6<br>
<br>
MineSweeper Pseudocode<br>
<br>
MVP<br>
<br>
1. Create a window when page loads that will have:<br>
	a. Title<br>
	b. User input to provide player name, set to “Player” if user does not specify.<br>
	c. User input to provide difficulty (% of cells generated with a mine), width, and height of grid.<br>
	d. Event handler that will generate close the current window and create the game grid with the user provided parameters.<br>
	---i. On click<br>
	---ii. On keydown enter/return<br>
2. Game grid will be created after previous window is hidden, game grid will generate with consequences assigned to a random percentage of the cells.<br>
	a. Each cell will have an on click event tied to its consequence.
	b. Each cell will have its consequence hidden.
3. Consequences will include safe cells, empty and bomb adjacent, as well as lose cells, bomb.<br>
	a. Empty cells: empty cell that must check all adjacent cells and then trigger their event handlers<br>
	b. Bomb adjacents: cell that must check all adjacent cells and return a number representing amount of bombs touching the cell<br>
	c. Bomb cells: reveal game board for some time then swipe lose window over and above the game window
4. Lose conditions: click on cell containing a bomb<br>
	a. Wait for some time, then create lose window above/below window.<br>
	b. Swipe lose window over some percentage of the game board.<br>
	c. Lose window must include consolation and would you like to play again event handler that clears windows and creates page load window with current player name.<br>
5. Win conditions: reveal all safe cells on the game board<br>
	a. Wait for some time, then create lose window above/below window.<br>
	b. Swipe win window over some percentage of the game board.<br>
	c. Win window must include congratulations and would you like to play again event handler that clears windows and creates page load window with current player name.<br>
<br>
Optional!<br>
<br>
1. Track score.<br>
	a. Figure out best way to track score (maybe use a timer and a multiplier based off of difficulty and grid size, have to figure out how to reward lower count in seconds exponentially more the smaller the number).<br>
	b. Show time during play in game grid window.<br>
	c. Show final score in win/lose window.<br>
2. Track high score in local memory.<br>
	a. Check current score against high score in local memory as first part of win conditions.<br>
	b. If current score is higher than high score set current to high in local memory.<br>
	c. Return new high score win conditions window.<br>
	d. New high score window will contain congratulation and something about you broke the game you’re so good, no button or on click but maybe enter keydown event handler to load page load window with current player name.<br>
3. Display high score and player’s name in page load window.<br>
4. Figure out some end game animations for each final window.<br>
5. Apply sounds.<br>
	a. Bombs<br>
	b. End game windows<br>
	c. Create game board<br>
	d. Reveal more than # cells in one click<br>
6. Create list of names to pre generate a player name for the user in case they do not specify.<br>
7. Maybe create preset game parameters (difficulty, width, height) with a drop down selection for better mobile experience, probably easier to code this way.<br>
<br>
Wireframes:<br>
<br>
<img src="