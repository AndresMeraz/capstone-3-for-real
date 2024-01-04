# Capstone 3: Microblog Network - "Poke'-Posts"

## Project Requirements
Design a microblogging website containing at least four pages that allow users to create an account and make posts that can only be seen by other registered users. 

## Login Page
Upon opening, the page calls Login DAta to check and see if the user is already logged in by verifying the existence of a token. If the function returns true, the user is redirected to the Posts page; if false, the user remains on the landing page where they are prompted to press the start button which runs the WelcomeMessage function that displays a user welcome message using a dynamic text typing effect that introduces the site to the user. A login screen with open and close functionality will display to the user a fillable form to be submitted with the login button, after which the page will send a POST request to the endpoint with the provided login data that redirects the user to the posts page upon successful login.

## Posts Page
On load, the page confirms whether or not the user is logged in. If they aren't, they will be redirected to the login page. At the top of the page is a submittable form the user can fill out to create a poke-post. After submitting, a POST request to the API with the post text and the user's token. If successful, the Poke-post is displayed below through a GET request along with the Poke-posts from other users. 

## Registration Page
A registration form is displayed on the screen allowing the user to fill each input field with their information. This includes the user's name, username, email, and password with confirmation, as well as a poke region. After submitting, the RegisterNewUser function retrieves the values from the form elements and first confirms that the passwords match, displaying an alert and denying the logic execution if they do not. If the passwords match, a POST request is sent to the user API, and the user is registered. the user is then redirected to the login page.



# Enjoy the Microblog Project and the MicroblogLite API!

Don't forget to read the [*MicroblogLite* API docs](https://microbloglite.herokuapp.com/docs/) and experiment with the API in *Postman!*

Practice and experimentation provide experience, and experience provides confidence.
![image](https://github.com/AndresMeraz/capstone-3-for-real/assets/146771873/9d6d7d7a-d6b7-4312-af2e-06c3bcf21ca6)
