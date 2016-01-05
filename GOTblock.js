/*
*   GOTblock Chrome Extension
*   This extension hides content, including images, inside the browser using keywords.
*   Written By Craig Pickard, http://craigpickard.net/
*   January, 2016
*/

//KEYWORDS TO SEARCH FOR IN BROWSER CONTENT
var keywords = 
[
    "Game of Thrones",
    "game_of_thrones",
    "GOT",
    "a song of ice and fire",
    "gameofthrones",
    "George R. R. Martin",
    "george r r martin",
    "george r r martin's",
    "george r. r. martin's",
    "george r.r. martin",
    "george r.r. martin's",
    "Iron Throne",
    "westeros",
    "tyrion",
    "lannister",
    "cersei",
    "daenerys",
    "targaryen",
    "jon snow",
    "john snow",
    "sansa stark",
    "arya",
    "stark",
    "jorah mormont",
    "jaime lannister",
    "samwell tarly",
    "theon greyjoy",
    "petyr baelish",
    "varys",
    "brienne of tarth",
    "tywin lannister",
    "sandor",
    "tywin",
    "sandor clegane",
    "bronn",
    "joffrey baratheon",
    "baratheon",
    "catelyn stark",
    "bran stark",
    "stannis baratheon",
    "missandre",
    "robb stark",
    "margaery tyrell",
    "davos seaworth",
    "shae",
    "melisandre",
    "gilly",
    "tommen baratheon",
    "roose bolton",
    "tormund giantsbane",
    "gendry",
    "ygritte",
    "daario naharis",
    "ramsay bolton",
    "jaqen H'ghar",
    "jeor mormont",
    "talisa stark",
    "ned stark",
    "khal drogo",
    "ellaria sand",
    "robert baratheon",
    "vierys targaryen",
    "targaryen",
    "grand maester pycelle",
    "barristan selmy",
    "eddison tollett",
    "podrick payne",
    "grenn",
    "hodor",
    "loras tyrell",
    "meryn trant",
    "grey worm",
    "alliser thorne",
    "janos slynt",
    "osha",
    "maester luwin",
    "rooseolly",
    "lancel lannister",
    "myrcella baratheon",
    "pypar",
    "irri",
    "rickon stark",
    "rast",
    "rodrik cassel",
    "olenna tyrell",
    "hot pie",
    "maester aemon",
    "qyburn",
    "selyse baratheon",
    "doreah",
    "othell yarwyck",
    "shireen baratheon",
    "jojen reed",
    "oberyn martell",
    "mance rayder",
    "high sparrow",
    "hallyne",
    "arryn",
    "bolton",
    "frey",
    "greyjoy",
    "lannister",
    "martell",
    "stark",
    "targaryan",
    "tully",
    "tyrell",
    "essos",
    "westeros",
    "night's watch",
    "beyond the wall",
    "white walkers",
    "crows",
    "gameofthrones",
    "george rr martin",
    "dragons",
    "mother of dragons",
    "game_of_thrones",
    "game-of-thrones",
    "emilia clarke",
    "kit harrington",
    "Jon Snow",
    "winter is coming",
    "mother of dragons",
    "game thrones",
    "winds of winter",
    "maisie williams",
    "winterfell",
    "theon",
    "kit harington"
];

//GET EVERY ELEMENT ON THE PAGE
var elements = document.getElementsByTagName('*');

var counter = 0;

//EXECUTE THE MAIN FUNCTION IF THE USER USES THE FWD/BACK KEYS TO RETURN TO A CACHED PAGE
window.onhashchange = function() {
 console.log("running search again");
 setTimeout(function(){blockGOT();}, 3000);
}

//EXECUTE MAIN FUNCTION WHENEVER A BUTTON IS PRESSED - PRIMARILY FOR SEARCH ENGINE SEARCHES
var buttons = document.getElementsByTagName('button');
var links = document.getElementsByTagName('a');

// console.log(links);

for (var i = 0; i < buttons.length; i++)
{
    buttons[i].addEventListener("click", function(event){
    // console.log("clicked a button");
    counter = 0;
    });
}

for (var i = 0; i < links.length; i++)
{
    links[i].addEventListener("click", function(event){
    // console.log("clicked a link");
    counter = 0;
    });
}

document.addEventListener("click", function(){
    if (counter < 3) setTimeout(function(){blockGOT();}, 3000);
    // console.log("counter: " + counter);
    counter++;
});

//---------------------- C H E C K  I M A G E S --------------------

//CHECK VARIOUS ATTRIBUTES OF EACH IMAGE FOR KEYWORDS RELATING TO GAME OF THRONES, IF ANYTHING
//IS FOUND, HIDE THE IMAGE
var checkImages = function ()
{

    var allImages = document.getElementsByTagName('img');
    
    // console.log(allImages);

    for (var i = 0; i < allImages.length; i++)
    {
    
        var attributes = [];
        
        attributes.push(allImages[i].width);
        attributes.push(allImages[i].height);
        attributes.push(allImages[i].title);
        attributes.push(allImages[i].alt);
        attributes.push(allImages[i].src);
        attributes.push(allImages[i].src);

        for (var j = 0; j < attributes.length; j++)
        {
            if(attributes[j] != undefined)
            {
                for (var k = 0; k < keywords.length; k++)
                {       
                        //CHECK THE CURRENT ATTRIBUTE AGAINST ALL IMAGES
                        var keywordLower = (keywords[k].toString()).toLowerCase();
                        var keyword = keywords[k];
                        var text = attributes[j].toString();
                        // text = text.toLowerCase();

                        if (text.indexOf(keyword) != -1 || text.indexOf(keywordLower) != -1)
                        {
                          console.log("found a match - removing image");
                          allImages[i].style.display = 'none';
                        }
                }
            }
        }

    }

}

//----------------------- B L O C K  G O T -------------------------

//FUNCTION FOR BLOCKING OUT ANY TEXT RELATED TO GAME OF THRONES
var blockGOT = function()
{
    console.log("running blockGOT");
    for (var i = 0; i < elements.length; i++)
    {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++)
        {
            var node = element.childNodes[j];

            if (node.nodeType === 3)
            {
                for (var k = 0; k < keywords.length; k++)
                {
                    var keywordLower = keywords[k].toLowerCase();
                    var keyword = keywords[k];
                    var text = node.nodeValue;
                    text = text.toLowerCase();

                    if (text.indexOf(keyword) != -1 || text.indexOf(keywordLower) != -1)
                    {
                       node.nodeValue = ' This content has been removed! ';
                    }
                }
            }
        }
    }

    //CHECK TO SEE IF ANY IMAGE TAGS / NAMES ETC CONTAIN KEYWORDS
    checkImages();
}

//EXECUTE THE MAIN SCRIPT
// blockGOT();

//EXECUTE THE MAIN FUNCTION ONLY ONCE ALL THE CONTENT HAS LOADED    
window.addEventListener("load", function(){
    setTimeout(function(){blockGOT();}, 2000);
    counter = 0;
});

setTimeout(function(){blockGOT();}, 2000);
