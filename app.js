var errorCodes = [
     {code: 400, warning: "Bad Request", desc: "The resource you're trying to access does not support your request type. e.g. a GET request on a POST only resource."},
    {code: 401, warning: "Unauthorized", desc:"You do not have access to the resource, this may be due to a banned or no longer active API key"},
    {code: 404, warning: "Resource Not Found", desc: "You may receive this error if trying to access a page that does not exist, most likely due to a syntax error. i.e. lan/aip/users should be lan/api/users"},
    {code: 429, warning:"Too Many Requests", desc: "When accessing our API, each API key has a limit of 150 requests per hour, you will receive this error until your request limit is reset."},
    {code: 500, warning: "Internal Server Error", desc: "Something broke on our end, please contact the team if the problem persists."}
];

var apiCalls = [
    {name:"Username", type: "String", desc: "Only one username, case is ignored.", example: "sDavisJr1" },
    {name: "City and State" , type:"String" , desc:"Full name of the city and the abbreviated name of state" , example:"Saint Charles, IL" },
    {name: "Zip Code" , type: "Number", desc:"Five digit zip code for the city and state." , example:"You request would have 60174, if searching for users in Saint Charles, IL" },
    {name:"Genre Type" , type:"String" , desc:"For some genres with abbreviated versions, you may need to use that instead. E.g. FPS instead of First person shooter." , example:"FPS, RPG, Strategy" }    
];

var documentation = [
    {content:"<p> Making requests to our API is quite simple, using our base URL https://www.lan-social.com/api/ and appending the resource you wish to request. Currently our API only supports GET requests for Users, Messages, and Posts tied to your account's API key. You will not be able to POST, DELETE, UPDATE, etc... Click <a href=\'#/api\'>here</a> for examples of accessing the Users resource.</p>"},
    {content:" Authentication to use the LAN application is handled with HTTP Basic Authentication. User's logging in are searchedby their unique username and the provided password is hashed and matched with the registered password for that account. Upon successful authentication, a token is then sent to the user and is passed along with each subsequent request. The token contains a secret key generated and verified by the server. The token will remain valid until a user logs out or after 12 hours which is the token expiration."},
    {content: "Want to implement LAN's REST API into your own app? Doing so is easy, once you have registered for a LAN account, you can click the \"Get an API Key\" link located on this page. This will allow you to receive JSON formatted data of your messages and newsfeed. After your username and password have been verified, an API Key will be generarated for you. You will need to provide the key at the end of each of your requests to the LAN API. Here is an example request to retrieve all of items from your newsfeed with an API Key appended to the end: http://lan/api/v1/newsfeed/API=ETYN4667CVCDF"},
    {content: "When accessing our API, you may occasionaly run into errors. Our API will do its best to inform you of the nature of the problem so you may act accordingly. The problems can range from problems on our server or something simple like a syntax error in your API request. All errors will be returned in JSON formatting  with an appropriate error code and a short description of the nature of the problem. For a full listing of the error codes and their descriptions you can expect to encounter please see them <a href='#/errors' >here.</a>"},
    {content: " <a href=\"../images/usecase.png\" target=\"_blank\"><img src=\"../images/usecase.png\" width=\"70%\" style=\"float:left;display:flex;height:100px;width:150px;\"></a><i>(Click image to enlarge.)</i> The use case for this project is for gamers to connect with other gamers. They begin by creating an account through the registration screen, which requires email, password, and ZIP code, and then logging in after they are successfully registered. The user will then be prompted to define their favorite games and favorite game genres. This will complete their profile and make it easier to match with other users based on this information. Now, the user can find local gamers by their location and see who they have common games with. They can also message other users and add them as friends. Adding a user as a friend allows for their game updates to display in the users news feed. Another option for the user is to update their game status. They will be able to select what game they are currently playing, write commentary about it, and post it to the common news feed. This update will only be viewable by people on their friends list."},
    {content: " <ul> <li> Functional user log in and registration forms: The user should be able to register by inputting a username, password, email, zip code, and date of birth. Upon submission, the input will be pushed into our database, thus allowing the user to login with their username and password.</li></ul><ul><li>Functional implementation of geo-location: The user should be able to search our map tool using a zip code input and view members who are located in that area.</li></ul><ul><li>Functional friend system: The user should be able to search for friends based on their username, or geo-location and submit a friend request. Friends list should be viewable on the users profile page.</li></ul><ul><li> Functional messaging system that allows users to interact by messaging. The user should be able to compose and send a message to another user. The recipient should have the ability to read messages in their inbox, reply to them, or delete them.</li></ul><ul> <li> Functional user feed where messages will appear as they are posted by other users. User should have the ability to post on their feed and have their message be seen by other users. The feed will be able to be filtered depending on what the user is interested in seeing. </li> </ul><ul> <li> Both Website and Mobile app should allow for the similar, if not identical, functionality. Settings and preferences from the website should carry over into mobile app companion of LAN. </li> </ul> <ul> <li> Profile pages should be able to be edited according to the preferences of the user. This may be either hide  a field from showing, or selecting a theme for their profile page. </li> </ul>"}
];
/**Controllers */
angular.module('docApp', ['ngRoute'])

.filter('to_trusted', ['$sce', function($sce){
            return function(text) {
                return $sce.trustAsHtml(text);
            };
}])
        
.controller('errorController', function($scope){
    $scope.errorCodes = errorCodes;
})
.controller('apiController', function($scope){
    $scope.apiCalls = apiCalls;
})
.controller('mainController', function($scope){
    $scope.modalOff = true;
    $scope.showModal = function(index){
        $scope.modalOff = !$scope.modalOff;
        $scope.content = documentation[index].content;
    }
})
/**Routes */
.config(function($routeProvider){
    $routeProvider
    .when('/',{
            templateUrl: 'index.html',
            controller: 'mainController'
        })
        .when('/errors',{
            templateUrl: 'errors.html',
            controller: 'errorController'
        })
        .when('/api',{
            templateUrl: 'api.html',
            controller: 'apiController'
        })
        .when('/construction',{
            templateUrl: 'underConstruction.html',
            controller: 'apiController'
        })
})