# My Travel Blog

After traveling around the world for 9 months with a computer programmer, I decided to become one.

We lived together in austin, texas for 5 years, struggling to be musicians in the evenings and weekends while working day jobs. I was working as a freelance architect, carpenter, and installation artist for awhile until I found myself as a project manager in a commercial construction company. After 18 months of that, I decided it was time to fly the coup, see the world. My roommate agreed. We sold our furniture, filled our backpacks, and bought one-way tickets to norway. 6 months quickly turned into 9 when we got stuck in india and vietnam (by choice I might add).
While traveling, I kept track of our adventures on the Polarsteps app and logged all my expenses in a google spreadsheet. I eventually returned home, armed with lots of data, and got to work, creating [my personal travel app](https://maarondesigns-travel-blog.herokuapp.com/)

I had learned HTML and CSS years back, building a Wordpress website for artists in Austin, and I learned enough JavaScript and PHP to get the thing working. This time around I decided it was time to learn to program properly, start from scratch: computer science 101. I taught myself fundamentals, then JavaScript, and eventually found d3.js and fell in love. As a visual person who likes science and numbers, data visualization was calling my name.

d3 was the base for my map with its complex map projections and DOM manipulation. I then created a fairly extensive UI to change light modes, map projection, toggle multiple trips, fullscreen/zoom, and add animation of the map based on the day. I converted my budget spreadsheet to json and made an interactive info-graphic, sort-able by daily average, total expenses, length of stay and chronologically. Node.js runs the backend with a RESTful API integrated into an html form for submission and photo upload to add "pins" to the map, sending the Data off to MongoDB mLab and Cloudinary. the app itself is deployed to heroku and on github.

![alt text](https://raw.githubusercontent.com/Maarondesigns/Travel_Blog/master/travel-blog-vid.gif "Codepen Video")
